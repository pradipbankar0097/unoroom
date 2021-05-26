import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {View,Text} from 'react-native'

export class Game extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <View>
                <Text>This is Game screen.</Text>
            </View>
        )
    }
}
