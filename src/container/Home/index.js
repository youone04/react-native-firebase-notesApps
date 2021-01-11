import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator,
    TouchableOpacity


} from "react-native";
import * as quoteActions from '../../config/redux/action'
import { connect } from 'react-redux'

class Home extends Component {
    componentDidMount(){
       this.getDataNotesFirebase()
    }
    getDataNotesFirebase = () => {
        this.props.getDataNotes()
    }
    deleteNotes = async (id) => {
        await this.props.deleteDataNotes(id)
        if(this.props.cekHapusData){
            this.getDataNotesFirebase()
           }    
    }
    render() {
        return (
            <View style={styles.container}>
                {this.props.isLoading ?
                    <ActivityIndicator />
                    :
                    <View style={styles.blockNotes}>
                        <View>
                            <Text style={styles.judulCatatan}>Catatan</Text>
                        </View>
                        {
                           Object.keys(this.props.quote).map((key) => {
                                return(
                                <View style={styles.cardCatatan} key={key}>
                                  <View style={styles.cardTextCatatan}>
                                    <Text style={styles.textCatatanJudul} >{this.props.quote[key].judul}</Text>
                                    <Text style={styles.texCatatan} >{this.props.quote[key].isi}</Text>
                                    <Text style={styles.texCatatan} >{this.props.quote[key].tanggal}</Text>
                                    <TouchableOpacity onPress={() => this.deleteNotes(key)}>
                                    <View style={{
                                                marginBottom: 20,
                                                flexDirection: 'row',
                                                flex: 1,
                                                justifyContent: 'flex-end',
                                                alignItems: 'center'}}>
                                        
                                        <Text style={{ color:'white',marginRight: 5}}>hapus</Text>
                                    </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('updateData',{key:key})}>
                                    <View style={{
                                                marginBottom: 20,
                                                flexDirection: 'row',
                                                flex: 1,
                                                justifyContent: 'flex-end',
                                                alignItems: 'center'}}>
                                        
                                        <Text style={{ color:'white',marginRight: 5}}>update</Text>
                                    </View>
                                    </TouchableOpacity>
                                 </View>
                                </View>
                                )
                            })
                        }
                    <View>
                     <TouchableOpacity onPress={() => this.props.navigation.navigate('tambahData')}>
                        <Text>TAMBAH</Text>
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
        marginTop: 10,
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
        backgroundColor: 'black',
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    cardTextCatatan: {
        marginLeft: 5,
        paddingBottom: 'auto'
    },
    textCatatanJudul: {
        fontSize: 20,
        color: 'white'
    },
    texCatatan: {
        color: 'white',
        marginBottom: 5
    }
});