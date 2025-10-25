import {
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<any>();
export const staticNavigation: StaticNavigation<
  string,
  {route: any; params: any}
> = {
  navigate(name: any, params) {
    if (navigationRef.isReady()) {
      const currentRoute = navigationRef.getCurrentRoute();
      if (currentRoute?.name === name) {
        navigationRef.dispatch(StackActions.replace(name, params));
      } else {
        navigationRef.navigate(name, params);
      }
    }
  },
  push(name, params) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.push(name, params));
    }
  },
  goBack() {
    if (navigationRef.isReady()) {
      navigationRef.goBack();
    }
  },
};

export interface RouteWithParamsInterface {
  route: string;
  params: any;
}

export type AsParamListBase<T extends RouteWithParamsInterface> = {
  [k in T['route']]: T extends {route: k; params: infer P} ? P : never;
};

export type ExtractParams<
  Route extends string,
  U extends RouteWithParamsInterface,
> = U extends {
  route: Route;
  params: infer P;
}
  ? P
  : never;

interface StaticNavigation<
  Routes extends string,
  RouteWithParams extends RouteWithParamsInterface,
> {
  navigate<Route extends Routes>(
    ...args:
      | [name: Route, params: ExtractParams<Route, RouteWithParams>]
      | [name: Route]
  ): void;

  push<Route extends Routes>(
    ...args:
      | [name: Route, params: ExtractParams<Route, RouteWithParams>]
      | [name: Route]
  ): void;

  goBack(): void;
}

export const RunAfterAppReady = <
  Routes extends string,
  RouteWithParams extends {route: Routes; params: any},
>(
  callback: (navigation: StaticNavigation<Routes, RouteWithParams>) => void,
) => {
  const id = setInterval(async () => {
    if (navigationRef.isReady()) {
      clearInterval(id);
      callback(staticNavigation);
    }
  }, 1000);
};
