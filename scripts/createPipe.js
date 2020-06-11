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

var dirName = './pipes/';

var pipePath = './src/app/pipes/';
if (fs.existsSync(pipePath + name + '.pipe.ts')) {
    console.log('Error: pipe aleady exists.');
    return;
}

if (name.indexOf('/') !== -1) {
    var arr = name.split('/');
    name = arr[arr.length -1];
    for (var i = 0; i < arr.length - 1; i++) {
        if (!fs.existsSync(pipePath + arr[i])) {
            mkdirp.sync(pipePath + arr[i]);
        }
        pipePath += arr[i] + '/';
        dirName += arr[i] + '/';
    }
}

fs.copyFileSync('./scripts/models/pipe', pipePath + name + '.pipe.ts');

utils.replaceInFile(pipePath + name + '.pipe.ts', [
    { regex: /{{ PascalCase }}/g, value: utils.toPascalCase(name) },
]);

var className = utils.toPascalCase(name);
utils.writeBefore('./src/app/app.module.ts', '/* Import - Modals */', 'import { ' + className + ' } from \'' + dirName + name + '.pipe\';', 1);
utils.writeBefore('./src/app/app.module.ts', '/* End Declarations */', '    ' + className + ',');

console.log(name + ' added !');
console.log('Don\'t forget to fix the transform method !');

function printUsage() {
    console.log('Usage:');
    console.log('npm run newPipe [name]');
    console.log('[name] must be in camelCase. Example : npm run newPipe myNewPipe');
}
