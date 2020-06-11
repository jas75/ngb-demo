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

var dirName = './components/';

var componentPath = './src/app/components/' + name + '/';
if (fs.existsSync(componentPath)) {
    console.log('Error: component aleady exists.');
    return;
}

if (name.indexOf('/') !== -1) {
    var arr = name.split('/');
    name = arr[arr.length -1];
    var path = './src/app/components/';
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
    mkdirp.sync(componentPath);
}

fs.closeSync(fs.openSync(componentPath + name + '.component.scss', 'w'));
fs.closeSync(fs.openSync(componentPath + name + '.component.html', 'w'));
fs.copyFileSync('./scripts/models/component', componentPath + name + '.component.ts');
fs.writeFileSync(componentPath + 'index.ts', 'export * from \'./' + name + '.component\';', 'utf8');

utils.replaceInFile(componentPath + name + '.component.ts', [
    { regex: /{{ fileName }}/g, value: name },
    { regex: /{{ PascalCase }}/g, value: utils.toPascalCase(name) },
]);

var className = utils.toPascalCase(name) + 'Component';
utils.writeBefore('./src/app/app.module.ts', '/* Import - Pages */', 'import { ' + className + ' } from \'' + dirName + name + '\';', 1);
utils.writeBefore('./src/app/app.module.ts', '/* Declarations - Modals */', '    ' + className + ',');

console.log(name + ' added !');

function printUsage() {
    console.log('Usage:');
    console.log('npm run newComponent [name]');
    console.log('[name] must be in kebab case. Example : npm run newComponent my-new-component');
}
