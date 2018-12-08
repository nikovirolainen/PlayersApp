import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, Alert, TextInput, FlatList } from 'react-native';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('playerdb.db');


export default class App extends React.Component {
    static navigationOptions = {title: 'Stats'};
    constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    }
    render() {
        this.params = this.props.navigation.state.params;
        return (
        <ImageBackground source={require('./backgroundphotos/NHL-photo.jpg')} style={styles.imgBackground}>
            <View>
                <Text>oispa {this.params.name}</Text>



            </View>
        </ImageBackground>
        );
      }
      }

      const styles = StyleSheet.create({

        imgBackground: {
            flex: 3,
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
        }});