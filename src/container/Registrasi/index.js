import React, { Component } from 'react'
import { Text, View , TextInput , StyleSheet , TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import * as quoteActions from '../../config/redux/action'
import Logo from '../../components/Logo'

export class Registrasi extends Component {
    constructor(props){
        super(props);
        this.state = {
          email: '',
          password: ''
        }
    }
    
    onSubmit = async() => {
        const {email , password} = this.state;
        const data = {
            email: email,
            password: password
        }
       if(email && password){
           const res = await this.props.Registrasi(data)
           if(res){
               alert('Registrasi Berhasil')
               this.setState({
                    email: '',
                    password: ''
               })
           }else{
               alert(res)
           }
       }else{
           alert('Data Harus Terisi')
       }
    }
    render() {
        const {loadlogin} = this.props;
        return (
            <View style={styles.contLogin}>
                <Logo/>
                <TextInput placeholder="Email" value={this.state.email} style={styles.TextInput} onChangeText={(text) => this.setState({
                    ['email'] : text
                })} />
                <TextInput secureTextEntry={true} value={this.state.password} placeholder="Password" style={styles.TextInput} onChangeText={(text) => this.setState({
                    ['password'] : text
                })} />

                {
                    loadlogin?
                    <View >
                        <TouchableOpacity style={styles.contTombolLoginDisabled} disabled={true}>
                        <Text style={styles.textTombol}>LOADING ...</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View >
                        <TouchableOpacity style={styles.contTombolLogin} onPress={this.onSubmit}>
                            <Text style={styles.textTombol}>REGISTRASI</Text>
                        </TouchableOpacity>
                    </View>
                }
               <View>
                   <View>
                        <Text style={styles.textReg}>Sudah Punya Akun?</Text>
                   </View>
                   <TouchableOpacity onPress={() => this.props.navigation.navigate('halamanLogin')}>
                        <Text style={styles.textDaftar}>login</Text>
                   </TouchableOpacity>
               </View>
            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        loadlogin: state.loadlogin,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        Registrasi: (data) => dispatch(quoteActions.Registrasi(data))
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(Registrasi)
const styles = StyleSheet.create({
    TextInput: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    },
    contLogin: {
        marginHorizontal: 10,
        flex: 1,
        justifyContent: 'center',
    },
    contTombolLogin :{
        backgroundColor: '#2596be',
        borderRadius: 5,
        padding: 10,
        marginTop: 10
    },
    contTombolLoginDisabled:{
        backgroundColor: '#3C3A3A',
        borderRadius: 5,
        padding: 10,
        marginTop: 10
    },
    textTombol: {
        color: 'white',
        textAlign: 'center'
    },
    textReg: {
        textAlign: 'center'
    },
    textDaftar: {
        textAlign: 'center',
        color: '#2596be'
    }
})
