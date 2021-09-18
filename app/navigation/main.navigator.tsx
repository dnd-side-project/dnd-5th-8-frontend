import { memo, useCallback, ReactNode } from 'react';
import IsEqual from 'react-fast-compare';
import { StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabsParamList, ViewTypes } from '@/configs';
import { Communications, DailyQuestions, MySpace, SpaceTalking } from '@/screens';
import { defaultTheme } from '@/styles';
import { styles } from './styles';

const BottomTab = createBottomTabNavigator<MainTabsParamList>();

function MainTabsNavigator(): JSX.Element {
  const renderTabbarBG = useCallback((): ReactNode => {
    return <BlurView blurType="light" blurRadius={25} style={StyleSheet.absoluteFill} />;
  }, []);

  return (
    <BottomTab.Navigator
      initialRouteName={ViewTypes.DAILY_QUESTIONS}
      screenOptions={{
        tabBarActiveTintColor: defaultTheme.colors.primary,
        tabBarInactiveTintColor: defaultTheme.colors.gray400,
        tabBarStyle: styles.bottomTab,
        tabBarBackground: renderTabbarBG,
      }}>
      <BottomTab.Screen
        name={ViewTypes.SPACE_TALKING}
        component={SpaceTalking}
        options={{
          tabBarLabel: 'Talk',
        }}
      />
      <BottomTab.Screen
        name={ViewTypes.COMMUNICATIONS}
        component={Communications}
        options={{
          tabBarLabel: 'List',
        }}
      />
      <BottomTab.Screen
        name={ViewTypes.DAILY_QUESTIONS}
        component={DailyQuestions}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <BottomTab.Screen
        name={ViewTypes.MY_SPACE}
        component={MySpace}
        options={{
          tabBarLabel: 'Space',
        }}
      />
    </BottomTab.Navigator>
  );
}

export default memo(MainTabsNavigator, IsEqual);
