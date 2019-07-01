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
    
    var keys = forge.pki.rsa.generateKeyPair(2048);
    

    return generateCertificate({
        privateKey: keys.privateKey,
        keys: keys,
        attrsSubject: attrs,
        attrsIssuer: attrs,
        serialNumber
    });
}

export function generateForHost(
        privateKey, 
        attrsSubject, 
        attrsIssuer,
        serialNumber = '01'
    ) {

    return generateCertificate({
        privateKey,
        attrsSubject,
        attrsIssuer,
        serialNumber
    });
}

export function generateExpiredCertificate(
        privateKey, 
        attrsSubject, 
        attrsIssuer,
        serialNumber = '01'
    ) {

    let notBefore = new Date((new Date()).setFullYear((new Date()).getFullYear() - 2));
    let notAfter = new Date((new Date()).setFullYear((new Date()).getFullYear() - 1));  

    return generateCertificate({
        privateKey,
        attrsSubject,
        attrsIssuer,
        notBefore,
        notAfter,
        serialNumber
    });
}

export function generateTodayExpiredCertificate(
        privateKey, 
        attrsSubject, 
        attrsIssuer,
        serialNumber = '01'
    ) {

    let notBefore = new Date((new Date()).setFullYear((new Date()).getFullYear() - 1));
    let notAfter = new Date((new Date()).setHours((new Date()).getHours() + 1));  

    return generateCertificate({
        privateKey,
        attrsSubject,
        attrsIssuer,
        notBefore,
        notAfter,
        serialNumber
    });
}

export function generateTodayStartCertificate(
        privateKey, 
        attrsSubject, 
        attrsIssuer,
        serialNumber = '01'
    ) {

    let notBefore = new Date();
    let notAfter = new Date((new Date()).setFullYear((new Date()).getFullYear() + 1));  

    return generateCertificate({
        privateKey,
        attrsSubject,
        attrsIssuer,
        notBefore,
        notAfter,
        serialNumber
    });
}

export function generateCertificate({
    privateKey, 
    attrsSubject, 
    keys = forge.pki.rsa.generateKeyPair(2048),
    attrsIssuer,
    notBefore = new Date((new Date()).setFullYear((new Date()).getFullYear() - 3)),
    notAfter = new Date((new Date()).setFullYear((new Date()).getFullYear() + 3)),
    serialNumber = '01'
}) {

    var cert = forge.pki.createCertificate();
    cert.publicKey = keys.publicKey;
    cert.serialNumber = '01';
    cert.validity.notBefore = notBefore;
    cert.validity.notAfter = notAfter;
    
    cert.setSubject(attrsSubject);
    cert.setIssuer(attrsIssuer);

    cert.sign(privateKey);

    return { keys: keys, certificate: cert };
}


export default {
    generateForHost,
    generateSelfSigned, 
    generateCertificate,
    generateExpiredCertificate, 
    generateTodayExpiredCertificate,
    generateTodayStartCertificate
};