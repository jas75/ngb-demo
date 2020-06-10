module.exports = {
    replaceInFile: (file, value) => {
        var fs = require('fs');
        var data = fs.readFileSync(file, 'utf8');
        var result = data.replace(/{{ fileName }}/g, value);
        result = result.replace(/{{ PascalCase }}/g, module.exports.toPascalCase(value));
        fs.writeFileSync(file, result, 'utf8');
    },
    
    toPascalCase: (text) => {
        return text.replace(/(^\w|-\w)/g, module.exports.clearAndUpper);
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
