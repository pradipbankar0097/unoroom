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

import {Game} from './screens/Game';
import Card from './assets/components/Card'
import { withSafeAreaInsets } from 'react-native-safe-area-context';

firebase.initializeApp(firebaseConfig);
var db = firebase.database();

const HomeScreen = ({ navigation }) => {
  let [roomCode, setRoomCode] = useState('');
  let [user, setUser] = useState('');
  return (
    <View style={styles.container}>

    
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
      title="Create Room OR Join"
      onPress={() => {navigation.navigate('Profile', { roomCode : roomCode, name: user })}}
    />
    
    </View>
  );
};


const ProfileScreen = ({ navigation, route }) => {
  

  var room = db.ref(route.params.roomCode);
  var member = room.child('members/'+route.params.name);
  member.set({
    present:true
  })
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
     title="PLAY" onPress={()=>{navigation.navigate('Game')}} />
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

const Stack = createStackNavigator();

const Separator = () => (
  <View style={styles.separator} />
);

export default function App() {
  const [text, setText] = useState('');
  
  return (
    <NavigationContainer>
      
    <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Game" component={Game} />

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


