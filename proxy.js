const { exec } = require('child_process');

// 2. 开启系统代理
const proxy = 'http://127.0.0.1:7078';  // 设置代理地址和端口
const switchProxy = (status) => {
    exec(`reg add "HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable /t REG_DWORD /d ${status} /f`, (error, stdout, stderr) => {
        if (error) {
            console.error(`${status ? '开启' : '关闭'}代理失败: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`${status ? '开启' : '关闭'}代理时出错: ${stderr}`);
            return;
        }
        console.log(`代理已${status ? '开启' : '关闭'}`);
    });
}

const setProxyServer = () => {
    exec(`reg add "HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyServer /t REG_SZ /d "${proxy}" /f`, (error, stdout, stderr) => {
        if (error) {
            console.error(`设置代理服务器失败: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`设置代理服务器时出错: ${stderr}`);
            return;
        }
        console.log(`代理服务器已设置为: ${proxy}`);
    });
}

// setProxyServer();
switchProxy(0)