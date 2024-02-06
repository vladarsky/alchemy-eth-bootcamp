import { useState } from "react";

import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

import server from "./server";

function Transfer({ address, setBalance, privateKey}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const data = { sender: address, recipient, amount: parseInt(sendAmount)};
    const bytes = utf8ToBytes(JSON.stringify(data));
    const hash = keccak256(bytes);

    const signature = await secp256k1.sign(hash, privateKey);
    // const signatureHex = Buffer.from(signature).toString('hex');

    // console.log(Uint8Array.from(signature));

    // signatureHex
    const signatureHex = signature.toDERHex()
    console.log(signature)
    //
    // var sig = Array.from(signature[0])
    // console.log(signature, signature[1])

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {...data, signature: signatureHex, recovery: signature.recovery});

      setBalance(balance);
    } catch (ex) {
      alert(ex);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
