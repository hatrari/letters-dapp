import React, { useContext } from 'react';
import Context from '../store/Context';

export function Info() {
  const {state} = useContext(Context);

  return (
    <>
      <h1>
        {state.name} ({state.symbol})
      </h1>
      <p>
        Welcome <b>{state.selectedAddress}</b>, you have{" "}
        <b>
          {state.balance} {state.symbol}
        </b>
        .
      </p>
    </>
  )
}
