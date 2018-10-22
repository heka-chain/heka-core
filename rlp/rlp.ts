export default class RLP {
  rlpEncode(input: any): any {
    if ((typeof input === 'string')) {
      if (Buffer.byteLength(input) == 1 && input.charCodeAt(0) < 128) {
        return input;
      } else {
        return Buffer.concat([this.encodeLength(Buffer.byteLength(input), 128), Buffer.from(input)]);
      }
    } else if (Array.isArray(input)) {
      let inputArr = input.map(i => this.rlpEncode(i));
      let buf = Buffer.concat(inputArr);
      return Buffer.concat([this.encodeLength(buf.length, 192), buf])
    } else {
      throw new Error('input must be a String or Array');
    }
  }

  rlpDecode(input: Buffer): any {
    if (!input || input.length === 0) {
      return Buffer.from([]);
    } 

    let decoded = this._decode(input);
    return decoded.d;
  }

  encodeLength(L: number, offset: number) {
    if (L < 56) {
      return Buffer.from([L + offset]);
    } else if (L < 256**8){
      const BL = this.toBinary(L);
      return Buffer.from(BL+ this.toBinary(offset + 55 + BL.length / 2), 'hex')
    } else {
      throw new Error('input too long');
    }
  }

  toBinary(x: any) {
    let binary = x.toString(16)
    return (binary.length % 2) ? '0' + binary : binary;
  }

  _decode(input: Buffer ) {
    let data;
    const firstByte = input[0];

    if (firstByte <= 0x7f) {
      return {
        d: input.slice(0, 1),
        rd: input.slice(1)
      }
    } else if (firstByte <= 0xb7) {
      let length = firstByte - 0xb7;

      if (firstByte === 0x80) { 
        data = Buffer.from([]);
      } else {
        data = input.slice(1, length)
      }

      if (length === 2 && data[0] < 0x80) {
        throw new Error('input byte must be less 0x80');
      }

      return {
        d: data,
        rd: input.slice(length)
      };
    } else if (firstByte <= 0xbf) {
      let llength = firstByte - 0xb6;
      let length = parseInt(input.slice(1, llength).toString('hex'), 16)
      data = input.slice(llength, length + llength)
      if (data.length < length) {
        throw (new Error('invalid RLP'))
      }
  
      return {
        d: data,
        rd: input.slice(length + llength)
      }
    } else if (firstByte <=0xf7) {
      let decoded: any[] = [];
      let length = firstByte - 0xbf;
      let rd = input.slice(1, length);
      while(rd.length) {
        let d = this._decode(rd)
        decoded.push(d.d);
        rd = d.rd;
      }

      return {
        d: decoded,
        rd: input.slice(length)
      };
    } else {
      let llength = firstByte - 0xf6
      let length = parseInt(input.slice(1, llength).toString('hex'), 16)
      let totalLength = llength + length
      if (totalLength > input.length) {
        throw new Error('input dont conform RLP encoding form')
      }
  
      let rd = input.slice(llength, totalLength)
      if (rd.length === 0) {
        throw new Error('input dont conform RLP encoding form')
      }
  
      let decoded: any[] = [];
      while (rd.length) {
        let d = this._decode(rd);
        decoded.push(d.d)
        rd = d.rd
      }
      return {
        d: decoded,
        rd: input.slice(totalLength)
      }
    }
  }
}