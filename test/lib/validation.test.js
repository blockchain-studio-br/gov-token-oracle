import chai, {expect} from 'chai';
import CryptoJS from 'crypto-js';

import validation from '../../lib/validation';

describe('Validation certificate', async () => {
  
  it("expect to be a function", async () => {
     expect(validation).to.be.an('function');
  });

});