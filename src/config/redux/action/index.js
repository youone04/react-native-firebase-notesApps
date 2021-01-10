import FIREBASE from '../../FIREBASE'
export const getDataNotes = () => {
    return (dispatch, getState) => {
    dispatch({ type: 'LOAD_QUOTE_START',value: true })
    FIREBASE.database()
        .ref('kontak')
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