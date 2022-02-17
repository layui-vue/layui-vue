var fs = require('fs');
var { resolve } = require('path');

const inputDir = resolve(__dirname, './src/component')

const inputsArray = fs.readdirSync(inputDir).filter((name) => {
    const componentDir = resolve(inputDir, name);
    const isDir = fs.lstatSync(componentDir).isDirectory();
    return isDir && fs.readdirSync(componentDir).includes('index.ts');
});

var content = fs.readFileSync("./src/theme/variable.less").toString() + '\n\n';
content += fs.readFileSync("./src/theme/index.less").toString() + '\n\n';

inputsArray.forEach(function (f) {
    var path = "./src/component/" + f + "/index.less";
     fs.exists(path,function(exists){
        if(exists){
            var c = fs.readFileSync(path);
            content += c.toString() + '\n\n';
            // @ts-ignore
            content = content.replaceAll(/\@import.*?\;/g,"");
            fs.writeFileSync('./lib/index.less',content);
        }
    });
})