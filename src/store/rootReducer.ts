import {combineReducers, AnyAction, Reducer} from 'redux'
import auth, {AuthState} from './slices/auth'
import base, {BaseState} from './slices/base'
import locale, {LocaleState} from './slices/locale/localeSlice'
import currency,{ CurrencyAllState } from './slices/currency'
import theme, { ThemeState } from './slices/theme/themeSlice'
import tag, { TagAllState } from './slices/tag'

export type RootState = {
  auth: AuthState
  base: BaseState
  locale: LocaleState
  theme: ThemeState
  currency: CurrencyAllState
  tag :TagAllState
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
  tag
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
