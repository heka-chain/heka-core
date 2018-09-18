import Block from './block';
import Transaction from './transaction';

export default class Chain {
  chain: any[];
  difficulty: number;
  reward: string;
  pendingTransactions: any[];
  constructor(difficulty: number, reward: string) {
    this.chain = [this._createBaseBlock()];
    this.difficulty = difficulty;
    this.reward = reward;

    this.pendingTransactions = [];
  }

  _createBaseBlock() {
    return new Block(Date.now(), 'hello heka', '');
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

  addBlock(to: string) {
    let block = new Block(Date.now(), this.pendingTransactions, '0');
    block.preHash = this.getLastBlockHash();
    block.mineBlock(this.difficulty);
    this.chain.push(block);

    let transaction = new Transaction('', to, this.reward);
    this.pendingTransactions = [transaction];
  }

  createTransaction(transaction: any) {
    this.pendingTransactions.push(transaction);
  }

  validChain() {
    for (let i = 1; i < this.chain.length; i++) {
      if (this.chain[i].preHash !== this.chain[i-1].hash) return false;
      if (this.chain[i-1].hash !== this.chain[i-1]._setHash()) return false;
    }

    return true;
  }
}