import Block from './block';

export default class Chain {
  chain: any;
  constructor() {
    this.chain = [this._createBaseBlock()];
  }

  _createBaseBlock() {
    return new Block(0, Date.now(), 'hello heka', '');
  }

  getChain() {
    return this.chain;
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  getLastBlockHash() {
    return this.chain[this.chain.length - 1].hash;
  }

  addBlock(block) {
    block.preHash = this.getLastBlockHash();
    block.hash = block._setHash();
    this.chain.push(block);
  }

  validChain() {
    for (let i = 1; i < this.chain.length; i++) {
      if (this.chain[i].preHash !== this.chain[i-1].hash) return false;
      if (this.chain[i-1].hash !== this.chain[i-1]._setHash()) return false;
    }

    return true;
  }
}