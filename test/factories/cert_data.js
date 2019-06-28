import { factory } from 'factory-bot';
import { CPF, CNPJ } from 'cpf_cnpj';
import moment from 'moment';
import generateRSAKeypair from 'generate-rsa-keypair';

import CryptoJS from 'crypto-js';
import forge    from 'node-forge';
import crypto   from 'crypto';

import { generateSelfSigned, generateForHost } from '../utils/generateCertificate';

factory.define('cert_data', {}, async (opts) => {
	
	const caCertificate = generateSelfSigned(
		[
			{ name: 'commonName', value: 'example.org' },
		 	{ name: 'countryName', value: 'US' },
			{ shortName: 'ST', value: 'Virginia' },
			{ name: 'localityName', value: 'Blacksburg' },
			{ name: 'organizationName', value: 'Test' },
			{ shortName: 'OU', value: 'Test' }
		], "1");

	const certificate = generateForHost(
		caCertificate.privateKey,
		[
			{ name: 'commonName', value: 'test' }, 
			{ name: 'organizationName', value: 'my-app' }
		],
		[
			{ name: 'commonName', value: 'example.org' },
		 	{ name: 'countryName', value: 'US' },
			{ shortName: 'ST', value: 'Virginia' },
			{ name: 'localityName', value: 'Blacksburg' },
			{ name: 'organizationName', value: 'Test' },
			{ shortName: 'OU', value: 'Test' }
		], "2")
	
	return {
		identification_document: CNPJ.generate(),
    	expiration_date: moment().subtract(2,'days').format("YYYY-MM-DD"), 
    	certificate: certificate.certificate,
    	cas_list: [
    		caCertificate.certificate
    	]
    	// signature: signature_hex,
    	// message,
    	// public_key: pair.public
	};
});

factory.define('expired_cert_data', {}, async (opts) => {
	
	const caCertificate = generateSelfSigned(
		[
		{ name: 'commonName', value: 'example.org' },
	 	{ name: 'countryName', value: 'US' },
		{ shortName: 'ST', value: 'Virginia' },
		{ name: 'localityName', value: 'Blacksburg' },
		{ name: 'organizationName', value: 'Test' },
		{ shortName: 'OU', value: 'Test' }
		], "1");

	const certificate = generateForHost(
		caCertificate.privateKey,
		[
			{ name: 'commonName', value: 'test' }, 
			{ name: 'organizationName', value: 'my-app' }
		],
		[
			{ name: 'commonName', value: 'my-app' },
			{ name: 'organizationName', value: 'my-app' }
		], "2")
	
	return {
		identification_document: CNPJ.generate(),
    	expiration_date: moment().add(2,'days').format("YYYY-MM-DD"), 
    	certificate: certificate.certificate,
    	cas_list: [ caCertificate.certificate ]
    	// signature: signature_hex,
    	// message,
    	// public_key: pair.public
	};
});

factory.define('today_expired_cert_data', {}, async (opts) => {
	
	const caCertificate = generateSelfSigned(
		[
			{ name: 'commonName', value: 'example.org' },
		 	{ name: 'countryName', value: 'US' },
			{ shortName: 'ST', value: 'Virginia' },
			{ name: 'localityName', value: 'Blacksburg' },
			{ name: 'organizationName', value: 'Test' },
			{ shortName: 'OU', value: 'Test' }
		], "1");

	const certificate = generateForHost(
		caCertificate.privateKey,
		[
			{ name: 'commonName', value: 'test' }, 
			{ name: 'organizationName', value: 'my-app' }
		],
		[
			{ name: 'commonName', value: 'example.org' },
		 	{ name: 'countryName', value: 'US' },
			{ shortName: 'ST', value: 'Virginia' },
			{ name: 'localityName', value: 'Blacksburg' },
			{ name: 'organizationName', value: 'Test' },
			{ shortName: 'OU', value: 'Test' }
		] ,"2")
	
	return {
		identification_document: CNPJ.generate(),
    	expiration_date: moment().format("YYYY-MM-DD"), 
    	certificate: certificate.certificate,
    	cas_list: [ caCertificate.certificate ]
    	// signature: signature_hex,
    	// message,
    	// public_key: pair.public
	};
});

