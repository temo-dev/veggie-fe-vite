import {
  setUser,
  signInSuccess,
  signOutSuccess,
  useAppSelector,
  useAppDispatch, setUserInfo, setUserId
} from '@/store'
import appConfig from '@/configs/app.config'
import {REDIRECT_URL_KEY} from '@/constants/app.constant'
import {useNavigate} from 'react-router-dom'
import {SignUpCredential} from '@/@types/auth'
import useQuery from './useQuery'
import { useLocalStorage } from '@mantine/hooks'

type Status = 'success' | 'failed'

function useAuth() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    token, signedIn
  } = useAppSelector((state) => state.auth.session)
  const userId = useAppSelector(state => state.auth.userInfo.userId)
  const query = useQuery()
  const [_, setValue] = useLocalStorage({
    key: 'yourTokenAuth',
  });

  const signIn = async (
    data: any
  ): Promise<
    | {
    status: Status
    message: string
  }
    | undefined
  > => {
    try {
      setValue(data.token)
      dispatch(setUserId(data.data.user_id))
      dispatch(signInSuccess({
        token: data.token,
        refreshToken: '',
        expireTime: 0
      }))
      dispatch(
        setUser(
          {
            fullName: data.data.user_name,
            email: data.data.email,
            role: [],
            phoneNumber: ''
          }
        )
      )
      const redirectUrl = query.get(REDIRECT_URL_KEY)
      navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath)
      return {
        status: 'success',
        message: ''
      }
    } catch (errors: any) {
      return {
        status: 'failed',
        message: errors?.response?.data?.description || errors.toString()
      }
    }
  }

  const signUp = async (values: SignUpCredential) => {
    // try {
    //   await AuthService.signUp(values)
    //   return {
    //     status: 'success',
    //     message: ''
    //   }
    //   // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    // } catch (errors: any) {
    //   return {
    //     status: 'failed',
    //     message: errors?.response?.data?.description || errors.toString()
    //   }
    // }
  }

  const handleSignOut = () => {
    dispatch(signOutSuccess())
    dispatch(setUserInfo({
      googleLogin: false,
      name: '',
      role: '',
      email: '',
      userId: userId
    }))
    dispatch(
      setUser({
        fullName: '',
        role: [],
        email: ''
      })
    )
    navigate(appConfig.unAuthenticatedEntryPath)
  }

  const signOut = async () => {
    // await apiSignOut()
    handleSignOut()
  }

  return {
    authenticated: true,
    signIn,
    signUp,
    signOut,
  }
}

export default useAuth
