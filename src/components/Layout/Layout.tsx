import React, {lazy, Suspense, useEffect, useMemo} from "react";
import useAuth from "@/utils/hooks/useAuth";
import useLocale from "@/utils/hooks/useLocale";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import {LayoutTypes} from "@/@types/layout";
import {useAppSelector} from "@/store";
import useCurrency from "@/utils/hooks/useCurrency";
import useTag from "@/utils/hooks/useTag";
import useAttPackage from "@/utils/hooks/useAttPackages";
import useCategory from "@/utils/hooks/useCategory";
import useSubCategory from "@/utils/hooks/useSubCategory";
import useBrand from "@/utils/hooks/useBrand";
import useSupplier from "@/utils/hooks/useSupplier";
import { useFindAllCurrencies } from "@/services/react-query/currency/use-find-all-currency";
import { useFindAllPackages } from "@/services/react-query/attPackage/use-find-all-package";
import { useFindAllBrands } from "@/services/react-query/brand/use-find-all-brand";
import { useFindAllCategories } from "@/services/react-query/category/use-find-all-category";
import { useFindAllSubCategories } from "@/services/react-query/subCategory/use-find-subCategory";
import { useFindAllSuppliers } from "@/services/react-query/supplier/use-find-all-supplier";
import { useFindAllTag } from "@/services/react-query/tag/use-find-all-tag";
import useProduct from "@/utils/hooks/useProduct";

const layouts:any = {
  [LayoutTypes.CollapsedSideBar]: lazy(() => import('./LayoutTypes/CollapsedSideBar')),
}

export function Layout() {
  const {authenticated} = useAuth()
  const layoutType = useAppSelector((state) => state.theme.currentLayout)
  //hooks
  const {updateCurrencies} = useCurrency()
  const {updateTags} = useTag()
  const {updateAttPackages} = useAttPackage()
  const {updateCategories}= useCategory()
  const {updateSubCategories} = useSubCategory()
  const {updateBrands} = useBrand()
  const {updateSuppliers} = useSupplier()
  const {updateProducts} = useProduct()
  //call api
  const {data:currencies, isSuccess:isFindAllCurrencies} = useFindAllCurrencies()
  const {data:tags, isSuccess:isFindAllTags} = useFindAllTag()
  const {data:cateroies, isSuccess:isFindAllCategories}= useFindAllCategories()
  const {data:sucCategories, isSuccess:isFindAllSubCategories}= useFindAllSubCategories()
  const {data:brands, isSuccess:isFindAllBrands} = useFindAllBrands()
  const {data:suppliers,isSuccess:isFindAllSuppliers} = useFindAllSuppliers()
  //update store
  useEffect(() => {
    if (isFindAllCurrencies && isFindAllTags && isFindAllCategories && isFindAllSubCategories && isFindAllBrands && isFindAllSuppliers){
      updateCurrencies(currencies)
      updateTags(tags)
      updateCategories(cateroies)
      updateSubCategories(sucCategories)
      updateBrands(brands)
      updateSuppliers(suppliers)
    }
  },[isFindAllCurrencies,isFindAllTags,isFindAllCategories,isFindAllSubCategories,isFindAllBrands,isFindAllSuppliers])

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
