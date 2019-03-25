import React from 'react';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './navigation/AppNavigator';

const AppContainer = createAppContainer(AppNavigator);

const Router = () => <AppContainer />;

export default Router;

/* import React from 'react';
import { Scene, Router, Actions, ActionConst } from 'react-native-router-flux';
import Welcome from './components/Welcome/Welcome';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

const scenes = Actions.create(
	<Scene key="root">
		<Scene key="welcome" component={Welcome} title="Welcome" initial={true} />
		<Scene key="login" component={Login} title="Login" type={ActionConst.REPLACE} />
		<Scene key="signUp" component={SignUp} title="Create New Account" type={ActionConst.REPLACE} />
	</Scene>
);

export default () => <Router scenes={scenes} />; */
