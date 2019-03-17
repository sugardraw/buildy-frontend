import React from 'react';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './navigation/AppNavigator';

const AppContainer = createAppContainer(AppNavigator);

const Router = () => <AppContainer />;

export default Router;
