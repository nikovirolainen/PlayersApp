import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';


export default class App extends React.Component {
    static navigationOptions = {title: 'Stats'};
    constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    }
    render() {
        return (
        <ImageBackground source={require('./backgroundphotos/ice-hockey-photo.jpg')} style={styles.imgBackground}>
            <View>
                <Text style={{fontSize: 30, color: 'red'}}> Hello {this.props.navigation.state.params.name}</Text>
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