factory.define('with_undefined_cas_list_cert_data', {}, async (opts) => {
	
	const caCertificate = generateSelfSigned(
		[
		{ name: 'commonName', value: 'example.org' },
	 	{ name: 'countryName', value: 'US' },
		{ shortName: 'ST', value: 'Virginia' },
		{ name: 'localityName', value: 'Blacksburg' },
		{ name: 'organizationName', value: 'Test' },
		{ shortName: 'OU', value: 'Test' }
		], "1");

	const certificate = generateForHost(
		caCertificate.privateKey,
		[
			{ name: 'commonName', value: 'test' }, 
			{ name: 'organizationName', value: 'my-app' }
		],
		[
			{ name: 'commonName', value: 'my-app' },
			{ name: 'organizationName', value: 'my-app' }
		]
		,"2")
	
	return {
		identification_document: CNPJ.generate(),
    	expiration_date: moment().subtract(2,'days').format("YYYY-MM-DD"), 
    	certificate: certificate.certificate,
    	cas_list: undefined
    	// signature: signature_hex,
    	// message,
    	// public_key: pair.public
	};
});

factory.define('with_empty_cas_list_cert_data', {}, async (opts) => {
	
	const certificate = generateSelfSigned(
		[
		{ name: 'commonName', value: 'example.org' },
	 	{ name: 'countryName', value: 'US' },
		{ shortName: 'ST', value: 'Virginia' },
		{ name: 'localityName', value: 'Blacksburg' },
		{ name: 'organizationName', value: 'Test' },
		{ shortName: 'OU', value: 'Test' }
		], "1");
	
	return {
		identification_document: CNPJ.generate(),
    	expiration_date: moment().subtract(2,'days').format("YYYY-MM-DD"), 
    	certificate: certificate.certificate,
    	cas_list: []
    	// signature: signature_hex,
    	// message,
    	// public_key: pair.public
	};
});

factory.define('cert_data_with_certificate_in_cas_list', {}, async (opts) => {
	
	const certificate = generateSelfSigned(
		[
		{ name: 'commonName', value: 'example.org' },
	 	{ name: 'countryName', value: 'US' },
		{ shortName: 'ST', value: 'Virginia' },
		{ name: 'localityName', value: 'Blacksburg' },
		{ name: 'organizationName', value: 'Test' },
		{ shortName: 'OU', value: 'Test' }
		], "1");
	
	return {
		identification_document: CNPJ.generate(),
    	expiration_date: moment().subtract(2,'days').format("YYYY-MM-DD"), 
    	certificate: certificate.certificate,
    	cas_list: [ certificate.certificate ]
    	// signature: signature_hex,
    	// message,
    	// public_key: pair.public
	};
});

factory.define('with_random_cas_list_cert_data', {}, async (opts) => {
	
	const certificate = generateSelfSigned(
		[
		{ name: 'commonName', value: 'example.org' },
	 	{ name: 'countryName', value: 'US' },
		{ shortName: 'ST', value: 'Virginia' },
		{ name: 'localityName', value: 'Blacksburg' },
		{ name: 'organizationName', value: 'Test' },
		{ shortName: 'OU', value: 'Test' }
		], "1");

	const caCertificate = generateSelfSigned(
		[
		{ name: 'commonName', value: 'example.org' },
	 	{ name: 'countryName', value: 'US' },
		{ shortName: 'ST', value: 'Virginia' },
		{ name: 'localityName', value: 'Blacksburg' },
		{ name: 'organizationName', value: 'Test' },
		{ shortName: 'OU', value: 'Test' }
		], "2");
	
	
	return {
		identification_document: CNPJ.generate(),
    	expiration_date: moment().subtract(2,'days').format("YYYY-MM-DD"), 
    	certificate: certificate.certificate,
    	cas_list: [ caCertificate.certificate ]
    	// signature: signature_hex,
    	// message,
    	// public_key: pair.public
	};
});

