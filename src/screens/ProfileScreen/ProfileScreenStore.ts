import { action, observable } from 'mobx';

export class ProfileScreenStore {
  @observable public isLoading: boolean = true;

  @action public getProfileDetail = () => {
    this.isLoading = true;
  };
}
