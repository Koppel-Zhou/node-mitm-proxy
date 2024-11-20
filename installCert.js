const { exec } = require('child_process');
const path = require('path');

// 设置证书文件路径
const certPath = path.resolve('cert', 'ca-cert.crt'); // 证书路径
// 1. 安装证书到Windows的受信任根证书存储区
exec(`certutil -addstore "Root" "${certPath}"`, (error, stdout, stderr) => {
    if (error) {
        console.error(`安装证书失败: ${error.message}`);
        console.error(error);
        return;
    }
    if (stderr) {
        console.error(`安装证书时出错: ${stderr}`);
        return;
    }
    console.log(`证书已成功安装: ${stdout}`);
});