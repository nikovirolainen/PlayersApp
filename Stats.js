import React from 'react';
import { StyleSheet, Text, View, Button, Image, Alert, TextInput, FlatList } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('playerdb.db');


export default class App extends React.Component {
    static navigationOptions = {title: 'Statistics'};

    render() {
        return null;
      }
      }