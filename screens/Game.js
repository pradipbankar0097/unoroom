import React, { Component, useState } from 'react'
import PropTypes from 'prop-types'
import {View,Text,StyleSheet, ScrollView} from 'react-native'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import { useListKeys,useListVals,useObject } from 'react-firebase-hooks/database';
import { useList } from 'react-firebase-hooks/database';
import {useDocumentData} from 'react-firebase-hooks/firestore'
import Card from '../assets/Card'
import { firebaseConfig } from '../config';
import {db,myname,mycardnumber,deck} from '../App'

var currentcardnumber=0;

function Game(props) {

   var store = firebase.firestore()
   var room = db.ref(props.roomCode)
   const [playerkeys, loading, error] = useListKeys(room.child('members'))
   //const [cardsarray, loadingc, errorc] = useDocumentData(cards)
   const [cardkeys, loadingcards, errorcards] = useList(room.child('cards'))
   const [maincard,loadingmaincard,errormaincard] = useObject(room.child('maincard/card'))
   const [myCurrentCards, setMyCurrentCards] = useState(deck)
    
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
                    <View>
                    {errormaincard && <strong>Error: {error}</strong>}
                    {loadingmaincard && <span>Card Loading...</span>}
                    {maincard && <Card height='90%' cardcolor={maincard.val()['cardcolor']} cardnumber={maincard.val()['cardnumber']} />}
                    
                    </View>
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
                                deck.slice(mycardnumber,mycardnumber+6).map((card)=><Card key={card.cardcolor+card.cardnumber} width='20%'  cardcolor={card.cardcolor} cardnumber={card.cardnumber} />)
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
        roomCode : PropTypes.string,
        
    }

export default Game