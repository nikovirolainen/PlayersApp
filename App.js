import React from 'react';
import { StyleSheet, Text, View, Button, Image, Alert, TextInput, FlatList } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { SQLite } from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {players: [], weight: 0, height: 0, gamesPlayed: 0, goals: 0, assists: 0, points: 0 }
  }

  componentDidMount() {
    db.transaction( tx => {
      tx.executeSql('create table if not exists player (id integer primary key not null, weight number, height number, gamesPlayed number, goals number, assists number, points number);');
      this.updateList();
    });
    }

  savePlayer = () => {
    db.transaction(tx => {
      tx.executeSql('insert into player (weight, height, gamesPlayed, goals, assists, points) values(?, ?, ?, ?, ?, ?)',
        [this.state.weight, this.state.height, this.state.gamesPlayed, this.state.goals, this.state.assists, this.state.points]);
        }, null, this.updateList)
        }

  updateList= () => {
    db.transaction (tx => {
      tx.executeSql ('select * from player', [], (_, {rows}) => 
        this.setState({ players: rows._array})
        );
        });
        }

   
  deletePlayer = (id) => {
    db.transaction(
      tx => {
        tx.executeSql('delete from player where id = ?;', [id]);
        }, null, this.updateList)    
        }     

  render() {
    return (
      <View style={styles.container}>
        <View>
        <Text style= {{backgroundColor: 'white'}}>Lisää: {this.state.weight} {this.state.height} {this.state.gamesPlayed} {this.state.goals} {this.state.assists} {this.state.points}</Text>
        <Button onPress={this.savePlayer} title="ADD NEW PLAYER" />
        </View>
        <TextInput keyboardType = 'name-phone-pad' style={{ width: 90, borderColor: 'black', borderWidth: 4, backgroundColor: 'white'}}
      onChangeText={(weight) => this.setState({weight})}
      value={this.state.weight}/>
      <TextInput keyboardType = 'numbers-and-punctuation' style={{ width: 90, borderColor: 'black', borderWidth: 4, backgroundColor: 'white'}}
      onChangeText={(height) => this.setState({height})}
      value={this.state.height}/>
      <TextInput keyboardType = 'twitter' style={{ width: 90, borderColor: 'black', borderWidth: 4, backgroundColor: 'white'}}
      onChangeText={(gamesPlayed) => this.setState({gamesPlayed})}
      value={this.state.gamesPlayed}/>
      <TextInput keyboardType = 'numeric' style={{ width: 90, borderColor: 'black', borderWidth: 4, backgroundColor: 'white'}}
      onChangeText={(goals) => this.setState({goals})}
      value={this.state.goals}/>
      <TextInput keyboardType = 'numeric' style={{ width: 90, borderColor: 'black', borderWidth: 4, backgroundColor: 'white'}}
      onChangeText={(assists) => this.setState({assists})}
      value={this.state.assists}/>
      <TextInput keyboardType = 'numeric' style={{ width: 90, borderColor: 'black', borderWidth: 4, backgroundColor: 'white'}}
      onChangeText={(points) => this.setState({points})}
      value={this.state.points}/>
      <View style= {{width: 300, height: 200, alignItems: 'center'}}>
      <View style= {{backgroundColor: 'white'}}><Text>Player List:</Text></View>
      <FlatList style = {{marginLeft: "5%"}} keyExtractor={item => item.id.toString} renderItem={({item}) =>
      <View style = {styles.listcontainer}> <Text> {item.weight}, {item.height}, {item.gamesPlayed}, {item.goals}, {item.assists}, {item.points} </Text>
      <Text style ={{color: '#0000ff'}} onPress= {()  =>
      this.deleteItem(item.id)}>Poista pelaaja</Text> </View>} data={this.state.ostoslista}/>
      </View>
      </View>
    );
  }
  }

const db = SQLite.openDatabase('player.db');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const styles2 = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});
