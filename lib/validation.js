import moment from 'moment';
import forge from 'node-forge';

function validation(cert_data, user_input) {

	if( cert_data.identification_document !== user_input.identification_document){
		return false;
	}
	
	const cas_list = cert_data.cas_list;

	if( typeof cas_list === 'undefined' ){
		return false;
	}

	if( cas_list.length === 0 ){
		return false;
	}

	if( cas_list[0] === cert_data.certificate ){
		return false;
	}

	let caCert = cas_list.map( ca_cert => forge.pki.certificateFromPem(ca_cert));
	let cert = forge.pki.certificateFromPem(cert_data.certificate);
	let caStore = forge.pki.createCaStore([ caCert.pop() ]);
	let verification;

	try {
		// console.log(caCert.length)
		// console.log(caCert.concat([cert]).length)

		verification = forge.pki.verifyCertificateChain(caStore, [cert].concat(caCert));
	    // console.log(verification);
	} catch (e) {
	    // console.log('Failed to verify certificate1(' + e.message || e + ')');
	    return false;
	}

	return true;
}


module.exports = validation;

