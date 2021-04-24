import NetInfo from "@react-native-community/netinfo";
import React, { Component } from "react";
import Snackbar from 'react-native-snackbar';

class CekInternet extends Component{
    componentDidMount(){
        // console.log(this.props.route.params.key)
        NetInfo.addEventListener(state => {
            if(!state.isConnected){
              Snackbar.show({
                  text: 'Tidak Ada Koneksi Internet!',
                  duration: Snackbar.LENGTH_INDEFINITE,
                  backgroundColor:'red',
                  
                })
            }else{
              Snackbar.show({
                  text: 'Internet Terhubung!',
                  duration: Snackbar.LENGTH_SHORT,
                  backgroundColor:'green',
                  
                })
            }
        });
    }

    render(){
        return <> </>
    }
}

export default CekInternet;