import * as crypto from 'crypto';

export default class Block {
  index: number;
  timestamp: number;
  preHash: string;
  hash: string;
  data: any;
  constructor(index: number, timestamp: number, data: any, preHash: string) {
    this.index = index;
    this.timestamp = timestamp;
    this.preHash = preHash;
    this.hash = this._setHash();
    this.data = data;
  }

  _setHash() {
    return crypto.createHash('sha256').update(this.index + this.timestamp + this.preHash + JSON.stringify(this.data)).digest('hex');
  }

  getHash() {
    return this.hash;
  }
}