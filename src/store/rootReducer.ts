import {combineReducers, AnyAction, Reducer} from 'redux'
import auth, {AuthState} from './slices/auth'
import locale, {LocaleState} from './slices/locale/localeSlice'
import theme, { ThemeState } from './slices/theme/themeSlice'
import product,{ ProductAllState } from './slices/product'
import report, { ReportAllState } from './slices/report'

export type RootState = {
  auth: AuthState
  locale: LocaleState
  theme: ThemeState
  product: ProductAllState
  report: ReportAllState
  /* eslint-disable @typescript-eslint/no-explicit-any */
}

export interface AsyncReducers {
  [key: string]: Reducer<any, AnyAction>
}

const staticReducers = {
  auth,
  locale,
  theme,
  product,
  report,
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
