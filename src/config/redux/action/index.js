import FIREBASE from '../../FIREBASE'
import {Alert} from 'react-native'

// ambil tanggal
export const getDataNotes = () => {
    return (dispatch, getState) => {
    dispatch({ type: 'LOAD_QUOTE_START',value: true })
    FIREBASE.database()
        .ref('notes')
        .once('value',(querySnapShot) => {
            let data = querySnapShot.val() ? querySnapShot.val()  : {};
            let kontakItem = {...data};
            dispatch({ type: 'LOAD_QUOTE_SUCCESS', value: kontakItem })
            dispatch({ type: 'LOAD_QUOTE_START',value: false })
        },(error)=> {
            dispatch({ type: 'LOAD_QUOTE_FAILURE', value: error })
        })
}

}
// kirim data
export const sendDataNotes =(data) => (dispatch) => {
   return new Promise((berhasil, gagal)=> {
    if(data.judul && data.isi && data.tanggal){
        dispatch({type:'LOAD_NOTES_SEND', value: true})
        const kontakReferensi = FIREBASE.database().ref('notes');
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
           alert('Error', 'form harus terisi!');
        //    dispatch({type:'LOAD_NOTES_SEND', value: 'jhd'})
        gagal('gagal')
       }
   }) 
}

//delete data
export const deleteDataNotes = (id) => (dispatch) => {
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
                  FIREBASE.database()
                  .ref('notes/'+id)
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
export const getDataUpdate = (id) => (dispatch) => {
    return new Promise((berhasil , gagal) => {
        FIREBASE.database()
        .ref('notes/'+id)
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

            const kontakReferensi = FIREBASE.database().ref('notes/'+data.id)
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
                dispatch({type:'LOAD_NOTES_SEND_UPDATE', value: false})
            })
            .catch((error) => {
                console.log(error);
            })
           }else{
               Alert.alert('Error', 'form harus terisi!');
           }
    })
}