factory.define('cert_data_cas_list_with_two_certificates', {}, async (opts) => {
	
	const caCertificate1 = generateSelfSigned(
		[
			{ name: 'commonName', value: 'example.org' },
		 	{ name: 'countryName', value: 'US' },
			{ shortName: 'ST', value: 'Virginia' },
			{ name: 'localityName', value: 'Blacksburg' },
			{ name: 'organizationName', value: 'Test' },
			{ shortName: 'OU', value: 'Test' }
		],"1");

	const caCertificate2 = generateForHost(
		caCertificate1.privateKey,
		[
			{ name: 'commonName', value: 'test' }, 
			{ name: 'organizationName', value: 'my-app' }
		],
		[
			{ name: 'commonName', value: 'example.org' },
		 	{ name: 'countryName', value: 'US' },
			{ shortName: 'ST', value: 'Virginia' },
			{ name: 'localityName', value: 'Blacksburg' },
			{ name: 'organizationName', value: 'Test' },
			{ shortName: 'OU', value: 'Test' }
		]
		,"2")

	const certificate = generateForHost(
		caCertificate2.privateKey,
		[
			{ name: 'commonName', value: 'test' }, 
			{ name: 'organizationName', value: 'my-app' }
		],
		[
			{ name: 'commonName', value: 'test' }, 
			{ name: 'organizationName', value: 'my-app' }
		]
		,"3")
	
	return {
		identification_document: CNPJ.generate(),
    	expiration_date: moment().subtract(2,'days').format("YYYY-MM-DD"), 
    	certificate: certificate.certificate,
    	cas_list: [
    		caCertificate2.certificate,
    		caCertificate1.certificate
    	]
    	// signature: signature_hex,
    	// message,
    	// public_key: pair.public
	};
});

factory.define('cert_data_cas_list_with_three_certificates', {}, async (opts) => {
	
	const caCertificate1 = generateSelfSigned(
		[
			{ name: 'commonName', value: 'example.org' },
		 	{ name: 'countryName', value: 'US' },
			{ shortName: 'ST', value: 'Virginia' },
			{ name: 'localityName', value: 'Blacksburg' },
			{ name: 'organizationName', value: 'Test' },
			{ shortName: 'OU', value: 'Test' }
		], "1");

	const caCertificate2 = generateForHost(
		caCertificate1.privateKey,
		[
			{ name: 'commonName', value: 'test' }, 
			{ name: 'organizationName', value: 'my-app' }
		],
		[
			{ name: 'commonName', value: 'example.org' },
		 	{ name: 'countryName', value: 'US' },
			{ shortName: 'ST', value: 'Virginia' },
			{ name: 'localityName', value: 'Blacksburg' },
			{ name: 'organizationName', value: 'Test' },
			{ shortName: 'OU', value: 'Test' }
		], "2")

	const caCertificate3 = generateForHost(
		caCertificate2.privateKey,
		[
			{ name: 'commonName', value: 'test' }, 
			{ name: 'organizationName', value: 'my-app' }
		],
		[
			{ name: 'commonName', value: 'test' }, 
			{ name: 'organizationName', value: 'my-app' }
		], "3")

	const certificate = generateForHost(
		caCertificate3.privateKey,
		[
			{ name: 'commonName', value: 'test' }, 
			{ name: 'organizationName', value: 'my-app' }
		],
		[
			{ name: 'commonName', value: 'test' }, 
			{ name: 'organizationName', value: 'my-app' }
		], "4")
	
	return {
		identification_document: CNPJ.generate(),
    	expiration_date: moment().subtract(2,'days').format("YYYY-MM-DD"), 
    	certificate: certificate.certificate,
    	cas_list: [
    		caCertificate3.certificate,
    		caCertificate2.certificate,
    		caCertificate1.certificate
    	]
    	// signature: signature_hex,
    	// message,
    	// public_key: pair.public
	};
});

