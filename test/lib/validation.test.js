import chai, {expect} from 'chai';
import { factory } from 'factory-bot';
import CryptoJS from 'crypto-js';
import { CPF, CNPJ } from 'cpf_cnpj';
import moment from 'moment';


import validation from '../../lib/validation';

describe('Validation certificate', async () => {
  
  it("expect to be a function", async () => {
    expect(validation).to.be.an('function');
  });

  it("expect to be false if identification document is not equal", async () => {
    const cert_data = await factory.attrs('cert_data');
    const user_input = {
      identification_document: CNPJ.generate()
    };

    expect(validation(cert_data, user_input)).to.be.false
  });

  it("expect to be true if identification document is equal", async () => {
    const cert_data = await factory.attrs('cert_data');
    const user_input = { 
      identification_document: cert_data.identification_document
    };

    expect(validation(cert_data, user_input)).to.be.true
  });

  it("expect to be true if data not expired", async () => {
    const cert_data = await factory.attrs('cert_data');
    const user_input = { 
      identification_document: cert_data.identification_document
    };

    expect(validation(cert_data, user_input)).to.be.true
  });

  it("expect to be false if data is expired", async () => {
    const cert_data = await factory.attrs('expired_cert_data');
    const user_input = { 
      identification_document: cert_data.identification_document
    };

    expect(validation(cert_data, user_input)).to.be.false
  });

  it("expect to be true if data not expired", async () => {
    const cert_data = await factory.attrs('today_expired_cert_data');
    const user_input = { 
      identification_document: cert_data.identification_document
    };


    expect(validation(cert_data, user_input)).to.be.true
  });

});