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
  const {data:currencies, isSuccess:isFindAllCurrencies} = useFindAllCurrencies()
  //call initial api
  useEffect(() => {
    if (isFindAllCurrencies){
      updateCurrencies(currencies)
    }
  },[isFindAllCurrencies])

  return (
    <Suspense fallback={
      <LoadingScreen/>
    }>
      <AllRoutes {...props} />
    </Suspense>
  )
}

export default Views
