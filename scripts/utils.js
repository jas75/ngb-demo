module.exports = {
    replaceInFile: (file, replaceValues) => {
        var fs = require('fs');
        var result = fs.readFileSync(file, 'utf8');
        for (var i = 0; i < replaceValues.length; i++) {
            elt = replaceValues[i];
            result = result.replace(elt.regex, elt.value);
        }
        fs.writeFileSync(file, result, 'utf8');
    },
    
    /** convert kebab-case to PascalCase */
    toPascalCase: (text) => {
        return text.replace(/(^\w|-\w)/g, module.exports.clearAndUpper);
    },

    /** convert kebab-case to camelCase */
    toCamelCase: (text) => {
        return text.replace(/-\w/g, module.exports.clearAndUpper);
    },

    clearAndUpper: (text) =>  {
        return text.replace(/-/, "").toUpperCase();
    },

    writeBefore: (file, beforeValue, content, offset = 0) => {
        var fs = require('fs');
        var data = fs.readFileSync(file, 'utf8');
        var arr = data.split('\n');
        var index = 0;
        var found = false;
        while (index < arr.length && !found) {
            found = arr[index].indexOf(beforeValue) != -1;
            if (!found) {
                index++;
            }
        }
        if (found) {
            arr.splice(index - offset, 0, content);
        }
        var result = arr.join('\n');
        fs.writeFileSync(file, result, 'utf8');
    }
}
