import React from 'react';
import {StyleSheet, Text, View, Button, ImageBackground, TextInput, FlatList} from 'react-native';
import {SQLite} from 'expo';

const db = SQLite.openDatabase('playerssdb.db');


export default class App extends React.Component {
    static navigationOptions = {title: 'Adding a player'};
  constructor(props) {
    super(props);
    this.state = {players: [], name: '', position: '', gamesPlayed: '', goals: '', assists: ''}
    this.navigate = this.props.navigation.navigate;
  }

  componentDidMount() {
    db.transaction( tx => {
      tx.executeSql('create table if not exists playerss (id integer primary key not null, name text, position text, gamesPlayed int, goals int, assists int);');
      this.updateList();
    });
    }

  savePlayer = () => {
    db.transaction(tx => {
      tx.executeSql('insert into playerss (name, position, gamesPlayed, goals, assists) values (?, ?, ?, ?, ?)',
        [this.state.name, this.state.position, parseInt(this.state.gamesPlayed), parseInt(this.state.goals), parseInt(this.state.assists)]
        );
        }, null, this.updateList)
        }

  updateList= () => {
    db.transaction (tx => {
      tx.executeSql ('select * from playerss', [], (_, { rows }) => 
        this.setState({players: rows._array})
        );
        });
        }

   
  deletePlayer = (id) => {
    db.transaction(
      tx => {
        tx.executeSql('delete from playerss where id = ?;', [id]
        );
        }, null, this.updateList)    
        }
        

    listSeparator = () => {
      return (
        <View style={{height: 4, width: "85%", backgroundColor: "white", marginLeft: "10%"}}/>
        );
        };

  render() {
    return (
         
    <ImageBackground source={require('./backgroundphotos/NHL-photo.jpg')} style={styles.imgBackground}> 
        <View>
      
        
        <Text style={{color: 'black', fontStyle: 'italic', fontWeight: 'bold', textAlign:'center', fontSize: 20, textDecorationLine: 'underline'}}>Name:</Text>
        <TextInput style={{ marginTop: 5, marginBottom: 5,  fontSize:25, width: 361, height: 30, borderColor: 'white', borderWidth: 1}}
          onChangeText={(name) => 
          this.setState({name})}
          value={this.state.name}/>

        <Text style={{color: 'black', fontStyle: 'italic', fontWeight: 'bold', textAlign:'center', fontSize: 20, textDecorationLine: 'underline'}}>Position: (D/F)</Text>
        <TextInput placeholder='Position' style={{ marginTop: 5, marginBottom: 5,  fontSize:25, width: 361, height: 30, borderColor: 'blue', borderWidth: 1}}
          onChangeText={(position) => 
          this.setState({position})}
          value={this.state.position}/> 

        <Text style={{color: 'black', fontStyle: 'italic', fontWeight: 'bold', textAlign:'center', fontSize: 20, textDecorationLine: 'underline'}}>Games Played:</Text>
        <TextInput placeholder='Games Played' keyboardType="numeric" style={{ marginTop: 5, marginBottom: 5,  fontSize:25, width: 361, height: 30, borderColor: 'white', borderWidth: 1}}
          onChangeText={(gamesPlayed) => 
          this.setState({gamesPlayed})}
          value={this.state.gamesPlayed}/>

        <Text style={{color: 'black', fontStyle: 'italic', fontWeight: 'bold', textAlign:'center', fontSize: 20, textDecorationLine: 'underline'}}>Goals:</Text>
        <TextInput placeholder='Goals' keyboardType="numeric" style={{ marginTop: 5, marginBottom: 5,  fontSize:25, width: 361, height: 30, borderColor: 'blue', borderWidth: 1}}
          onChangeText={(goals) =>
          this.setState({goals})}
          value={this.state.goals}/>

        <Text style={{color: 'black', fontStyle: 'italic', fontWeight: 'bold', textAlign:'center', fontSize: 20, textDecorationLine: 'underline'}}>Assists:</Text>
        <TextInput placeholder='Assists' keyboardType="numeric" style={{ marginTop: 5, marginBottom: 5,  fontSize:25, width: 361, height: 30, borderColor: 'white', borderWidth: 1}}
          onChangeText={(assists) => 
          this.setState({assists})}
          value={this.state.assists}/>
        
        <Button onPress={this.savePlayer} color="red" title="Save player to database"/>

              <Text style={{textAlign: 'center', marginTop: 15, fontSize: 30}}>Player List:</Text>
              <FlatList 
                style={{ marginTop: '2%'}} 
                keyExtractor={item => item.id.toString()} 
                renderItem={({item}) =>

              <View style = {styles.listcontainer}>
              <Text style={{fontSize: 18}}>Name: {item.name}, Position: {item.position}, Games Played: {item.gamesPlayed}, Goals: {item.goals}, Assists: {item.assists}, Points: {item.goals + item.assists} </Text>
              <Text style ={{color: 'black'}} onPress= {()  => this.deletePlayer(item.id)}>Delete player</Text></View>}
              data={this.state.players} ItemSeparatorComponent={this.listSeparator}
              />
              <Button color="red" onPress={() => this.navigate('Stats', {players: [], name: 'Niko', position: '', gamesPlayed: '', goals: '', assists: ''})} title="Stats" />
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
    },

    listcontainer: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'white',
      alignItems: 'center',
      marginLeft: '0%'
    }  
  });
