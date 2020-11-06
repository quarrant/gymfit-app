export type ScreenComponentProps<P = {}> = P & {
  coordinator: CoordinatorInterface;
  componentId: string;
};

export type ScreensMap = Map<string, React.ComponentClass<ScreenComponentProps<any>>>;

export type CoordinatorInterface = {
  registerNativeScreens: (screens: ScreensMap) => void;
  registerAppLaunchedListener: (listener: (coordinator: CoordinatorInterface) => void) => void;

  /**
   * Stacks
   */
  stackTabsScreen: () => Promise<string>;
};
