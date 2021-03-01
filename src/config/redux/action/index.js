import firebase from '../../FIREBASE'
import {Alert} from 'react-native'

// ambil tanggal
export const getDataNotes = () => (dispatch) => {
   return new Promise((berhasil , gagal)=> {
        dispatch({ type: 'LOAD_QUOTE_START',value: true })
        let rencana = firebase.database().ref('/notes');
        rencana.once('value').then(snapshot => {
            dispatch({ type: 'LOAD_QUOTE_SUCCESS', value: snapshot.val() })
            dispatch({ type: 'LOAD_QUOTE_START',value: false })
            berhasil(true)
        },(error)=> {
            dispatch({ type: 'LOAD_QUOTE_FAILURE', value: error })
            gagal(false)
        })
    })

}
// kirim data
export const sendDataNotes =(data) => (dispatch) => {
   return new Promise((berhasil, gagal)=> {
    if(data.judul && data.isi && data.tanggal){
        dispatch({type:'LOAD_NOTES_SEND', value: true})
        const kontakReferensi = firebase.database().ref('notes/'+data.id);
        const notes = {
            judul: data.judul,
            isi: data.isi,
            tanggal: data.tanggal,
        }
        kontakReferensi
        .push(notes)
        .then((data) => {
            alert('Sukses', 'Data Berhasil diinput');
            // this.props.navigation.replace('halamanutama')
            berhasil(true);
            dispatch({type:'LOAD_NOTES_SEND', value: false})
        })
        .catch((error) => {
            console.log(error);
            dispatch({type:'LOAD_NOTES_SEND', value: false})
        })
       }else{
           alert('form harus terisi!');
        //    dispatch({type:'LOAD_NOTES_SEND', value: 'jhd'})
        gagal('gagal')
       }
   }) 
}

//delete data
export const deleteDataNotes = (data) => (dispatch) => {
    return new Promise((berhasil ,gagal) => {
        Alert.alert(
            "Info",
            "Yakin Hapus Kontak?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {
                  firebase.database()
                  .ref(`notes/${data.userId}/${data.id}`)
                  .remove()
                  .then(() => {
                    berhasil(true)
                    dispatch({type: 'CEK_HAPUS_DATA' , value: true})
                    Alert.alert('hapus','Hapus Sukses');
                  })
                
              }}
            ],
            { cancelable: false }
          );
    })
}

//ambil data update
export const getDataUpdate = (data) => (dispatch) => {
    return new Promise((berhasil , gagal) => {
        firebase.database()
        .ref(`notes/${data.userId}/${data.id}`)
        .once('value',(querySnapShot) => {
            let data = querySnapShot.val() ? querySnapShot.val()  : {};
            let kontakItem = {...data};
            berhasil(true);
            dispatch({ type: 'LOAD_UPDATE_SUCCESS', value: kontakItem })
        })
    })
}
//aksi update datanotes
export const aksiUpdateData = (data) => (dispatch) => {
    return new Promise((berhasil , gagal) => {
        if(data.judul && data.isi && data.tanggal){
            dispatch({type:'LOAD_NOTES_UPDATE', value: true})
            const kontakReferensi = firebase.database().ref(`notes/${data.userId}/${data.id}`)
            const notes = {
                judul: data.judul,
                isi: data.isi,
                tanggal: data.tanggal,
            }
            kontakReferensi
            .update(notes)
            .then((data) => {
                berhasil(true)
                Alert.alert('Sukses', 'Data di Update');
                dispatch({type:'LOAD_NOTES_UPDATE', value: false})
                dispatch({type:'LOAD_NOTES_SEND_UPDATE', value: false})
            })
            .catch((error) => {
                console.log(error);
                dispatch({type:'LOAD_NOTES_UPDATE', value: false})
            })
           }else{
               Alert.alert('Error', 'form harus terisi!');
           }
    })
}

//registrasi
export const Registrasi = (data) => (dispatch) => {
    return new Promise((berhasil,gagal) => {
        dispatch({ type: 'LOAD_LOGIN',value: true })
        firebase.auth().createUserWithEmailAndPassword(data.email , data.password)
        .then(res => {
            berhasil(true)
             dispatch({ type: 'LOAD_LOGIN',value: true })
        })
        .catch(err => {
            alert(err)
            gagal(err);
             dispatch({ type: 'LOAD_LOGIN',value: true })
        })
    })
}

//login
export const Login = (data) => (dispatch) => {
    return new Promise((berhasil, gagal) => {
        dispatch({ type: 'LOAD_LOGIN',value: true })
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then(res => {
                const dataUser = {
                    email : res.user.email,
                    uid : res.user.uid,
                    emailVerified : res.user.emailVerified,
                    refreshToken : res.user.refreshToken
                }
                berhasil(dataUser)
                dispatch({ type: 'LOAD_LOGIN',value: false })
            })
            .catch(function(error) {
               alert(error)
                gagal(false)
                dispatch({ type: 'LOAD_LOGIN',value: false })
            })
    })

}