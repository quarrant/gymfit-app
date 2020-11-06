import { ApplicationInterface } from './types/Application.d';

export class Application implements ApplicationInterface {
  private static instance: Application;
  public static get sharedInstance(): Application {
    if (!Application.instance) Application.instance = new Application();
    return Application.instance;
  }

  public bootstrap: ApplicationInterface['bootstrap'] = (coordinator) => {
    //
    //
    coordinator.stackTabsScreen();
  };
}
