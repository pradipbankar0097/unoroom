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

    //
    // program to shuffle the deck of cards

// declare card elements
const suits = ["#fc1c03", "#1298ff", "#15e83f", "#fffb00"];
const values = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "🚫",
  "🔁",
  "+2",
  "+4",
];

// empty array to contain cards
let deck = [];

// create a deck of cards
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
const members = store.collection(props.roomCode).doc('cards');

members.set({
  cardstock: deck
});


// display 5 results
// for (let i = 0; i < 5; i++) {
//     console.log(`${deck[i].Suit} ${deck[i].Value}`)
// }

// for (let i = 0; i < deck.length; i++) {
//     console.log(`${deck[i].Suit} ${deck[i].Value}`)
// }
    //

   var room = props.db.ref(props.roomCode);
   const [playerkeys, loading, error] = useListKeys(room.child('members'))
   const [cardsarray, loadingc, errorc] = useDocumentData(store.collection(props.roomCode).doc('cards'))
   console.log(cardsarray)
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
                    {
                        deck.map((card)=>{
                            <Card height='75px' width='50px' cardcolor={card.cardcolor} cardnumber={card.cardnumber}/>
                        }
                        )
                    }
                    
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