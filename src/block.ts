import * as crypto from 'crypto';

export default class Block {
  index: number;
  timestamp: number;
  preHash: string;
  hash: string;
  data: any;
  nonce: number;
  constructor(index: number, timestamp: number, data: any, preHash: string) {
    this.index = index;
    this.timestamp = timestamp;
    this.preHash = preHash;
    this.hash = this._setHash();
    this.data = data;
    this.nonce = 0;
  }

  _setHash() {
    return crypto.createHash('sha256').update(this.index + this.timestamp + this.preHash + JSON.stringify(this.data) + this.nonce).digest('hex');
  }

  mineBlock(difficulty: number) {
    while (!this.hash.startsWith(String('0').repeat(difficulty))) {
      this.nonce++;
      this.hash = this._setHash();
      console.log("mining: " + this.hash);
    }
  }

  getHash() {
    return this.hash;
  }
}