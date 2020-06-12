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

if (!utils.isValidKebabCase(name)) {
    console.log('Error: argument must be in kebab-case.');
    printUsage();
    return;
}

var dirName = './utils/';

var utilsPath = './src/app/utils/';
if (fs.existsSync(utilsPath + name + '.service.ts')) {
    console.log('Error: service aleady exists.');
    return;
}

if (name.indexOf('/') !== -1) {
    var arr = name.split('/');
    name = arr[arr.length -1];
    for (var i = 0; i < arr.length - 1; i++) {
        if (!fs.existsSync(utilsPath + arr[i])) {
            mkdirp.sync(utilsPath + arr[i]);
        }
        utilsPath += arr[i] + '/';
        dirName += arr[i] + '/';
    }
}

fs.copyFileSync('./scripts/models/service', utilsPath + name + '.service.ts');

utils.replaceInFile(utilsPath + name + '.service.ts', [
    { regex: /{{ PascalCase }}/g, value: utils.toPascalCase(name) },
]);

var className = utils.toPascalCase(name) + 'Service';
utils.writeBefore('./src/app/app.module.ts', '/* Styles */', 'import { ' + className + ' } from \'' + dirName + name + '.service\';', 1);
utils.writeBefore('./src/app/app.module.ts', '/* End Providers */', '    ' + className + ',');

console.log(name + ' added !');

function printUsage() {
    console.log('Usage:');
    console.log('npm run new-service [name]');
    console.log('[name] must be in kebab-case. Example : npm run new-service my-new-service');
}
