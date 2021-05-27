import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {View,Text} from 'react-native'

export default class Card extends Component {
    static propTypes = {
        height: PropTypes.string,
        width: PropTypes.string
    }

    render() {
        return (
            <View 
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
    >
    <View
      style={{
        width:'100%',
        height: '100%',
        backgroundColor:'red',
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
      >2</Text>
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
            color:'red'
          }}
        >2</Text>
      </View>
      <Text
        style={{
          color:'white',
          fontWeight:'bold'
        }}
      >2</Text>
    </View>
    </View>
        )
    }
}

