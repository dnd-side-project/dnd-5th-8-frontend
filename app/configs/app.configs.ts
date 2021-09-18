interface AppConfig {
  isDevelopment: boolean;
  baseUrl: string;
}

export const appConfigs: AppConfig = {
  isDevelopment: false,
  baseUrl: 'http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080',
};
