const URL = import.meta.env.VITE_BASE_URL

export const userEndpoints = {
    SIGN_UP: URL + '/user/signup',
    SIGN_IN: URL + '/user/signin',
    EDITPROFILE: URL + '/user',
    ALL_USERS: URL + '/user/all'
}

export const accountEndpoints = {
    GET_BALANCE : URL+'/account/balance',
    TRANSFER_FUND : URL+'/account/transfer'
}