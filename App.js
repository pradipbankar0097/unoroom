import { StatusBar } from 'expo-status-bar';
import React, { useState }  from 'react';
import {  Button, SafeAreaView, Alert ,StyleSheet, TextInput, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const HomeScreen = ({ navigation }) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', { name: 'Jane' })
      }
    />
  );
};
const ProfileScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
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

        
    <View style={styles.container}>
      <View style={{padding: 10}}>
      <TextInput
        style={{height: 40}}
        placeholder="Room code"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      
    </View>

{/* button */}
<Button
        title="Create Room"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
      
<Button
        title="Join Room"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
      
    </View>

    
      
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
