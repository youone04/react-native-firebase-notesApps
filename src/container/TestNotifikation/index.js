import React, { Component } from 'react'
import { Text, View ,TouchableOpacity } from 'react-native'
import { showNotification , handleScheduleNotification , handleCancel } from "../../config/notification";
import PushNotification from "react-native-push-notification";

export default class TestNotifikation extends Component {

    showNotification= (title , message) => {
        // alert(title)
        PushNotification.localNotification({
            title: title,
            message: message
        })
    }
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
                <TouchableOpacity onPress={() => this.showNotification('hy', 'pesan')}>
                    <Text>klik</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
