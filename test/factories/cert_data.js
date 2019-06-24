import { factory } from 'factory-bot';
import { CPF, CNPJ } from 'cpf_cnpj';
import moment from 'moment';

factory.define('cert_data', {}, {
	identification_document: CNPJ.generate(),
    expiration_date: moment().subtract(2,'days').format("YYYY-MM-DD")
});

factory.extend('cert_data', 'expired_cert_data', { 
    expiration_date: moment().add(2,'days').format("YYYY-MM-DD")
});

factory.extend('cert_data', 'today_expired_cert_data', { 
    expiration_date: moment().format("YYYY-MM-DD")
});
