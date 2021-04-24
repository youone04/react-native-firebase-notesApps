import React, {Component} from 'react';
import { 

    Text, 
    View ,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView
    
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faTrash , faEdit} from '@fortawesome/free-solid-svg-icons'
import * as quoteActions from '../../config/redux/action';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width ,  height} = Dimensions.get('screen');

class SinggleCatatan extends Component {
    constructor(props){
        super(props);
        this.state = {
            judul: '',
            isi: '',
            tanggal: ''
        }
    }
    componentDidMount(){
        // console.log(this.props.route.params.key)
        this.getDataFirebase()
    }
    getDataFirebase = async () => {
        const userData = await AsyncStorage.getItem('userData');
        const user = JSON.parse(userData);
        const data = {
            id: this.props.route.params.key,
            userId: user.uid
        }
       await this.props.getDataSinggleView(data)
       const {singleView} = this.props;
       this.setState({
        judul: singleView.judul,
        isi: singleView.isi,
        tanggal: singleView.tanggal
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
            this.props.navigation.replace('halamanutama')
           }   
    }
    render(){
        const { judul , isi ,tanggal }= this.state;
        return(
            <ScrollView style={styles.cardCatatan} >
              <View style={styles.cardTextCatatan}>
                <Text style={styles.textCatatanJudul} >{judul}</Text>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        marginVertical: 5
                    }}
                    />
                <View style={{flexDirection:'row-reverse',marginTop:20}}>
                <TouchableOpacity onPress={() => this.deleteNotes(this.props.route.params.key)}>
                <View style={{
                            marginBottom: 20,
                            flexDirection: 'row',
                            flex: 1,
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                            }}>
                    
                <Text style={{ color:'white',marginRight: 5}}> <FontAwesomeIcon icon={ faTrash } color={ 'red' }  size={ 20 }/></Text>
                
                </View>
                </TouchableOpacity>
        
                <TouchableOpacity onPress={() => this.props.navigation.navigate('updateData',{key:this.props.route.params.key})}>
                <View style={{
                            marginBottom: 20,
                            flexDirection: 'row',
                            flex: 1,
                            justifyContent: 'flex-end',
                            alignItems: 'center'}}>
                    
                    <Text style={{ color:'white',marginRight: 5, marginBottom: 0}}><FontAwesomeIcon icon={ faEdit } color={ 'green' } size={ 23 }/></Text>
                </View>
                </TouchableOpacity>
                </View>

                <Text style={styles.texCatatan} >{isi}</Text>
                <Text style={styles.texCatatanTgl} >{tanggal.substring(0, 21)}</Text>                
             </View>
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return {
        singleView: state.singleView,
        cekHapusData: state.cekHapusData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDataSinggleView: (id) => dispatch(quoteActions.getDataSinggleView(id)),
        deleteDataNotes: (id) => dispatch(quoteActions.deleteDataNotes(id)),
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(SinggleCatatan);

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
        fontWeight: 'bold'
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
        height: '100%'
    },
    cardTextCatatan: {
        marginLeft: 5,
        paddingBottom: 'auto'
    },
    textCatatanJudul: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center'
    },
    texCatatan: {
        color: 'black',
        marginBottom: 5,
        fontSize:17,
        paddingHorizontal: 10
    },
    texCatatanTgl: {
        color: 'black',
        marginBottom: 5,
        fontSize:13,
        paddingHorizontal: 10
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
