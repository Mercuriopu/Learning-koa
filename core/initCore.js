/*
 * @Author: Martin
 * @Date: 2020-11-14 16:26:16
 * @LastEditTime: 2020-11-15 16:08:54
 * @FilePath: \koa-app\core\initCore.js
 */
const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager {
    static initCore(app) {
        InitManager.app = app
        InitManager.initLoadRouter()
        InitManager.loadConfig()
    }

    static initLoadRouter() {
        const apiDirectory = `${process.cwd()}/app/api` //绝对路径
        requireDirectory(module, apiDirectory, { visit: whenLoadModule }) //第三个参数为回调函数，每次执行导入时都会执行

        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }
    }
    static loadConfig(path = '') {
        const configPath = path || process.cwd() + '/config/config.js'
        const config = require(configPath)
        global.config = config
    }
}

module.exports = InitManager