var mkdirp = require('mkdirp');
var fs = require('fs');
var utils = require('./utils.js');

var args = process.argv.slice(2);

if (args.length === 0) {
    console.log('Error: Missing argument.');
    console.log('Usage:');
    console.log('npm run newModal [name]');
    console.log('[name] must be in kebab-case. Example : npm run newModal my-new-modal');
    return;
}

var name = args[0];
var dirName = './modals/';

var modalPath = './src/app/modals/' + name + '/';
if (fs.existsSync(modalPath)) {
    console.log('Error: modal aleady exists.');
    return;
}

if (name.indexOf('/') !== -1) {
    var arr = name.split('/');
    name = arr[arr.length -1];
    var path = './src/app/modals/';
    for (var i = 0; i < arr.length; i++) {
        if (!fs.existsSync(path + arr[i])) {
            mkdirp.sync(path + arr[i]);
        }
        path += arr[i] + '/';
        if (i < arr.length -1) {
            dirName += arr[i] + '/';
        }
    }
} else {
    mkdirp.sync(modalPath);
}

fs.closeSync(fs.openSync(modalPath + name + '.component.scss', 'w'));
fs.copyFileSync('./scripts/models/modalView', modalPath + name + '.component.html');
fs.copyFileSync('./scripts/models/modalComponent', modalPath + name + '.component.ts');
fs.writeFileSync(modalPath + 'index.ts', 'export * from \'./' + name + '.component\';', 'utf8');

utils.replaceInFile(modalPath + name + '.component.ts', [
    { regex: /{{ fileName }}/g, value: name },
    { regex: /{{ PascalCase }}/g, value: utils.toPascalCase(name) },
]);

var className = utils.toPascalCase(name) + 'Component';
utils.writeBefore('./src/app/app.module.ts', '/* Import - Utils */', 'import { ' + className + ' } from \'' + dirName + name + '\';', 1);
utils.writeBefore('./src/app/app.module.ts', '/* Declarations - Pages */', '    ' + className + ',');
utils.writeBefore('./src/app/app.module.ts', '/* EntryComponents - End */', '    ' + className + ',');

console.log(name + ' added !');
