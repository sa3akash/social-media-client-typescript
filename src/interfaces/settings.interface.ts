export interface ISettingsComponentsMap {
  profile: JSX.Element;
  account: JSX.Element;
  appearance: JSX.Element;
  notifications: JSX.Element;
  username: JSX.Element;
  security: JSX.Element;
}


export interface INotificationSettings {
  messages: boolean;
  reactions: boolean;
  comments: boolean;
  follows: boolean;
}