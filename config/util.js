const path = require('path');
const glob = require('glob');

/**
 * @param {object} entries 入口配置路径参数
*/
function getEntries(entries) {
    let result = {}, pathname, extname, moduleName;

    for (let prop in entries) {
        glob.sync(entries[prop]).forEach(entry => {
            extname = path.extname(entry);

            switch (prop) {
                case 'js': moduleName = 'js'; break;
                case 'style': moduleName = 'scss'; break;
                default: moduleName = null;
            }

            if (!prop) throw new Error('Invalid entry module name, please check project configuration');

            if (extname.indexOf(moduleName) !== -1) {
                pathname = path.basename(entry).split('.')[0]
            } else {
                pathname = path.basename(entry).split('.')[1]
            }

            result[pathname] = entry
        });
    }
    return result;
}

module.exports = {
    getEntries
}