import {LayoutTypes} from "@/@types/layout";

export type AppConfig = {
  apiPrefix: string
  authenticatedEntryPath: string
  unAuthenticatedEntryPath: string
  enableMock: boolean
  locale: string
  layoutType: LayoutTypes,
}
const apiUrl = import.meta.env.SERVER_URL;

const appConfig: AppConfig = {
  layoutType: LayoutTypes.CollapsedSideBar,
  apiPrefix: apiUrl,
  authenticatedEntryPath: '/dashboard',
  unAuthenticatedEntryPath: '/sign-in',
  enableMock: false,
  locale: 'en',
}

export default appConfig
