import { Application } from './src/Application';
import { Coordinator } from './src/Coordinator';

import { Screens } from './src/screens';

Coordinator.sharedInstance.registerNativeScreens(Screens);
Coordinator.sharedInstance.registerAppLaunchedListener(Application.sharedInstance.bootstrap);
