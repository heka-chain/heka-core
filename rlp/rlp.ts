export default class RLP {
  rlpEncode(input) {
    const inputBuffer = Buffer.from(input);
    if ((typeof input === 'string' || input instanceof String)) {
      if (inputBuffer.length == 1 && input.charCodeAt(0) < 128) return input
      else return Buffer.concat([this.encodeLength(input.length, 128), input]);
    } else if (Array.isArray(input)) {
      let inputArr = input.map(i => this.rlpEncode(i));
      let buf = Buffer.concat(inputArr);
      return Buffer.concat([this.encodeLength(buf.length, 192), buf])
    } else {
      throw new Error('input must be a String or Array');
    }
  }

  encodeLength(L, offset) {
    if (L < 56) {
      return Buffer.from([L + offset]);
    } else if (L < 256**8){
      return Buffer.from(this.toBinary(L) + this.toBinary(offset + 55 + this.toBinary(L).length / 2), 'hex')
    } else {
      throw new Error('input too long');
    }
  }

  toBinary(x: any) {
    let binary = x.toString(16)
    return (binary.length % 2) ? '0' + binary : binary;
  }
}