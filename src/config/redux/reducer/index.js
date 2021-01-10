
let initialState = {
    quote: {},
    isLoading: false,
    error: null
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
        default:
            return state
    }
}