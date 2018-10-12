import Block from '../src/block';
import Chain from '../src/chain';

const timestamp = 1234567890123;
const preHash = 'c5d44424ef47ab9e1806d9c1a3045942cfd06e0ec5e798449c02e44e9ae38292';
const data = {key: 'block', value: 'chain'};
const test = new Block(timestamp, data, preHash);
console.log('block hash -- ', test.getHash());

const chain = new Chain(4, '100'); // set difficulty 4
let start = process.hrtime();
chain.addBlock('0x12');
let diff = process.hrtime(start);
let ms = diff[0] * 1e3 + diff[1] * 1e-6;
console.log('mining time %s ms', ms);
console.log('block chin -- ', JSON.stringify(chain.getChain()));
console.log('chain valid -- ', JSON.stringify(chain.validChain()));