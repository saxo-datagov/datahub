import LoginBaseRoute from '@datahub/shared/routes/login-base';
export default class LoginRoute extends LoginBaseRoute {
  beforeModel(): Promise<void> {
    this.transitionTo('browse');
    return Promise.resolve();
  }
}
