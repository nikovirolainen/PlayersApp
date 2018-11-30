import React from 'react';
import { StyleSheet, Text, View, Button, Image, Alert, TextInput, FlatList } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('playerdb.db');


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {players: [], name: '', weight: '', height: '', gamesPlayed: '', goals: '', assists: '',}
  }

  componentDidMount() {
    db.transaction( tx => {
      tx.executeSql('create table if not exists player (id integer primary key not null, name text, weight int, height int, gamesPlayed int, goals int, assists int);');
      this.updateList();
    });
    }

  savePlayer = () => {
    db.transaction(tx => {
      tx.executeSql('insert into player (name, weight, height, gamesPlayed, goals, assists) values (?, ?, ?, ?, ?, ?)',
        [this.state.name, parseInt(this.state.weight), parseInt(this.state.height), parseInt(this.state.gamesPlayed), parseInt(this.state.goals), parseInt(this.state.assists)]);
        }, null, this.updateList)
        }

  updateList= () => {
    db.transaction (tx => {
      tx.executeSql ('select * from player', [], (_, { rows }) => 
        this.setState({players: rows._array})
        );
        });
        }

   
  deletePlayer = (id) => {
    db.transaction(
      tx => {
        tx.executeSql('delete from player where id = ?;', [id]);
        }, null, this.updateList)    
        }
        

    listSeparator = () => {
      return (
        <View
          style={{
            height: 5,
            width: "80%",
            backgroundColor: "#fff",
            marginLeft: "10%"
          }}
        />
      );
    };

  render() {
    return (
      <View style={styles.container}>
        
        <Text>Nimi:</Text>
        <TextInput placeholder='Nimi' keyboardType="numeric" style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(name) => 
          this.setState({name})}
          value={this.state.name}/>

        <Text>Paino:</Text>
        <TextInput placeholder='Paino' keyboardType="numeric" style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(weight) => 
          this.setState({weight})}
          value={this.state.weight}/> 

        <Text>Pituus:</Text>
        <TextInput placeholder='Pituus' keyboardType="numeric" style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(height) => 
          this.setState({height})}
          value={this.state.height}/>

        <Text>Pelatut Ottelut:</Text>
        <TextInput placeholder='Pelatut Ottelut' keyboardType="numeric" style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(gamesPlayed) => 
          this.setState({gamesPlayed})}
          value={this.state.gamesPlayed}/>

        <Text>Maalit:</Text>
        <TextInput placeholder='Maalit' keyboardType="numeric" style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(goals) =>
          this.setState({goals})}
          value={`${this.state.goals}`}/>

        <Text>Syötöt:</Text>
        <TextInput placeholder='Syötöt' keyboardType="numeric" style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(assists) => 
          this.setState({assists})}
          value={this.state.assists}/>

          <Button onPress={this.savePlayer} color="green" title="Save player to database"/>

              <Text style={{marginTop: 30, fontSize: 20}}>Player List:</Text>
              <FlatList 
                style={{marginLeft : "5%"}} 
                keyExtractor={item => item.id} 
                renderItem={({item}) =>

              <View style = {styles.listcontainer}>
              <Text style={{fontSize: 18}}> Nimi: {item.name}, Paino: {item.weight}, Pituus: {item.height}, Pelatut Ottelut: {item.gamesPlayed}, Maalit: {item.goals}, Syötöt: {item.assists}, Pisteet: {item.goals + item.assists} </Text>
              <Text style ={{color: 'black'}} onPress= {()  => this.deletePlayer(item.id)}>Poista pelaaja</Text></View>}
              data={this.state.players} ItemSeparatorComponent={this.listSeparator}
              />
              </View>
    );
  }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 4,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    listcontainer: {
      flex: 7,
      flexDirection: 'column',
      backgroundColor: 'red',
      alignItems: 'center'
    }  
  });