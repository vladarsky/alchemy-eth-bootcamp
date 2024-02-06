import express from "express"
import * as eth from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import cors from "cors"

const app = express();

const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "02188868827f7a66191a1608bb8ec67cdf753411d2e119c8fd0ae90efba3555b29": 100, //f9f43d3d58b60042063c80b4cecaabd1673882e6c91d1a836f3fe5392a61b6c0
  "03cd3e15d974332c55e2cc5222330f43dd0c8bf34e757adaa5a829a8e07e2ccf69": 50, //ebdae830ab8220efd9d1b2c05f8a6ab08b9ba31642979c02e906ff073b14bb43
  "02d9874b1f7dc2ec43ecfe189dd3deb446b5fc7dba75544ef73c8515a4f236423d": 75, //a01cf327b19b3f1fb9f1dd895a8386a738d26ae505b5b961a82256a0a049d7c7
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { sender, recipient, amount, signature, recovery } = req.body;

  console.log(sender, recipient)

  if(!signature) res.status(404).send({ message: "signature was not provided" });
  if(!recovery) res.status(400).send({ message: "recovery was not provided" });

  try {
    
    const bytes = utf8ToBytes(JSON.stringify({ sender, recipient, amount }));
    const hash = keccak256(bytes);


    const sig = eth.secp256k1.Signature.fromDER(signature).addRecoveryBit(recovery)

    const publicKey = await sig.recoverPublicKey(hash);

    if(publicKey.toHex() !== sender){
      res.status(400).send({ message: "signature is no valid" });
      return
    }


    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  } catch (error) {
    console.log(error.message)
  }
  
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
