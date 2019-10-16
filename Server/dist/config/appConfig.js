"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var evn_port = process.env.APP_PORT || '4000';
var fs = require('fs');
var AppConfig = /** @class */ (function () {
    function AppConfig() {
        var _this = this;
        this.config = {};
        this.ReadDataFromFile('D:/Projects/Server/config/config.json').then(function (resp) {
            _this.config = JSON.parse(resp);
        }).catch(function (err) {
            console.log(err);
        });
    }
    AppConfig.prototype.ReadDataFromFile = function (file_source_path) {
        return new Promise(function (resolve, reject) {
            if (fs.existsSync(file_source_path)) {
                fs.readFile(file_source_path, 'utf8', function (err, data) {
                    if (!err) {
                        resolve(data);
                    }
                    else {
                        reject(err);
                    }
                });
            }
            else {
                reject('Invalid Config Path');
            }
        });
    };
    AppConfig.prototype.getAuthSecretToken = function () {
        return this.config.appConfig.authSecretToken;
    };
    AppConfig.prototype.getApiVersion = function () {
        return 'V1.1';
    };
    AppConfig.prototype.getAppPortAddr = function () {
        return evn_port;
    };
    return AppConfig;
}());
exports.default = AppConfig;
//# sourceMappingURL=appConfig.js.map