import React, { useContext } from 'react';
import Context from '../store/Context';
import * as actions from '../store/Actions';
import { Home } from './Home';
import { NetworkErrorMessage } from './NetworkErrorMessage';

export function ConnectWalletButton() {
  const {state, dispatch} = useContext(Context);

  const connectWallet = async () => {
    const [selectedAddress] = await window.ethereum.enable();
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    dispatch(actions.setAddress(selectedAddress));
    dispatch(actions.setNetworkId(parseInt(chainId)));
    window.ethereum.on('accountsChanged', () => {
      window.location.reload();
    });
    window.ethereum.on('networkChanged', ([networkId]) => {
      dispatch(actions.setNetworkId(parseInt(networkId)));
    });
  }

  if (state.selectedAddress && state.networkId !== 4) {
    return (
      <div className="col-12 p-4">
        <NetworkErrorMessage />
      </div>
    )
  }

  if (state.selectedAddress) {
    return (
      <div className="col-12 p-4">
        <Home />
      </div>
    )
  }

  return (
    <div className="row justify-content-md-center">
      <div className="col-6 p-4 text-center">
        <p>Please connect to your wallet.</p>
        <button className="btn btn-warning" type="button" onClick={connectWallet}>
          Connect Wallet
        </button>
      </div>
    </div>
  )
}