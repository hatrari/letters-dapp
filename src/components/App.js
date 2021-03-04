import React, { useReducer } from 'react';
import { NoWalletDetected } from './NoWalletDetected';
import { Dapp } from './Dapp';

import Reducer from '../store/Reducer';
import InitialState from '../store/InitialState';
import Context from '../store/Context';

function App() {
  const [state, dispatch] = useReducer(Reducer, InitialState);

  if (window.ethereum === undefined) {
    return <NoWalletDetected />;
  }
  
  return (
    <Context.Provider value={{state, dispatch}}>
      <Dapp />
    </Context.Provider>
  )
}

export default App;