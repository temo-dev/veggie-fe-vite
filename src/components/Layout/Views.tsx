import { Suspense, useEffect } from 'react'
import appConfig from '@/configs/app.config'
import { Routes, Route, Navigate } from 'react-router-dom'
import { setAllCurrencies, setIsUpdate, useAppDispatch, useAppSelector } from '@/store'
import {protectedRoutes, publicRoutes} from "@/configs/routes.config";
import ProtectedRoute from "@/route/ProtectedRoute";
import AppRoute from "@/route/AppRoute";
import AuthorityGuard from "@/route/AuthorityGuard";
import PublicRoute from "@/route/PublicRoute";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { useFindAllCurrencies } from '@/services/react-query/currency/use-find-all-currency';
import useCurrency from '@/utils/hooks/useCurrency';
import useTag from '@/utils/hooks/useTag';
import { useFindAllTag } from '@/services/react-query/tag/use-find-all-tag';

interface ViewsProps {
  pageContainerType?: 'default' | 'gutterless' | 'contained'
  // layout?: LayoutType
}

type AllRoutesProps = ViewsProps

const { authenticatedEntryPath } = appConfig

const AllRoutes = (props: AllRoutesProps) => {
  const userAuthority = useAppSelector((state) => state.auth.user.role)

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route
          path="/"
          element={<Navigate replace to={authenticatedEntryPath} />}
        />
        {protectedRoutes.map((route, index) => {
          return <Route
            key={route.key + index}
            path={route.path}
            element={
              <AuthorityGuard
                userAuthority={userAuthority}
                authority={route.authority}
              >
                  <AppRoute
                    routeKey={route.key}
                    component={route.component}
                    {...route.authority}
                  />
              </AuthorityGuard>
            }
          />
        })}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
      <Route path="/" element={<PublicRoute />}>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AppRoute
                routeKey={route.key}
                component={route.component}
              />
            }
          />
        ))}
      </Route>
    </Routes>
  )
}

const Views = (props: ViewsProps) => {
  const {updateCurrencies} = useCurrency()
  const {updateTags} = useTag()
  const {data:currencies, isSuccess:isFindAllCurrencies} = useFindAllCurrencies()
  const {data:tags, isSuccess:isfindAllTags} = useFindAllTag()
  //call initial api
  useEffect(() => {
    if (isFindAllCurrencies || isfindAllTags){
      updateCurrencies(currencies)
      updateTags(tags)
    }
  },[isFindAllCurrencies,isfindAllTags])

  return (
    <Suspense fallback={
      <LoadingScreen/>
    }>
      <AllRoutes {...props} />
    </Suspense>
  )
}

export default Views
