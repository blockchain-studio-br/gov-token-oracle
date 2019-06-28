import forge  from 'node-forge';

// const pair = generateRSAKeypair()

// var message = "Eu sou dono do cnpj";

// const signer = crypto.createSign('sha256');
// signer.update(message);
// signer.end();

// const signature = signer.sign(pair.private)
// const signature_hex = signature.toString('hex')

// const verifier = crypto.createVerify('sha256');
// verifier.update(message);
// verifier.end();

// const verified = verifier.verify(pair.public, signature);

// console.log({ verified });

// use your own attributes here, or supply a csr (check the docs)
// var attrs = [{
//   name: 'commonName',
//   value: 'example.org'
// }, {
//   name: 'countryName',
//   value: 'US'
// }, {
//   shortName: 'ST',
//   value: 'Virginia'
// }, {
//   name: 'localityName',
//   value: 'Blacksburg'
// }, {
//   name: 'organizationName',
//   value: 'Test'
// }, {
//   shortName: 'OU',
//   value: 'Test'
// }];

// var attrsSubject = [{
//     name: 'commonName',
//     value: 'test'
// }, {
//     name: 'organizationName',
//     value: 'my-app'
// }];
// var attrsIssuer = [{
//     name: 'commonName',
//     value: 'my-app'
// }, {
//     name: 'organizationName',
//     value: 'my-app'
// }];

export function generateSelfSigned(
        attrs,
        serialNumber = '01'
    ) {
    // generate a keypair or use one you have already
    var keys = forge.pki.rsa.generateKeyPair(2048);
    
    // create a new certificate
    var cert = forge.pki.createCertificate();

    let today = new Date();

    // fill the required fields
    cert.publicKey = keys.publicKey;
    cert.serialNumber = serialNumber;
    cert.validity.notBefore = new Date();
    cert.validity.notBefore.setFullYear(today.getFullYear() - 1);
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setFullYear(today.getFullYear() + 1);

    // here we set subject and issuer as the same one
    cert.setSubject(attrs);
    cert.setIssuer(attrs);

    // the actual certificate signing
    cert.sign(keys.privateKey);

    return {
        privateKey:  forge.pki.privateKeyToPem(keys.privateKey),
        publicKey:   forge.pki.publicKeyToPem(keys.publicKey),
        certificate: forge.pki.certificateToPem(cert)
    };
}

export function generateForHost(
        privateKey, 
        attrsSubject, 
        attrsIssuer,
        serialNumber = '01'
    ) {
    var privateCAKey = forge.pki.privateKeyFromPem(privateKey);

    let today = new Date();

    // console.log('Generating 1024-bit key-pair...');
    var keys = forge.pki.rsa.generateKeyPair(2048);
    // console.log('Key-pair created.');
    // console.log('Creating self-signed certificate...');
    var cert = forge.pki.createCertificate();
    cert.publicKey = keys.publicKey;
    cert.serialNumber = '01';
    cert.validity.notBefore = new Date();
    cert.validity.notBefore.setFullYear(today.getFullYear() - 1);
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setFullYear(today.getFullYear() + 1);
    
    cert.setSubject(attrsSubject);
    cert.setIssuer(attrsIssuer);

    // self-sign certificate
    // cert.sign(keys.privateKey/*, forge.md.sha256.create()*/);
    // better sign this with the CA private key
    cert.sign(privateCAKey);

    return {
        privateKey:  forge.pki.privateKeyToPem(keys.privateKey),
        publicKey:   forge.pki.publicKeyToPem(keys.publicKey),
        certificate: forge.pki.certificateToPem(cert)
    };
}

export default {
    generateForHost,
    generateSelfSigned
};