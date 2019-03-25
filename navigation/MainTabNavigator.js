import _ from 'lodash';
import React from 'react';
import { Ionicons } from 'react-native-vector-icons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Welcome from '../components/Welcome/Welcome';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';
import Profile from '../components/Profile/Profile';
import RequestFormular from '../components/Profile/RequestFormular';

const ACTIVE_TAB_COLOR = "#69A6F7";
const INACTIVE_TAB_COLOR = "#aaa";

const Icon = ({ name, focused }) => (
  <Ionicons
    name={name}
    size={30}
    color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR}
  />
);

const LoginStack = createStackNavigator({
	Login  : {
		screen : Login
	},
	SignUp : {
		screen : SignUp
	}
});

const WelcomeStack = createStackNavigator({
	Welcome         : {
		screen : Welcome
	},
	Profile         : {
		screen : Profile
	},
	RequestFormular : {
		screen : RequestFormular
	}
});

export default createBottomTabNavigator(
	{
		Home  : WelcomeStack,

		Users : LoginStack
	},
	{
		initialRouteName  : 'Home',
		navigationOptions : ({ navigation }) => ({
			tabBarIcon : ({ focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state;
				console.log(routeName);
				let iconName;
				if (routeName === 'Home') {
					iconName = 'ios-home';
				} else if (routeName === 'Users') {
					iconName = 'ios-options';
				}

				return <Icon name={iconName} size={25} color={tintColor} />;
			}
		})
	}
);
