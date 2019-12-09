/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    StatusBar,
} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from './screens/Home';
import Header from './components/Header/Header';
import About from './screens/About';
import Results from './screens/Results';


/**
 * Навигация главного экрана.
 * @type {any}
 */
const HomeNavigation = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: <Header />,
        },
    },
    About: {
        screen: About,
    },
    Results: {
        screen: Results
    }
});

const AppContainer = createAppContainer(HomeNavigation);

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <>
            <StatusBar backgroundColor={'#F0F0F0'} barStyle="dark-content"/>
            <AppContainer/>
        </>;
    }
}

export default App;
