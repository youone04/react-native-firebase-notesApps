
let initialState = {
    quote: {},
    updateQuote: {},
    isLoading: false,
    error: null,
    isLoadSend: null,
    isLoadUpdate: true,
    cekHapusData: false,
    loadUpadte: null,
    loadlogin: false,
    singleView: {}
}

export default quotes = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_QUOTE_START':
            return {
                ...state,
                isLoading: action.value
            }
        case 'LOAD_QUOTE_SUCCESS':
            return {
                ...state,
                quote: action.value,
            }
        case 'LOAD_QUOTE_FAILURE':
            return {
                ...state,
                error: action.value,
            }
        case 'LOAD_NOTES_SEND':
            return{
                ...state,
                isLoadSend: action.value,
            }
        case 'CEK_HAPUS_DATA':
            return{
                ...state,
                cekHapusData: action.value,
            }
        case 'LOAD_UPDATE_SUCCESS':
                return{
                    ...state,
                    updateQuote: action.value,
                }
        case 'LOAD_NOTES_SEND_UPDATE':
            return{
                ...state,
                isLoadUpdate: action.value
            }
        case 'LOAD_NOTES_UPDATE':
            return{
                ...state,
                loadUpadte: action.value
            }
        case 'LOAD_LOGIN':
            return{
                ...state,
                loadlogin: action.value
            }
        case 'LOAD_SINGGLE_VIEW_SUCCESS':
            return{
                ...state,
                singleView: action.value
            }
        default:
            return state
    }
}