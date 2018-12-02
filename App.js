import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './Home';
import Stats from './Stats';


export default class App extends React.Component {
 


render() {

  return( <MyApp/>
    );
}
}

const MainNavigator = createStackNavigator({
Home: {screen: Home},
Stats: {screen: Stats}
});
const MyApp = createAppContainer(MainNavigator);