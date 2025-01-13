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
    key: 'categories',
    path: '/categories',
    component: lazy(() => import('@/pages/category')),
    authority: []
  },
  {
    key: 'currencies',
    path: '/currencies',
    component: lazy(() => import('@/pages/currency')),
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
]
