const evn_port = process.env.APP_PORT || '4000'
var fs = require('fs');
export default class AppConfig {
    private config : any = {};
    constructor() {
      this.ReadDataFromFile('D:/Projects/Server/config/config.json').then((resp: any) => {
        this.config = JSON.parse(resp);
      }).catch((err) => {
        console.log(err);
      });
    }

    ReadDataFromFile(file_source_path: any) {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(file_source_path)) {
                fs.readFile(file_source_path, 'utf8', (err: any, data: any) => {
                    if (!err) {
                        resolve(data)
                    } else {
                        reject(err)
                    }
                });
            } else {
                reject('Invalid Config Path')
            }
        })
    }

    getAuthSecretToken() {
        return this.config.appConfig.authSecretToken;
    }

    getApiVersion() {
        return 'V1.1'
    }

    getAppPortAddr() {
        return evn_port;
    }

}