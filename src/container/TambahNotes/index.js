import React, { Component } from 'react'
import { StyleSheet, Text, View , TextInput,TouchableOpacity, BackHandler } from 'react-native'
import * as quoteActions from '../../config/redux/action'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import CekInternet from '../../components/CekInternet';

class TambahData extends Component {
    constructor(props){
        super(props);
        this.state = {
            judul: '',
            isi: '',
            tanggal: new Date().toString()
        }
    }
 
    componentDidMount(){
        <CekInternet/>
    }
   
    onChangeText = (judul,value) => {
       this.setState({
           [judul] : value
       })
    }
    onSubmit = async () => {
        const {judul ,isi , tanggal} = this.state;
        const userData = await AsyncStorage.getItem('userData');
        const user = JSON.parse(userData)      
        const data = {
            judul : judul,
            isi: isi,
            tanggal : tanggal,
            id: user.uid
        }
        if(judul && isi){
            await this.props.sendDataNotes(data)
            if(!this.props.isLoadSend){
                this.props.navigation.replace('halamanutama')
            }
            return;
        }
       Snackbar.show({
            text: 'Form Harus Terisi Semua!',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor:'red',
            
          })
    
    }
    render() {
        return (
            <View style={styles.containerTambah}>
                <Text tyle={styles.label}>Judul :  </Text>
                <TextInput placeholder="Masukan Judul Notes" style={styles.textInput} value={this.props.judul} onChangeText={(text) => this.onChangeText('judul',text)}/>
                <Text tyle={styles.label}>Isi Notes :  </Text>
                <TextInput 
                 multiline={true}
                 numberOfLines={4}
                 placeholder="Masukan Isi Notes" 
                 style={styles.textARea} 
                 onChangeText={(text) => this.onChangeText('isi',text)}/>
              
                 {
                     this.props.isLoadSend ?
                     <TouchableOpacity style={styles.tombol}>
                        <View>
                        <Text  style={styles.textTombol}>LOADING ...</Text>
                        </View>
                    </TouchableOpacity>:
                    <TouchableOpacity style={styles.tombol} onPress={() => this.onSubmit()}>
                        <View>
                        <Text  style={styles.textTombol}>SUBMIT</Text>
                        </View>
                    </TouchableOpacity>
                     
                 }
                
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        quote: state.quote,
        isLoading: state.isLoading,
        error: state.error,
        isLoadSend: state.isLoadSend
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendDataNotes: (data) => dispatch(quoteActions.sendDataNotes(data))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(TambahData);
const styles = StyleSheet.create({
    containerTambah: {
        marginHorizontal: 8
    },
    label: {
        fontSize: 16,
        marginBottom: 5
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10

    },
    textARea:{
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        height: 150,
        textAlignVertical:'top'
    },
    textInputArea: {
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10

    },
    tombol: {
        backgroundColor: '#2596be',
        borderRadius: 5,
        padding: 10,
        marginTop: 10
    },
    textTombol: {
        color: 'white',
        fontWeight: 'bold',
        textAlign:'center',
        fontSize: 16
    }
})
