import { formatCurrency } from "../scripts/utils/money.js";

//describe takes 1st param to name a test and 2nd param to know what it does
describe('test suite: formatCurrency',() => {
  it('converts cents into dollars',() => {
    expect(formatCurrency(2095)).toEqual('20.95');
  }); // creting a test

  it('works with 0',() => {
    expect(formatCurrency(0)).toEqual('0.00'); // expect gives us an object which has a 'toEqual()' method
  })

  it('rounds up to the nearest cent',() => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  })
});