import { lazy, Suspense, useMemo } from 'react';
import useAuth from '@/utils/hooks/useAuth';
import useLocale from '@/utils/hooks/useLocale';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import { LayoutTypes } from '@/@types/layout';
import { useAppSelector } from '@/store';
import { useReportTotalProduct } from '@/services/react-query/report/use-get-total-product';

const layouts: any = {
  [LayoutTypes.CollapsedSideBar]: lazy(() => import('./LayoutTypes/CollapsedSideBar')),
};

export function Layout() {
  const { authenticated } = useAuth();
  const layoutType = useAppSelector((state) => state.theme.currentLayout);
  //call api

  useLocale();
  const AppLayout = useMemo(() => {
    // if (authenticated) {
    //   return layouts[layoutType];
    // }
    // return lazy(() => import('./AuthLayout'));
    return layouts[layoutType];
  }, [authenticated]);

  return (
    <Suspense
      fallback={
        <div className="flex flex-auto flex-col h-[100vh]">
          <LoadingScreen />
        </div>
      }
    >
      <AppLayout />
    </Suspense>
  );
}
