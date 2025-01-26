import React, {useEffect, useState} from 'react';
import {Card, Center, Stack, Tooltip} from '@mantine/core';
import {
  IconLogout,
} from '@tabler/icons-react';
import classes from './CollapsedSideBar.module.css';
import navigationConfig from "@/configs/navigation.config";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Views from "@/components/Layout/Views";
import useAuth from "@/utils/hooks/useAuth";
import CollapsedSideBarUserPopOver from "@/components/UserPopOver/CollapsedSideBarUserPopOver";
import AuthorityCheck from '@/route/AuthorityCheck';
import {useAppSelector} from "@/store";
import useCurrency from '@/utils/hooks/useCurrency';
import useTag from '@/utils/hooks/useTag';
import useAttPackage from '@/utils/hooks/useAttPackages';
import useCategory from '@/utils/hooks/useCategory';
import { useFindAllCurrencies } from '@/services/react-query/currency/use-find-all-currency';
import { useFindAllTag } from '@/services/react-query/tag/use-find-all-tag';
import { useFindAllPackages } from '@/services/react-query/attPackage/use-find-all-package';
import { useFindAllCategories } from '@/services/react-query/category/use-find-all-category';
import { useFindAllSubCategories } from '@/services/react-query/subCategory/use-find-subCategory';
import useSubCategory from '@/utils/hooks/useSubCategory';
import useBrand from '@/utils/hooks/useBrand';
import { useFindAllBrands } from '@/services/react-query/brand/use-find-all-brand';
import { useFindAllSuppliers } from '@/services/react-query/supplier/use-find-all-supplier';
import useSupplier from '@/utils/hooks/useSupplier';

function CollapsedSideBarBottomContent() {
  const {signOut} = useAuth()
  return (
    <div className={classes.linkWrapper}>
      <div className={classes.link}>
        <CollapsedSideBarUserPopOver/>
      </div>
      <div className={classes.link} onClick={() => {
        signOut()
      }}>
        <IconLogout/>
      </div>
    </div>
  )
}

function CollapsedSideBarContent() {
  const [active, setActive] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const userAuthority = useAppSelector((state) => state.auth.user.role)

  useEffect(() => {
    const currentPath = location.pathname.split('/')[1];
    setActive(currentPath);
  }, [location.pathname]);

  const links = navigationConfig.map((item,key) => (
    <AuthorityCheck userAuthority={userAuthority ? userAuthority : []} authority={item.authority} key={key}>
      <Tooltip label={`${item.title}`} position="right" withArrow>
      <Link
        className={classes.link}
        data-active={item.path.split('/')[1] === active ? 'true' : undefined}
        to={item.path}
        key={item.title}
        onClick={(event) => {
          event.preventDefault();
          navigate(item.path);
        }}
      >
        <item.icon className={classes.linkIcon} stroke={1.5}/>
      </Link>
      </Tooltip>
    </AuthorityCheck>
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        <img className={classes.logo} alt={'Veggie Logo'} src={'/logo/logo-text-on-dark-1.svg'}/>
      </Center>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={10}>
          {links}
        </Stack>
      </div>
      <CollapsedSideBarBottomContent/>
    </nav>
  )
}

export default function CollapsedSideBar() {
  //hooks
  const {updateCurrencies} = useCurrency()
  const {updateTags} = useTag()
  const {updateAttPackages} = useAttPackage()
  const {updateCategories}= useCategory()
  const {updateSubCategories} = useSubCategory()
  const {updateBrands} = useBrand()
  const {updateSuppliers} = useSupplier()
  //call api
  const {data:currencies, isSuccess:isFindAllCurrencies} = useFindAllCurrencies()
  const {data:tags, isSuccess:isFindAllTags} = useFindAllTag()
  const {data:packages, isSuccess:isFindAllPackages} = useFindAllPackages()
  const {data:cateroies, isSuccess:isFindAllCategories}= useFindAllCategories()
  const {data:sucCategories, isSuccess:isFindAllSubCategories}= useFindAllSubCategories()
  const {data:brands, isSuccess:isFindAllBrands} = useFindAllBrands()
  const {data:suppliers,isSuccess:isFindAllSuppliers} = useFindAllSuppliers()
  //update store
  useEffect(() => {
    if (isFindAllCurrencies && isFindAllTags && isFindAllPackages && isFindAllCategories && isFindAllSubCategories && isFindAllBrands && isFindAllSuppliers){
      updateCurrencies(currencies)
      updateTags(tags)
      updateAttPackages(packages)
      updateCategories(cateroies)
      updateSubCategories(sucCategories)
      updateBrands(brands)
      updateSuppliers(suppliers)
    }
  },[isFindAllCurrencies,isFindAllTags,isFindAllPackages,isFindAllCategories,isFindAllSubCategories,isFindAllBrands,isFindAllSuppliers])
  return (
    <>
      <div style={{
        display: 'flex',
        flex: ' 1 1 auto',
        backgroundColor: 'rgb(31, 143, 0)',
      }}>
        <CollapsedSideBarContent/>
        <div style={{
          padding: '2rem',
          backgroundColor: '#ffffff',
          flex: 1,
          overflow: 'scroll',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}>
          <Views/>
        </div>
      </div>
    </>
  )

}
