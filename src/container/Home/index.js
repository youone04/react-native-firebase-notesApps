import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Alert,
    TextInput,
    ToastAndroid
} from "react-native";
import * as quoteActions from '../../config/redux/action'
import { connect } from 'react-redux'
import Loader from "../../components/Loader";
import FIREBASE from '../../config/FIREBASE';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../config/FIREBASE';
import CheckBox from 'react-native-check-box';


const {width ,  height} = Dimensions.get('screen');
class Home extends Component {
    constructor(){
        super();
        this.state = {
            notes1: [],
            searchData: '',
            cektInternet: '',
            selectTed: [],
        }
    }
    // urutan proses
    // componentWillUnmount 1
    // render 2
    // componentDidMount 3
     componentDidMount(){
        this.getDataRencana();
        const{selectTed} = this.state;
        Object.keys(this.state.notes1).map(keyMap => {
                this.setState({
                    selectTed: [...selectTed , false]
                })
        })
    }

 
    getDataRencana = async () => {
        const userData = await AsyncStorage.getItem('userData');
        const user = JSON.parse(userData)      
        let rencana = FIREBASE.database().ref('/notes/'+user.uid);
        rencana.once('value').then(snapshot => {
            this.setState({
                notes1 : snapshot.val(),
            })
        })
    }

    deleteNotes =  async(id) => {
        const userData = await AsyncStorage.getItem('userData');
        const user = JSON.parse(userData);
        const data ={
            id: id,
            userId: user.uid
        }

        await this.props.deleteDataNotes(data)
        if(this.props.cekHapusData){
            this.getDataRencana();
           }   
    }

    handleLogout = () => {
       Alert.alert(
        "Info",
        "Yakin Keluar?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: async() => {
            await AsyncStorage.removeItem('userData');
            this.props.navigation.navigate('halamanLogin');
          }}
        ],
        { cancelable: false }
      );

    }
    handleCheck = (key ,cekAksi) => {
        const{selectTed} = this.state;
        const newAKsi = selectTed;
        if(cekAksi){
            newAKsi[key] = false;
        }else{
            newAKsi[key] = true;
        }
        this.setState({
            selectTed: newAKsi
        })
      
        
    }

    deleteRencanaFirebase = async (id) => {
        const userData = await AsyncStorage.getItem('userData');
        const user = JSON.parse(userData);
        return new Promise((berhasil , gagal) => {
            firebase
            .database()
            .ref(`/notes/${user.uid}/${id}`)
            .remove()
            .then(() => {
                berhasil(true)
            })
        })
    }

  handleDelete = async () => {
    const{ notes1, selectTed } = this.state;
    var i=0;
    Object.keys(notes1).map(key => {
        // console.log('selectted =>',selectTed[key])
        if(selectTed[key]){
            // console.log(key);
            this.deleteRencanaFirebase(key);
            i++;
        }
    })
    await this.getDataRencana();
    // alert(i +' Data Terhapus!');
    ToastAndroid.showWithGravity(
        i+ ' Data Terhapus!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
        
      
    }


    render() {
        const{ selectTed } = this.state;
        // console.log(selectTed)
        return (
            <View style={styles.container}>
                {this.props.isLoading ?
                <Loader/>
                    :
                    <View style={styles.blockNotes}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.judulCatatan}>Catatan</Text>
                           <TouchableOpacity style={{flex:1,flexWrap:'wrap-reverse'}} >
                            <View style={{flexDirection:'row'}}>
                            <Text onPress={() => this.handleLogout()} style={{margin: 5}}>keluar</Text>
                            <Text onPress={() => this.handleDelete() } style={{margin: 5}}>Delete</Text>
                            </View>
                           </TouchableOpacity>
                        </View>
                        <TextInput placeholder="Masukan Judul Notes" style={styles.textInput} value={this.state.searchData} onChangeText={(text) => this.setState({
                            ['searchData'] : text
                        })}/>
                        {
                        this.state.notes1?
                        <ScrollView style={{height: height*0.55}}>
                        {
                           Object.keys(this.state.notes1).filter((key) =>
                                this.state.notes1[key].judul.toLowerCase().includes(this.state.searchData.toLowerCase()))
                            .map(dataKey => {
                                return(
                                    <TouchableOpacity style={{flex: 1}} onPress={() => this.props.navigation.navigate('detailcatatan' , {key:dataKey})} key={dataKey}>
                                    <View style={styles.cardCatatan} >
                                      <View style={styles.cardTextCatatan}>
                                        <Text style={styles.textCatatanJudul} >{this.state.notes1[dataKey].judul}</Text>
                                     </View>
                                    </View>
                                    <CheckBox
                                     style={{marginBottom: 10}}
                                     isChecked={selectTed[dataKey]}
                                     onClick={() => this.handleCheck(dataKey , selectTed[dataKey])}
                                    />
                                    </TouchableOpacity>
                                    
                                    )
                            })
                        }
                         </ScrollView>: <Text>Data Kosong</Text>
                        }
                    <View style={styles.contTombol}>
                     <TouchableOpacity style={styles.tombol} onPress={() => this.props.navigation.navigate('tambahData')}>
                        <Text style={styles.textTombol} >TAMBAH</Text>
                     </TouchableOpacity>
                   </View>
                    </View>
                }
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        quote: state.quote,
        isLoading: state.isLoading,
        error: state.error,
        cekHapusData: state.cekHapusData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDataNotes: () => dispatch(quoteActions.getDataNotes()),
        deleteDataNotes: (id) =>dispatch(quoteActions.deleteDataNotes(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: height*0.01,
        margin: 10
    },
    blockNotes: {
        flex: 1
    },
    judulCatatan: {
        marginLeft: 5,
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 5
    },
    cardCatatan: {
        borderRadius: 4,
        backgroundColor: 'white',
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        height: 60,
    },
    cardTextCatatan: {
        marginLeft: 5,
        paddingBottom: 'auto'
    },
    textCatatanJudul: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        marginTop:18
    },
    texCatatan: {
        color: 'black',
        marginBottom: 5,
        fontSize:17
    },
    texCatatanTgl: {
        color: 'black',
        marginBottom: 5,
        fontSize:13
    },
    tombol: {
        backgroundColor: '#2596be',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
    },
    textTombol:{
        color:'white',
        textAlign:'center'
    },
    contTombol: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 0,
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 7,
        marginBottom: 10,
        marginTop: 10


    },
});
