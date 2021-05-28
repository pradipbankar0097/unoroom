import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {View,Text,StyleSheet, ScrollView} from 'react-native'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import { useListKeys } from 'react-firebase-hooks/database';
import {useDocumentData} from 'react-firebase-hooks/firestore'
import Card from '../assets/components/Card'
import { firebaseConfig } from '../config';

function Game(props) {

   var store = firebase.firestore()
   var room = props.db.ref(props.roomCode);
   const [playerkeys, loading, error] = useListKeys(room.child('members'))
  
        return (
            <View
                style={
                    styles.maincontainer
                }
            >
                <View
                    style={{
                        display:'flex',
                        width:'100%',
                        flexDirection:'row',
                        justifyContent:'center',
                        alignItems:'center',
                        position:'absolute',
                        top:'0',
                    }}
                >
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{
                            height:80,
                            width:'auto',
                            boxShadow:'inset 0 0 10px #000000',
                        }}
                    >
                         {playerkeys.map((v) => (
                <Text
                key={v}
                style={{
                  display:'flex',
                }}>{v+', '}</Text>
              ))}
                         
                         <Text>{props.roomCode}</Text>
                    </ScrollView>
                </View>
                <View
                    style={{
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                    }}
                >
                    <Text>middle</Text>
                </View>
                <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{
                            position:'absolute',
                            bottom:0,
                            height:'auto',
                            width:'80%',
                            boxShadow:'inset 0 0 10px #000000',
                        }}
                    >
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    <Card height='80px' width='50px'/>
                    
                    </ScrollView>
                
            </View>
        )
    
}


const styles = StyleSheet.create({
  maincontainer: {
    display:'flex',
    flexDirection:'column',
    backgroundColor: '#fff',
    justifyContent:'space-evenly',
    height:'100%',
  },
  
});

Game.propTypes = {
        firebase: PropTypes.instanceOf(firebase),
        db : PropTypes.instanceOf(firebase.database.Database),
        roomCode : PropTypes.string
    }

export default Game