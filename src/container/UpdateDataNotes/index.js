import React, { Component } from 'react';
import { StyleSheet, Text, View , TextInput,TouchableOpacity } from 'react-native'
import * as quoteActions from '../../config/redux/action';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


class UpdateDataNotes extends Component {
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
        this.getDataFirebase();
    }
    getDataFirebase = async () => {
        const userData = await AsyncStorage.getItem('userData');
        const user = JSON.parse(userData);
        const data = {
            id: this.props.route.params.key,
            userId: user.uid
        }
       await this.props.getDataUpdate(data)
       const {updateQuote} = this.props;
       this.setState({
          judul: updateQuote.judul,
          isi: updateQuote.isi,
          tanggal: updateQuote.tanggal
       })
    }
    onChangeText = (judul,value) => {
       this.setState({
           [judul] : value
       })
    }
    onSubmit = async () => {
        // console.log(this.props.route.params.key)
        const {judul ,isi , tanggal} = this.state;
        const userData = await AsyncStorage.getItem('userData');
        const user = JSON.parse(userData);
        const data = {
            judul : judul,
            isi: isi,
            tanggal : tanggal,
            id: this.props.route.params.key,
            userId: user.uid
        }
        if(judul && isi){
            await this.props.aksiUpdateData(data)
            if(!this.props.isLoadUpdate){
                this.props.navigation.replace('halamanutama')
            }
            return;
        }
        alert('Data Harus Terisi');
    }
    render() {
        return (
            <View style={styles.containerUpdate}>
                <Text tyle={styles.label}>Judul :  </Text>
                <TextInput placeholder="Masukan Judul Notes" style={styles.textInput} value={this.state.judul} onChangeText={(text) => this.onChangeText('judul',text)}/>
                <Text tyle={styles.label}>Isi Notes :  </Text>
                <TextInput placeholder="Masukan Isi Notes" 
                multiline={true}
                numberOfLines={4}
                style={styles.textARea} 
                value={this.state.isi} 
                onChangeText={(text) => this.onChangeText('isi',text)}/>
                 {
                     this.props.loadUpadte ?
                     <TouchableOpacity style={styles.tombol}>
                        <View>
                        <Text  style={styles.textTombol}>LOADING ...</Text>
                        </View>
                    </TouchableOpacity>:
                    <TouchableOpacity style={styles.tombol} onPress={() => this.onSubmit()}>
                        <View>
                        <Text  style={styles.textTombol}>UPDATE</Text>
                        </View>
                    </TouchableOpacity>
                 }
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        updateQuote: state.updateQuote,
        isLoadUpdate: state.isLoadUpdate,
        loadUpadte: state.loadUpadte
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDataUpdate: (id) => dispatch(quoteActions.getDataUpdate(id)),
        aksiUpdateData: (data) => dispatch(quoteActions.aksiUpdateData(data))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(UpdateDataNotes);
const styles = StyleSheet.create({
    containerUpdate: {
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
})
