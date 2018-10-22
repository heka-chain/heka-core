import RLP from '../../rlp/rlp';
const rlp = new RLP;
const testData = new Map<any>([
  ['dog', [ 0x83, 'd', 'o', 'g' ]],
  [['cat', 'dog'], [ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]],
  ['', [ 0x80 ]],
  [[], [ 0xc0 ]],
  ['\x0f', [ 0x0f ]],
  ['\x04\x00', [ 0x82, 0x04, 0x00 ]],
  [[ [], [[]], [ [], [[]] ] ], [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]]
]);

describe("Test RLP", () => {

  testData.forEach((key, value) => {
    it(`${key} => ${value}`, () => {
      const data = rlp.rlpEncode(key);
      expect(data).toBe(value);
    });
  });
});