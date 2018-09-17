import Block from '../block';
import Chain from '../chain';

const index = 1;
const timestamp = 1234567890123;
const preHash = 'c5d44424ef47ab9e1806d9c1a3045942cfd06e0ec5e798449c02e44e9ae38292';
const data = {key: 'block', value: 'chain'};
const test = new Block(index, timestamp, data, preHash);
console.log('block hash -- ', test.getHash());


const chain = new Chain();
const newBlock = new Block(1, Date.now(), 'hello heka', '');
chain.addBlock(newBlock);
console.log('block chin -- ', chain.getChain())
console.log('chain valid -- ', chain.validChain())