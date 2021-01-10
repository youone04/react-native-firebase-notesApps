import React, { Component } from 'react'
import { StyleSheet, Text, View , TextInput,TouchableOpacity } from 'react-native'
import * as quoteActions from '../../config/redux/action'
import { connect } from 'react-redux'
class TambahData extends Component {
    constructor(props){
        super(props);
        this.state = {
            judul: '',
            isi: '',
            tanggal: ''
        }
    }
    onChangeText = (judul,value) => {
       this.setState({
           [judul] : value
       })
    }
    onSubmit = () => {
        const {judul ,isi , tanggal} = this.state;
        const data = {
            judul : judul,
            isi: isi,
            tanggal : tanggal
        }
        this.props.sendDataNotes(data)
    }
    render() {
        return (
            <View>
                <Text tyle={styles.label}>Judul :  </Text>
                <TextInput placeholder="Masukan Judul Notes" style={styles.textInput} value={this.props.judul} onChangeText={(text) => this.onChangeText('judul',text)}/>
                <Text tyle={styles.label}>Isi Notes :  </Text>
                <TextInput placeholder="Masukan Isi Notes" style={styles.textInput} onChangeText={(text) => this.onChangeText('isi',text)}/>
                <Text tyle={styles.label}>Tanggal:  </Text>
                <TextInput placeholder="Masukan Tangal Notes" style={styles.textInput} onChangeText={(text) => this.onChangeText('tanggal',text)}/>
                
                 <TouchableOpacity style={styles.tombol} onPress={() => this.onSubmit()}>
                    <Text style={styles.textTombol}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        quote: state.quote,
        isLoading: state.isLoading,
        error: state.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendDataNotes: (data) => dispatch(quoteActions.sendDataNotes(data))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(TambahData);
const styles = StyleSheet.create({
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
        backgroundColor: 'black',
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
