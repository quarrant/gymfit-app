import { CoordinatorInterface } from './Coordinator.d';

export type ApplicationInterface = {
  bootstrap: (coordinator: CoordinatorInterface) => void;
};
