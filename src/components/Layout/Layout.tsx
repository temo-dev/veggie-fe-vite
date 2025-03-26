import React, {lazy, Suspense, useEffect, useMemo} from "react";
import useAuth from "@/utils/hooks/useAuth";
import useLocale from "@/utils/hooks/useLocale";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import {LayoutTypes} from "@/@types/layout";
import {useAppSelector} from "@/store";
import useProduct from "@/utils/hooks/useProduct";
import { useFindProduct } from "@/services/react-query/product/use-find-all-product";

const layouts:any = {
  [LayoutTypes.CollapsedSideBar]: lazy(() => import('./LayoutTypes/CollapsedSideBar')),
}

export function Layout() {
  const {authenticated} = useAuth()
  const layoutType = useAppSelector((state) => state.theme.currentLayout)
  //hooks
  const {updateProducts} = useProduct()
  //call api
const {data:products, status:isFetched} = useFindProduct(10,1,"",null)
  //update store

  useEffect(() => {
    if (isFetched == "success"){
      updateProducts(products)
    }
  }, [isFetched])
  

  useLocale()
  const AppLayout = useMemo(() => {
    if (authenticated) {
      return  layouts[layoutType]
    }
    return lazy(() => import('./AuthLayout'))
  }, [authenticated])

  return (
    <Suspense
      fallback={
        <div className="flex flex-auto flex-col h-[100vh]">
          <LoadingScreen/>
        </div>
      }
    >
      <AppLayout/>
    </Suspense>
  );
}
