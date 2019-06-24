import moment from 'moment';

function validation(cert_data, user_input) {

	if( cert_data.identification_document !== user_input.identification_document){
		return false;
	}

	const expiration_date = moment(cert_data.expiration_date);

	if( !moment().isAfter(expiration_date) ){
		return false;
	}

	return true;
}


module.exports = validation;

