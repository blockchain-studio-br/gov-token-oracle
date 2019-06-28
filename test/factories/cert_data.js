import { factory } from 'factory-bot';
import { CNPJ } from 'cpf_cnpj';
import moment from 'moment';
import fs from 'fs';
import forge    from 'node-forge';

import { 
	generateSelfSigned,
	generateForHost,
	generateExpiredCertificate
} from '../utils/generateCertificate';

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
		caCertificate.keys.privateKey,
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
    	certificate: forge.pki.certificateToPem(certificate.certificate),
    	cas_list: [
    		forge.pki.certificateToPem(caCertificate.certificate)
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

	const certificate = generateExpiredCertificate(
		caCertificate.keys.privateKey,
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
    	certificate: forge.pki.certificateToPem(certificate.certificate),
    	cas_list: [
    		forge.pki.certificateToPem(caCertificate.certificate)
    	]
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
		caCertificate.keys.privateKey,
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
    	certificate: forge.pki.certificateToPem(certificate.certificate),
    	cas_list: [ 
    		forge.pki.certificateToPem(caCertificate.certificate)
    	]
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
		caCertificate.keys.privateKey,
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
    	certificate: forge.pki.certificateToPem(certificate.certificate),
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
    	certificate: forge.pki.certificateToPem(certificate.certificate),
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
    	certificate: forge.pki.certificateToPem(certificate.certificate),
    	cas_list: [ 
    		forge.pki.certificateToPem(certificate.certificate)
    	]
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
    	certificate: forge.pki.certificateToPem(certificate.certificate),
    	cas_list: [
    		forge.pki.certificateToPem(caCertificate.certificate)
    	]
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
		caCertificate1.keys.privateKey,
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
		caCertificate2.keys.privateKey,
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
    	certificate: forge.pki.certificateToPem(certificate.certificate),
    	cas_list: [
    		forge.pki.certificateToPem(caCertificate2.certificate),
    		forge.pki.certificateToPem(caCertificate1.certificate)
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
		caCertificate1.keys.privateKey,
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
		caCertificate2.keys.privateKey,
		[
			{ name: 'commonName', value: 'test' }, 
			{ name: 'organizationName', value: 'my-app' }
		],
		[
			{ name: 'commonName', value: 'test' }, 
			{ name: 'organizationName', value: 'my-app' }
		], "3")

	const certificate = generateForHost(
		caCertificate3.keys.privateKey,
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
    	certificate: forge.pki.certificateToPem(certificate.certificate),
    	cas_list: [
    		forge.pki.certificateToPem(caCertificate3.certificate),
    		forge.pki.certificateToPem(caCertificate2.certificate),
    		forge.pki.certificateToPem(caCertificate1.certificate)
    	]
    	// signature: signature_hex,
    	// message,
    	// public_key: pair.public
	};
});

factory.define('cert_data_cas_list_with_lumini', {}, async (opts) => {
	let certificate1 = fs.readFileSync('./test/data/certificate1.pem').toString();
	let certificate2 = fs.readFileSync('./test/data/certificate2.pem').toString();
	let certificate3 = fs.readFileSync('./test/data/certificate3.pem').toString();
	let certificate  = fs.readFileSync('./test/data/certificate.pem').toString();
	
	return {
		identification_document: CNPJ.generate(),
    	certificate: certificate,
    	cas_list: [
    		certificate3,
    		certificate2,
    		certificate1
    	]
    	// signature: signature_hex,
    	// message,
    	// public_key: pair.public
	};
});

factory.define('cert_data_cas_list_with_lumini_tbscerftificate_changed', {}, async (opts) => {
	let certificate1 = fs.readFileSync('./test/data/certificate1.pem').toString();
	let certificate2 = fs.readFileSync('./test/data/certificate2.pem').toString();
	let certificate3 = fs.readFileSync('./test/data/certificate3.pem').toString();
	let certificate  = fs.readFileSync('./test/data/certificate.pem').toString();

	let cert = forge.pki.certificateFromPem(certificate);
	
	return {
		identification_document: CNPJ.generate(),
    	certificate: certificate,
    	cas_list: [
    		certificate3,
    		certificate2,
    		certificate1
    	]
    	// signature: signature_hex,
    	// message,
    	// public_key: pair.public
	};
});

