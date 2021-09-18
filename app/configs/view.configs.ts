export enum ViewTypes {
  COMMUNICATIONS = 'Communications',
  DAILY_QUESTIONS = 'DailyQuestions',
  MY_SPACE = 'MySpace',
  SPACE_TALKING = 'SpaceTalking',
}

export type MainTabsParamList = {
  [ViewTypes.COMMUNICATIONS]: undefined;
  [ViewTypes.DAILY_QUESTIONS]: undefined;
  [ViewTypes.MY_SPACE]: undefined;
  [ViewTypes.SPACE_TALKING]: undefined;
};
