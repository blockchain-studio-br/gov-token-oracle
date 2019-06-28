import chai, { expect } from 'chai';
import { factory } from 'factory-bot';
import { CNPJ } from 'cpf_cnpj';
import moment from 'moment';

import validation from '../../lib/validation';

describe('Validation certificate', async () => {
  
  it("expect to be a function", async () => {
    expect(validation).to.be.an('function');
  });

  it("expect to be false if identification document is not equal", async () => {
    const cert_data = await factory.attrs('cert_data');
    const user_input = { identification_document: CNPJ.generate() };

    expect(validation(cert_data, user_input)).to.be.false
  });

  it("expect to be true if identification document is equal", async () => {
    const cert_data = await factory.attrs('cert_data');
    const user_input = { identification_document: cert_data.identification_document };

    expect(validation(cert_data, user_input)).to.be.true
  });

  it("expect to be true if data not expired", async () => {
    const cert_data = await factory.attrs('cert_data');
    const user_input = { identification_document: cert_data.identification_document };

    expect(validation(cert_data, user_input)).to.be.true
  });

  it("expect to be false if data is expired", async () => {
    const cert_data = await factory.attrs('expired_cert_data');
    const user_input = { identification_document: cert_data.identification_document };

    expect(validation(cert_data, user_input)).to.be.false
  });

  it("expect to be true if data expires today", async () => {
    const cert_data = await factory.attrs('today_expired_cert_data');
    const user_input = { identification_document: cert_data.identification_document };

    expect(validation(cert_data, user_input)).to.be.true
  });

  it("expect to be true have a ca_list ", async () => {
    const cert_data = await factory.attrs('cert_data');
    const user_input = { identification_document: cert_data.identification_document };

    expect(validation(cert_data, user_input)).to.be.true
  });

  it("expect to be false with a undefined ca_list ", async () => {
    const cert_data = await factory.attrs('with_undefined_cas_list_cert_data');
    const user_input = { identification_document: cert_data.identification_document };

    expect(validation(cert_data, user_input)).to.be.false
  });

  it("expect to be false with a empty ca_list ", async () => {
    const cert_data = await factory.attrs('with_empty_cas_list_cert_data');
    const user_input = { identification_document: cert_data.identification_document };

    expect(validation(cert_data, user_input)).to.be.false
  });

  it("expect to be false with the first member is equal to certificate ca_list ", async () => {
    const cert_data = await factory.attrs('cert_data_with_certificate_in_cas_list');
    const user_input = { identification_document: cert_data.identification_document };

    expect(validation(cert_data, user_input)).to.be.false
  });

  it("expect to be true with a cas_list that signed a certificate ca_list ", async () => {
    const cert_data = await factory.attrs('cert_data');
    const user_input = { identification_document: cert_data.identification_document };

    expect(validation(cert_data, user_input)).to.be.true
  });

  it("expect to be true with a cas_list with two certificate in a ca_list ", async () => {
    const cert_data = await factory.attrs('cert_data_cas_list_with_two_certificates');
    const user_input = { identification_document: cert_data.identification_document };

    expect(validation(cert_data, user_input)).to.be.true
  });

  it("expect to be true with a cas_list with three certificate in a ca_list ", async () => {
    const cert_data = await factory.attrs('cert_data_cas_list_with_three_certificates');
    const user_input = { identification_document: cert_data.identification_document };

    expect(validation(cert_data, user_input)).to.be.true
  });

  it("expect to be true with a cas_list with lumini in a ca_list ", async () => {
    const cert_data = await factory.attrs('cert_data_cas_list_with_lumini');
    const user_input = { identification_document: cert_data.identification_document };

    expect(validation(cert_data, user_input)).to.be.true
  });

  it("expect to be false with a random cas_list that not signed a certificate ca_list ", async () => {
    const cert_data = await factory.attrs('with_random_cas_list_cert_data');
    const user_input = { identification_document: cert_data.identification_document };

    expect(validation(cert_data, user_input)).to.be.false
  });


  // it("expect to be false with a cas_list with lumini in a ca_list when tbscertificate is wrong ", async () => {
  //   const cert_data = await factory.attrs('cert_data_cas_list_with_lumini_tbscerftificate_changed');
  //   const user_input = { identification_document: cert_data.identification_document };

  //   expect(validation(cert_data, user_input)).to.be.false
  // });

});