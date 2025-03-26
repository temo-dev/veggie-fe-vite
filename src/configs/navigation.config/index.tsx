import type {NavigationTree} from '@/@types/navigation';
import {IconBrandVinted, IconSalad,IconCategory,IconUsersGroup} from '@tabler/icons-react';

const navigationConfig: NavigationTree[] = [
  // {
  //   key: 'dashboard',
  //   path: '/dashboard',
  //   title: 'Dashboard',
  //   translateKey: '',
  //   icon: IconDashboard,
  //   authority: [],
  //   subMenu: []
  // },
  // {
  //   key: 'suppliers',
  //   path: '/suppliers',
  //   title: 'Supplier',
  //   translateKey: '',
  //   icon: IconBuildingFactory2,
  //   authority: [],
  //   subMenu: []
  // },
  // {
  //   key: 'brands',
  //   path: '/brands',
  //   title: 'Brand',
  //   translateKey: '',
  //   icon: IconBrandVinted,
  //   authority: [],
  //   subMenu: []
  // },
  {
    key: 'products',
    path: '/products',
    title: 'Products',
    translateKey: '',
    icon: IconSalad,
    authority: [],
    subMenu: []
  },
  // {
  //   key: 'extensions',
  //   path: '/extensions',
  //   title: 'Extension',
  //   translateKey: '',
  //   icon: IconCategory,
  //   authority: [],
  //   subMenu: []
  // },
  // {
  //   key: 'purchase-prices',
  //   path: '/purchase-prices',
  //   title: 'Purchase Price',
  //   translateKey: '',
  //   icon: IconSettingsDollar,
  //   authority: [],
  //   subMenu: []
  // },
  // {
  //   key: 'zones',
  //   path: '/zone',
  //   title: 'Zone',
  //   translateKey: '',
  //   icon: IconUsersGroup,
  //   authority: [],
  //   subMenu: []
  // },
];

export default navigationConfig;
