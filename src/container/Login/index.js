import React, { Component } from 'react'
import { Text, View , TextInput , StyleSheet , TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import * as quoteActions from '../../config/redux/action'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../components/Logo';
export class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
          email: '',
          password: ''
        }
    }
    componentDidMount(){
       this.getLocalStrorage()

    }
    getLocalStrorage = async() => {
        try {
            const value = await AsyncStorage.getItem('userData')
            if(value !== null) {
                this.props.navigation.navigate('halamanutama');
            }
          } catch(e) {
            // error reading value
            console.log(e)
          }
    }

    onSubmit = async() => {
        const {email , password} = this.state;
        const data = {
            email: email,
            password: password
        }
       if(email && password){
            const res = await this.props.Login(data);
            if(res){
            try {
                const jsonValue = JSON.stringify(res)
                await AsyncStorage.setItem('userData', jsonValue)
              } catch (e) {
                console.log(e)
              }
           this.setState({
                email : '',
                password : ''
            })
            this.props.navigation.navigate('halamanutama')
            }else{
                alert('Gagal Login')
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
                <TextInput placeholder="Email" value={this.state.email} style={styles.TextInput} onChangeText={(email) => this.setState({
                    ['email'] : email
                })} />
                <TextInput secureTextEntry={true} value={this.state.password}  placeholder="Pasowrd" style={styles.TextInput} onChangeText={(password) => this.setState({
                    ['password'] : password
                }) } />

               {
                   loadlogin?
                   <View >
                        <TouchableOpacity style={styles.contTombolLoginDisabled} disabled={true}>
                           <Text style={styles.textTombol}> LOADING ...</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View >
                    <TouchableOpacity style={styles.contTombolLogin} onPress={this.onSubmit}>
                        <Text style={styles.textTombol}>LOGIN</Text>
                    </TouchableOpacity>
                    </View>
               }
                
               <View>
                   <View>
                        <Text style={styles.textReg}>Belum Punya Akun?</Text>
                   </View>
                   <TouchableOpacity onPress={() => this.props.navigation.navigate('registrasi')}>
                        <Text style={styles.textDaftar}>daftar</Text>
                   </TouchableOpacity>
               </View>
            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        loadlogin: state.loadlogin
    }
}

function mapDispatchToProps(dispatch) {
    return {
        Login: (data) => dispatch(quoteActions.Login(data))
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(Login)
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
    },
    
})
