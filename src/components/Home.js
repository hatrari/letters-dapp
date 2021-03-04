import React, { useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import Context from '../store/Context';
import * as actions from '../store/Actions';
import { Loading } from './Loading';
import { Mint } from './Mint';
import { Transfer } from './Transfer';
import { Info } from './Info';
import { WaitingForTransactionMessage } from './WaitingForTransactionMessage';
import { TransactionErrorMessage } from './TransactionErrorMessage';

import TokenArtifact from '../contracts/Token.json';
import contractAddress from '../contracts/contract-address.json';

export function Home() {
  const {state, dispatch} = useContext(Context);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    dispatch(actions.setLoading(true));
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddress.Token,
      TokenArtifact.abi,
      provider.getSigner(0)
    );
    dispatch(actions.setContract(contract));
    const name = await contract.name();
    const symbol = await contract.symbol();
    const balance = await contract.balanceOf(state.selectedAddress);
    dispatch(actions.setName(name));
    dispatch(actions.setSymbol(symbol));
    dispatch(actions.setBalance(balance.toString()));
    dispatch(actions.setLoading(false));
  };

  if(!state.contract || !state.name || !state.symbol) {
    return (
      <Loading />
    )
  } else {
    return (
      <>
        {state.txError && (
          <TransactionErrorMessage message={state.txError} />
        )}
        {state.txBeingSent && (
          <WaitingForTransactionMessage txHash={state.txBeingSent} />
        )}
        <Info />
        <hr />
        <Transfer />
        <hr />
        <Mint />
      </>
    )
  }
}
