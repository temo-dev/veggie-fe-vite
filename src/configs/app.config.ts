import {LayoutTypes} from "@/@types/layout";

export type AppConfig = {
  apiPrefix: string
  authenticatedEntryPath: string
  unAuthenticatedEntryPath: string
  enableMock: boolean
  locale: string
  layoutType: LayoutTypes,
}

const appConfig: AppConfig = {
  layoutType: LayoutTypes.CollapsedSideBar,
  apiPrefix: import.meta.env.VITE_PUBLIC_REST_API_ENDPOINT,
  authenticatedEntryPath: '/dashboard',
  unAuthenticatedEntryPath: '/sign-in',
  enableMock: false,
  locale: 'en',
}

export default appConfig
