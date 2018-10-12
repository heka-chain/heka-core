import Wallet from '../src/wallet';

const wallet = new Wallet();

wallet.generate();
console.log('pri:', wallet.getPrivateKey());
console.log('pub:', wallet.getPublicKey());
console.log('addr:', wallet.getAddress());
