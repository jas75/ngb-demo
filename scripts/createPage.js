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

var dirName = './pages/';

var pagePath = './src/app/pages/' + name + '/';
if (fs.existsSync(pagePath)) {
    console.log('Error: page aleady exists.');
    return;
}

if (name.indexOf('/') !== -1) {
    var arr = name.split('/');
    name = arr[arr.length -1];
    var path = './src/app/pages/';
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
    mkdirp.sync(pagePath);
}

fs.closeSync(fs.openSync(pagePath + name + '.component.scss', 'w'));
fs.closeSync(fs.openSync(pagePath + name + '.component.html', 'w'));
fs.copyFileSync('./scripts/models/component', pagePath + name + '.component.ts');
fs.writeFileSync(pagePath + 'index.ts', 'export * from \'./' + name + '.component\';', 'utf8');

utils.replaceInFile(pagePath + name + '.component.ts', [
    { regex: /{{ fileName }}/g, value: name },
    { regex: /{{ PascalCase }}/g, value: utils.toPascalCase(name) },
]);

var className = utils.toPascalCase(name) + 'Component';
utils.writeBefore('./src/app/app.module.ts', '/* Import - Pipes */', 'import { ' + className + ' } from \'' + dirName + name + '\';', 1);
utils.writeBefore('./src/app/app.module.ts', '/* Declarations - Pipes */', '    ' + className + ',');

utils.writeBefore('./src/app/app.routes.ts', 'export const ROUTES: Routes = [', 'import { ' + className + ' } from \'' + dirName + name + '\';', 1);

if (fs.readFileSync('./src/app/app.routes.ts', 'utf8').indexOf('**') !== -1) {
    utils.writeBefore('./src/app/app.routes.ts', '**', '  { path: \'' + utils.toCamelCase(name) + '\', component: ' + className + ' },');
} else {
    utils.writeBefore('./src/app/app.routes.ts', '];', '  { path: \'' + utils.toCamelCase(name) + '\', component: ' + className + ' },');
}

console.log(name + ' added !');
console.log('Don\'t forget to update app.routes.ts !');

function printUsage() {
    console.log('Usage:');
    console.log('npm run new-page [name]');
    console.log('[name] must be in kebab case. Example : npm run new-page my-new-page');
}
