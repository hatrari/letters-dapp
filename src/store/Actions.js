export const setNetworkId = payload => ({type: 'NETWORK_ID_CHANGED', payload})
export const setAddress = payload => ({type: 'ADDRESS_CHANGED', payload})
export const setContract = payload => ({type: 'CONTRACT_CHANGED', payload})
export const setLoading = payload => ({type: 'LOADING_CHANGED', payload})
export const setName = payload => ({type: 'NAME_CHANGED', payload})
export const setSymbol = payload => ({type: 'SYMBOL_CHANGED', payload})
export const setBalance = payload => ({type: 'BALANCE_CHANGED', payload})
export const setTxBeingSent = payload => ({type: 'TX_CHANGED', payload})
export const setTxError = payload => ({type: 'ERROR_CHANGED', payload})