import React, { useContext } from 'react';
import Context from '../store/Context';
import * as actions from '../store/Actions';

export function Mint() {
  const {state, dispatch} = useContext(Context);

  const mint = async (to) => {
    try {
      dispatch(actions.setTxError(undefined));
      const tx = await state.contract.mint(to);
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
      <h4>Mint</h4>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const formData = new FormData(event.target);
          const to = formData.get("to");

          if (to) {
            mint(to);
          }
        }}
      >
        <div className="form-group">
          <label>Recipient address</label>
          <input className="form-control" type="text" name="to" required />
        </div>
        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Mint" />
        </div>
      </form>
    </div>
  )
}
