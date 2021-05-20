import { StatusBar } from 'expo-status-bar';
import React, { useState }  from 'react';
import {  Button, SafeAreaView, Alert ,StyleSheet, TextInput, Text, View, FlatList } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


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
      title="Create Room"
      onPress={() =>
        navigation.navigate('Profile', { roomCode : roomCode, name: user })
      }
    />
  <Button
      title="Join"
      onPress={() =>
        navigation.navigate('Profile', { name: 'Jane' })
      }
    />
    </View>
  );
};
const ProfileScreen = ({ navigation, route }) => {
  return (<View>
    
    <Text>Room Code : {route.params.roomCode}</Text>
    <Text>Members</Text>
    
    
      <li>{route.params.name}</li>
    
  
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
      {/*navigation */}
    <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />

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
  },
});
