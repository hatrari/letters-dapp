import React from "react";

export function TransactionErrorMessage({ message }) {
  return (
    <div className="alert alert-danger" role="alert">
      Error sending transaction: {message.substring(0, 100)}
    </div>
  )
}
