import React, { Component } from 'react'
import PropTypes,{defaultProps} from 'prop-types'
import {View,Text, Pressable} from 'react-native'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

import {db,roomCodeToExport} from '../App'

export default class Card extends Component {
    static propTypes = {
        height: PropTypes.string,
        width: PropTypes.string,
        cardcolor: PropTypes.string,
        cardnumber: PropTypes.string,
        
    }
    static defaultProps ={
      cardcolor : 'red',
      cardnumber: '2'
    }
    
    render() {
      
        return (
          <Pressable
          style={{
            width:this.props.width,
        height: this.props.height,
        backgroundColor:'white',
        borderRadius:10,
        padding:5,
        borderWidth:'thin',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
          }}
            onPress={
              ()=>
              {
                db.ref(roomCodeToExport+'/maincard/card').update({
                  cardcolor:this.props.cardcolor,
                  cardnumber: this.props.cardnumber
                })
              }
            }
          >
            
    <View
      style={{
        width:'100%',
        height: '100%',
        backgroundColor:this.props.cardcolor,
        borderRadius:10,
        padding:10,
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-evenly'
      }}
    >
      <Text
        style={{
          color:'white',
          fontWeight:'bold'
        }}
      >{this.props.cardnumber}</Text>
      <View
        style={{
          height:'70%',
          width:'100%',
          borderRadius:100,
          backgroundColor:'white',
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
        }}
      >
        <Text
          style={{
            fontSize:50,
            fontWeight:'bold',
            color:this.props.cardcolor
          }}
        >{this.props.cardnumber}</Text>
      </View>
      <Text
        style={{
          color:'white',
          fontWeight:'bold'
        }}
      >{this.props.cardnumber}</Text>
    </View>
    
    </Pressable>
        )
    }
}

