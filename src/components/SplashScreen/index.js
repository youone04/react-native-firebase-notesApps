import React,{Component, useEffect} from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import * as quoteActions from '../../config/redux/action'
import AsyncStorage from '@react-native-async-storage/async-storage';
class SplashcScreen extends Component {
    async componentDidMount(){
        this.props.getDataNotes()
                try {
                    if(!this.props.isLoading){
                     const value = await AsyncStorage.getItem('userData')
                     if(value !== null) {
                         this.props.navigation.replace('halamanutama');
                     }else{
                         this.props.navigation.replace('halamanLogin');
                     }
                    }
                   } catch(e) {
                     console.log(e)
                   }

    }

    render(){
        return (
            <View style={{flex:1,alignItems: 'center',justifyContent:'center'}}>
                <Text style={{fontSize: 25,fontWeight:'bold'}}>Catatan Apps</Text>
            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        isLoading: state.isLoading,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDataNotes: () => dispatch(quoteActions.getDataNotes()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (SplashcScreen);
