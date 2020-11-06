import { Navigation } from 'react-native-navigation';

import { ScreenWrapper } from './components/ScreenWrapper';

import { CoordinatorInterface } from './types/Coordinator.d';

import { TABS_SCREEN, PROFILE_SCREEN } from './screens/constants';

export class Coordinator implements CoordinatorInterface {
  private static instance: Coordinator;
  public static get sharedInstance(): Coordinator {
    if (!Coordinator.instance) Coordinator.instance = new Coordinator();
    return Coordinator.instance;
  }

  public registerNativeScreens: CoordinatorInterface['registerNativeScreens'] = (screens) => {
    screens.forEach((screen, key) => {
      Navigation.registerComponent(key, () => ScreenWrapper(screen, Coordinator.sharedInstance));
    });
  };

  public registerAppLaunchedListener: CoordinatorInterface['registerAppLaunchedListener'] = (listener) => {
    Navigation.events().registerAppLaunchedListener(() => {
      Navigation.setDefaultOptions({
        topBar: { visible: false },
      });
      //
      //
      listener(Coordinator.sharedInstance);
    });
  };

  /**
   * Stacks
   */

  public stackTabsScreen: CoordinatorInterface['stackTabsScreen'] = () => {
    return Navigation.setRoot({
      root: {
        bottomTabs: {
          id: TABS_SCREEN,
          children: [
            {
              stack: {
                children: [
                  {
                    component: {
                      id: PROFILE_SCREEN,
                      name: PROFILE_SCREEN,
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    text: 'profile',
                  },
                },
              },
            },
          ],
        },
      },
    });
  };
}
