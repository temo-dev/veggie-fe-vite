import React, {lazy, Suspense, useEffect, useMemo} from "react";
import useAuth from "@/utils/hooks/useAuth";
import useLocale from "@/utils/hooks/useLocale";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import {LayoutTypes} from "@/@types/layout";
import {useAppSelector} from "@/store";
import useProduct from "@/utils/hooks/useProduct";
import { useFindProduct } from "@/services/react-query/product/use-find-all-product";
import { useReportTotalProduct } from "@/services/react-query/report/use-get-total-product";

const layouts:any = {
  [LayoutTypes.CollapsedSideBar]: lazy(() => import('./LayoutTypes/CollapsedSideBar')),
}

export function Layout() {
  const {authenticated} = useAuth()
  const layoutType = useAppSelector((state) => state.theme.currentLayout)
  //hooks
  const {updateProducts} = useProduct()
  //call api
const {data:products, isSuccess:isFetchedProduct} = useFindProduct(10,1,"",null)
const { isSuccess:isFetchedReportTotal} = useReportTotalProduct()
  //update store
  useEffect(() => {
    if (isFetchedReportTotal && isFetchedProduct){
      updateProducts(products)
    }
  }, [isFetchedProduct,isFetchedReportTotal])
  
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
