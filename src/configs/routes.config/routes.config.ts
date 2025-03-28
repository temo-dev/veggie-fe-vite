import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
  {
    key: 'products',
    path: '/products',
    component: lazy(() => import('@/pages/product')),
    authority: []
  },
  {
    key: 'product-detail',
    path: '/products/product-detail',
    component: lazy(() => import('@/pages/product/product-detail')),
    authority: []
  },
  {
    key: 'dashboard',
    path: '/dashboard',
    component: lazy(() => import('@/pages/dashboard')),
    authority: []
  },
]
