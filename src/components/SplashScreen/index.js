import React,{Component} from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as quoteActions from '../../config/redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import Snackbar from 'react-native-snackbar';
class SplashcScreen extends Component {
    componentDidMount(){
        // console.log('cek => ',this.props.isLoading)
       this.props.getDataNotes();
       this.hanldeSplash();

    //    NetInfo.addEventListener(state => {
    //     if(!state.isConnected){
    //       Snackbar.show({
    //           text: 'Tidak Ada Koneksi Internet!',
    //           duration: Snackbar.LENGTH_INDEFINITE,
    //           backgroundColor:'red',
              
    //         })
    //     }else{
    //       Snackbar.show({
    //           text: 'Internet Terhubung!',
    //           duration: Snackbar.LENGTH_SHORT,
    //           backgroundColor:'green',
              
    //         })
    //     }
    // });


    }
    
    hanldeSplash = async () => {
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
             console.log('error splash => ',e)
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
