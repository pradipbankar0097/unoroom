import { StatusBar } from 'expo-status-bar';
import React, { useState }  from 'react';
import { useEffect,AsyncStorage, Button, SafeAreaView, Alert ,
  StyleSheet, TextInput, Text, View, FlatList, ScrollView } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import { useListKeys } from 'react-firebase-hooks/database';
import { firebaseConfig } from './config';

import Game from './screens/Game';
// temp
import Card from './assets/components/Card'
import { withSafeAreaInsets } from 'react-native-safe-area-context';

firebase.initializeApp(firebaseConfig);
export var db = firebase.database();

var roomcodetopass ;
const HomeScreen = ({ navigation }) => {
  let [roomCode, setRoomCode] = useState('');
  let [user, setUser] = useState('');
  roomcodetopass = roomCode;
  return (
    <View style={styles.container}>

<Card height='80px' width='50px' cardnumber='🚫' cardcolor='#07d'/>
      <View style={{padding: 10}}>
      
      <TextInput
        style={{height: 40}}
        placeholder="Room code"
        onChangeText={roomCode => setRoomCode(roomCode)}
        defaultValue={roomCode}
      />
      
    </View>
    <View style={{padding: 10}}>
      <TextInput
        style={{height: 40}}
        placeholder="Your Name"
        onChangeText={user => setUser(user)}
        defaultValue={user}
      />
      
    </View>
    <Button
      title="Create Room"
      onPress={() => {navigation.navigate('Profile', {owner:true, roomCode : roomCode, name: user })}}
    />
    <Button
      title="Join"
      onPress={() => {navigation.navigate('Profile', {owner:false, roomCode : roomCode, name: user })}}
    />
    </View>
  );
};

var metadataupdated = false;
var cardtopick = 0;
const ProfileScreen = ({ navigation, route }) => {

  var room = db.ref(route.params.roomCode);
  var roomCode = route.params.roomCode.toString();
  var member = room.child('members/'+route.params.name);
  member.set({
    present:true
  })
  
  //if the logged in user is creator
  if(route.params.owner == true){
    
    if(!metadataupdated){

// program to shuffle the deck of cards
const suits = ["red", "blue", "green", "yellow"];
const values = ["1","2","3","4","5","6","7","8","9","🚫","🔁","+2","+4",];
let deck = [];
for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
        let card = { cardnumber: values[x], cardcolor: suits[i] };
        deck.push(card);
    }
}
deck = deck.concat(deck)
// shuffle the cards
for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
}

//shuffled deck ready
// const cards = store.collection(props.roomCode).doc('cards');

// cards.set({
//   cardstock: deck
// });


// display 5 results
// for (let i = 0; i < 5; i++) {
//     console.log(`${deck[i].Suit} ${deck[i].Value}`)
// }
var room = db.ref(route.params.roomCode);
 for (let i = 0; i < deck.length; i++) {
//     console.log(`${deck[i].cardcolor} ${deck[i].cardnumber}`)
        room.child('cards/'+i.toString()).set({
            cardcolor:deck[i].cardcolor,
            cardnumber:deck[i].cardnumber
        })
 }
   

  //tempend


     room.child('metadata').set({
        totalmembers:1,
        cardstaken:6,
        owner:route.params.name,

     })
     metadataupdated=true;
  
  }
  }

  else{
    
    if(!metadataupdated){
    console.log('in else')
    room.child('metadata').update({
      cardstaken:firebase.database.ServerValue.increment(6),
      totalmembers: firebase.database.ServerValue.increment(1)
    })
    metadataupdated=true;
    }
  }
  const [playerkeys, loading, error] = useListKeys(room.child('members'));
  
  return (<View 
            style={
              {
                backgroundColor:'white',
                
              }
            }
            >
    
    <Text>Room Code : {route.params.roomCode}</Text>

    <Button 
      style={styles.normalbutton}
     title="PLAY" onPress={()=>{navigation.navigate('Game', { firebase: firebase, db: db,roomCode : roomCode})}} />
    <Text>Members : </Text>
    <>
    {error && <Text>Error: {error}</Text>}
        {loading && <Text>Loading...</Text>}
        {!loading && playerkeys && (
          
            <ScrollView>
              {playerkeys.map((v) => (
                <View key={v} 
                style={{
                  padding:10,
                  backgroundColor:'rgb(255,255,240)',
                  borderWidth:'thin',
                  borderBottomColor:'#fff9'
                }}><Text
                style={{
                  display:'flex',
                }}>{v}</Text></View>
              ))}
            </ScrollView>
          
        )}
  
    </>
    
  </View>);
};

const GameScreen = ({ navigation, route }) => {
  

  const roomCode = route.params.roomCode;
  
  
  return (
    <Game roomCode={roomCode} />
  );
};
 

const Stack = createStackNavigator();

const Separator = () => (
  <View style={styles.separator} />
);

export default function App() {
  const [text, setText] = useState('');
  
  return (
    <NavigationContainer>
      
      <Stack.Navigator>

        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Game"  component={GameScreen} />

      </Stack.Navigator>

    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height:'100%',
  },
  normalbutton:{
    width:100,
    backgroundColor: 'rgb(22,200,200)',

  }
});


