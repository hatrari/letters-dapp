const Reducer = (state, action) => {
  switch(action.type) {
    case 'NETWORK_ID_CHANGED':
      return {...state, networkId: action.payload};
    case 'ADDRESS_CHANGED':
      return {...state, selectedAddress: action.payload};
    case 'CONTRACT_CHANGED':
      return {...state, contract: action.payload};
    case 'LOADING_CHANGED':
      return {...state, loading: action.payload};
    case 'NAME_CHANGED':
      return {...state, name: action.payload};
    case 'SYMBOL_CHANGED':
      return {...state, symbol: action.payload};
    case 'BALANCE_CHANGED':
      return {...state, balance: action.payload};
    case 'TX_CHANGED':
      return {...state, txBeingSent: action.payload};
    case 'ERROR_CHANGED':
      return {...state, txError: action.payload};
    default:
      return state;
  }
}

export default Reducer;