import {combineReducers, AnyAction, Reducer} from 'redux'
import auth, {AuthState} from './slices/auth'
import base, {BaseState} from './slices/base'
import locale, {LocaleState} from './slices/locale/localeSlice'
import currency,{ CurrencyAllState } from './slices/currency'
import theme, { ThemeState } from './slices/theme/themeSlice'
import tag, { TagAllState } from './slices/tag'
import attpackage,{ PackageAllState } from './slices/att-package'
import category,{ CategoryAllState } from './slices/category'
import subCategory,{ SubCategoryAllState } from './slices/subCategory'
import brand,{ BrandAllState } from './slices/brand'

export type RootState = {
  auth: AuthState
  base: BaseState
  locale: LocaleState
  theme: ThemeState
  currency: CurrencyAllState
  tag :TagAllState
  attpackage: PackageAllState
  category: CategoryAllState
  subCategory: SubCategoryAllState
  brand: BrandAllState
  /* eslint-disable @typescript-eslint/no-explicit-any */
}

export interface AsyncReducers {
  [key: string]: Reducer<any, AnyAction>
}

const staticReducers = {
  auth,
  base,
  locale,
  theme,
  currency,
  tag,
  attpackage,
  category,
  subCategory,
  brand,
}

const rootReducer =
  (asyncReducers?: AsyncReducers) => (state: RootState, action: AnyAction) => {
    const combinedReducer = combineReducers({
      ...staticReducers,
      ...asyncReducers,
    })
    return combinedReducer(state, action)
  }

export default rootReducer
