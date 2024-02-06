import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";


const privatekey = secp256k1.utils.randomPrivateKey()

console.log("privateKey", toHex(privatekey))

const publicKey = secp256k1.getPublicKey(privatekey)

console.log("publicKey", toHex(publicKey))