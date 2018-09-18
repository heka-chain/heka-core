export default class Transaction {
  from: string;
  to: string;
  value: string;
  constructor(from: string, to: string, value: string) {
    this.from = from;
    this.to = to;
    this.value= value;
  }
}