import { Suspense, useEffect } from 'react'
import appConfig from '@/configs/app.config'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector } from '@/store'
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
import usePackage from '@/utils/hooks/useAttPackages';
import { useFindAllPackages } from '@/services/react-query/attPackage/use-find-all-package';
import useAttPackage from '@/utils/hooks/useAttPackages';
import { useFindAllCategories } from '@/services/react-query/category/use-find-all-category';
import useCategory from '@/utils/hooks/useCategory';

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
  //hooks
  const {updateCurrencies} = useCurrency()
  const {updateTags} = useTag()
  const {updateAttPackages} = useAttPackage()
  const {updateCategories}= useCategory()
  //call api
  const {data:currencies, isSuccess:isFindAllCurrencies} = useFindAllCurrencies()
  const {data:tags, isSuccess:isFindAllTags} = useFindAllTag()
  const {data:packages, isSuccess:isFindAllPackages} = useFindAllPackages()
  const {data:cateroies, isSuccess:isFindAllCategories}= useFindAllCategories()
  //update store
  useEffect(() => {
    if (isFindAllCurrencies && isFindAllTags && isFindAllPackages && isFindAllCategories){
      updateCurrencies(currencies)
      updateTags(tags)
      updateAttPackages(packages)
      updateCategories(cateroies)
    }
  },[isFindAllCurrencies,isFindAllTags,isFindAllPackages,isFindAllCategories])

  return (
    <Suspense fallback={
      <LoadingScreen/>
    }>
      <AllRoutes {...props} />
    </Suspense>
  )
}

export default Views
