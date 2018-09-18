import * as crypto from 'crypto';
const elliptic = require('secp256k1/elliptic');
const keccak = require('keccak');

export default class Wallet {
  privateKey: any;
  publicKey: any;
  address: any;
  constructor() {
    this.privateKey = '';
    this.publicKey = '';
    this.address = '';
  }

  generate() {
    this.privateKey = crypto.randomBytes(32)
    this.publicKey = elliptic.publicKeyCreate(this.privateKey, false).slice(1)
    this.address = keccak("keccak256").update(this.publicKey).digest().slice(-20)
  }

  getPrivateKey() {
    return this.privateKey.toString('hex');
  }

  getPublicKey() {
    return this.publicKey.toString('hex');
  }

  getAddress() {
    return this.address.toString('hex');
  }
}