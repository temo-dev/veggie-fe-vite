import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
  {
    key: 'dashboard',
    path: '/dashboard',
    component: lazy(() => import('@/pages/dashboard')),
    authority: []
  },
  {
    key: 'products',
    path: '/products',
    component: lazy(() => import('@/pages/product')),
    authority: []
  },
  {
    key: 'extensions',
    path: '/extensions',
    component: lazy(() => import('@/pages/extension')),
    authority: []
  },
  {
    key: 'suppliers',
    path: '/suppliers',
    component: lazy(() => import('@/pages/supplier')),
    authority: []
  },
  {
    key: 'purchase-prices',
    path: '/purchase-prices',
    component: lazy(() => import('@/pages/purchase-price')),
    authority: []
  },
  {
    key: 'brands',
    path: '/brands',
    component: lazy(() => import('@/pages/brand')),
    authority: []
  },
  {
    key: 'brand-detail',
    path: '/brands/brand-detail',
    component: lazy(() => import('@/pages/brand/brand-detail')),
    authority: []
  },
  {
    key: 'product-detail',
    path: '/products/product-detail',
    component: lazy(() => import('@/pages/product/product-detail')),
    authority: []
  },
  {
    key: 'supplier-detail',
    path: '/suppliers/supplier-detail',
    component: lazy(() => import('@/pages/supplier/supplier-detail')),
    authority: []
  },
  {
    key: 'zone-detail',
    path: '/zone/zone-detail',
    component: lazy(() => import('@/pages/zone/zone-detail')),
    authority: []
  },
  {
    key: 'zone',
    path: '/zone',
    component: lazy(() => import('@/pages/zone')),
    authority: []
  },
]
