import React, { useContext } from 'react';
import Context from '../store/Context';
import * as actions from '../store/Actions';

export function Transfer() {
  const {state, dispatch} = useContext(Context);

  const transferTokens = async (to, amount) => {
    try {
      dispatch(actions.setTxError(undefined));
      const tx = await state.contract.transferFrom(state.selectedAddress, to, amount);
      dispatch(actions.setTxBeingSent(tx.hash));
      const receipt = await tx.wait();
      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }
      const balance = await state.contract.balanceOf(state.selectedAddress);
      dispatch(actions.setBalance(balance.toString()));
    } catch (error) {
      if (error.code === 4001) {
        return;
      }
      dispatch(actions.setTxError(error.message));
    } finally {
      dispatch(actions.setTxBeingSent(undefined));
    }
  }

  return (
    <div>
      <h4>Transfer</h4>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const formData = new FormData(event.target);
          const to = formData.get("to");
          const amount = formData.get("amount");

          if (to && amount) {
            transferTokens(to, amount);
          }
        }}
      >
        <div className="form-group">
          <label>ID of {state.symbol}</label>
          <input
            className="form-control"
            type="text"
            name="amount"
            placeholder="0"
            required
          />
        </div>
        <div className="form-group">
          <label>Recipient address</label>
          <input className="form-control" type="text" name="to" required />
        </div>
        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Transfer" />
        </div>
      </form>
    </div>
  )
}
