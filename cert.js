const forge = require('node-forge');
const fsp = require('fs/promises');
const path = require('path');

// 创建一个自签名CA证书
function generateCACertificate() {
    // 生成私钥
    const keys = forge.pki.rsa.generateKeyPair(2048);

    // 创建证书
    const cert = forge.pki.createCertificate();
    cert.publicKey = keys.publicKey;

    // 设置证书属性
    cert.serialNumber = '01';
    cert.validity.notBefore = new Date();
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 10); // 10年有效期

    // 设置证书的Subject和Issuer
    const attrs = [
        { name: 'commonName', value: 'FEArena Proxy CA' },
        { name: 'countryName', value: 'US' },
        { shortName: 'ST', value: 'California' },
        { name: 'localityName', value: 'San Francisco' },
        { name: 'organizationName', value: 'FEArena Proxy' },
        { shortName: 'OU', value: 'Certificate Authority' },
    ];
    cert.setSubject(attrs);
    cert.setIssuer(attrs);

    // 签名证书
    cert.sign(keys.privateKey, forge.md.sha256.create());

    // PEM编码证书和私钥
    const pemCert = forge.pki.certificateToPem(cert);
    const pemKey = forge.pki.privateKeyToPem(keys.privateKey);

    return { cert: pemCert, key: pemKey };
}

// 生成并保存CA证书和私钥
const ca = generateCACertificate();
fsp.mkdir(path.join(path.dirname('.'), 'cert')).then(() => {
    fsp.writeFile(path.join(path.dirname('.'), 'cert', 'ca-cert.crt'), ca.cert);
    fsp.writeFile(path.join(path.dirname('.'), 'cert', 'ca-key.pem'), ca.key);    
});

console.log('CA证书和私钥已生成并保存为 ca-cert.crt 和 ca-key.pem');
