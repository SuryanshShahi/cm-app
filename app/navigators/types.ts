import { TabNavigationState, ParamListBase, NavigationHelpers } from "@react-navigation/native";
import {BottomTabNavigationEventMap} from '@react-navigation/bottom-tabs';

export interface TabBarProps {
    state: TabNavigationState<ParamListBase>;
    descriptors: any;
    navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  }