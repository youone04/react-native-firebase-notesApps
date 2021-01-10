import FIREBASE from '../../FIREBASE'

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

// kiim tanggal
export const sendDataNotes = (data) => {
    return(dispatch ,getState) => {
        if(data.judul && data.isi && data.tanggal){
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
            })
            .catch((error) => {
                console.log(error);
            })
           }else{
               alert('Error', 'form harus terisi!');
           }

    }
}
