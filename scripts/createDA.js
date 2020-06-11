var mkdirp = require('mkdirp');
var fs = require('fs');
var utils = require('./utils.js');

var args = process.argv.slice(2);

if (args.length === 0) {
    console.log('Error: Missing argument.');
    printUsage();
    return;
}

var name = args[0];

if (!utils.isValidCamelCase(name)) {
    console.log('Error: argument must be in camelCase.');
    printUsage();
    return;
}

var businessDirName = './data-access/business/';
var dataDirName = './data-access/data/';

var businessPath = './src/app/data-access/business/';
var dataPath = './src/app/data-access/data/';
if (fs.existsSync(businessPath + name + '.business.ts') || fs.existsSync(dataPath + name + '.data.ts')) {
    console.log('Error: Data-access aleady exists.');
    return;
}

var folderBack = '';
var folderForward = '';
if (name.indexOf('/') !== -1) {
    var arr = name.split('/');
    name = arr[arr.length -1];
    for (var i = 0; i < arr.length - 1; i++) {
        if (!fs.existsSync( + arr[i])) {
            mkdirp.sync(businessPath + arr[i]);
        }
        if (!fs.existsSync(dataPath + arr[i])) {
            mkdirp.sync(dataPath + arr[i]);
        }
        folderBack += '../';
        businessPath += arr[i] + '/';
        businessDirName += arr[i] + '/';
        dataPath += arr[i] + '/';
        dataDirName += arr[i] + '/';
        folderForward += arr[i] + '/';
    }
}

fs.copyFileSync('./scripts/models/business', businessPath + name + '.business.ts');
fs.copyFileSync('./scripts/models/data', dataPath + name + '.data.ts');

utils.replaceInFile(businessPath + name + '.business.ts', [
    { regex: /{{ folderBack }}/g, value: folderBack },
    { regex: /{{ folderForward }}/g, value: folderForward },
    { regex: /{{ fileName }}/g, value: name },
    { regex: /{{ PascalCase }}/g, value: utils.toPascalCase(name) },
]);
utils.replaceInFile(dataPath + name + '.data.ts', [
    { regex: /{{ fileName }}/g, value: name },
    { regex: /{{ PascalCase }}/g, value: utils.toPascalCase(name) },
]);

var businessClassName = utils.toPascalCase(name) + 'Business';
var dataClassName = utils.toPascalCase(name) + 'Data';
utils.writeBefore('./src/app/app.module.ts', '/* Import - DataAccess - Data */', 'import { ' + businessClassName + ' } from \'' + businessDirName + name + '.business\';', 1);
utils.writeBefore('./src/app/app.module.ts', '/* Providers - DataAccess - Data */', '    ' + businessClassName + ',');
utils.writeBefore('./src/app/app.module.ts', '/* Import - Components */', 'import { ' + dataClassName + ' } from \'' + dataDirName + name + '.data\';', 1);
utils.writeBefore('./src/app/app.module.ts', '/* Providers - Utils */', '    ' + dataClassName + ',');

console.log(name + ' business & data added !');

function printUsage() {
    console.log('Usage:');
    console.log('npm run newDA [name]');
    console.log('[name] must be in camelCase. Example : npm run newDA myNewDA');
}
