var mkdirp = require('mkdirp');
var fs = require('fs');

var args = process.argv.slice(2);

if (args.length === 0) {
    console.log('Error: Missing argument.');
    console.log('Usage:');
    console.log('npm run newModel [name]');
    console.log('[name] must be in camelCase. Example : npm run newModel myNewModel');
    return;
}

var name = args[0];

var modelPath = './src/app/models/';
if (fs.existsSync(modelPath + name + '.ts')) {
    console.log('Error: model aleady exists.');
    return;
}

if (name.indexOf('/') !== -1) {
    var arr = name.split('/');
    name = arr[arr.length -1];
    for (var i = 0; i < arr.length - 1; i++) {
        if (!fs.existsSync(modelPath + arr[i])) {
            mkdirp.sync(modelPath + arr[i]);
        }
        modelPath += arr[i] + '/';
    }
}

fs.writeFileSync(modelPath + name + '.ts', 'export class ' + name.charAt(0).toUpperCase() + name.slice(1) + ' {\n}\n', 'utf8');

console.log(name + ' added !');
