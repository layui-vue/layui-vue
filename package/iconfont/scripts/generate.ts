const iconfonts = require("./iconfont.ts");
const path = require("path");
const fs = require("fs");

const allTemplate = require("./template.ts");

const resolve = (...file) =>
  path.resolve(process.cwd() + "/src/icons/", ...file);

function generateFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, "utf8", (err) => {
      if (err) {
        console.log(err.message);
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

function firstToUpper(str) {
  var arr = str.split("-");
  for (var i = 1; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1);
  }
  return arr.join("").trim().replace(str[0], str[0].toUpperCase());
}

let names = [];

// generate iconfont component
const generateIcons = () => {
  iconfonts.forEach(async (item) => {
    let className = item.class;
    let name = firstToUpper(className.replace("layui-icon-", "")) + "Icon";
    let selectTemplate = allTemplate["Component"];
    let path = resolve(name + ".vue");
    let data = { name: name, class: className };
    names.push(name);
    await generateFile(path, selectTemplate(data));
  });
};

// generate icons index.ts
const generateIndex = async () => {
  let path = resolve("index.ts");
  let selectTemplate = allTemplate["Index"];
  await generateFile(path, selectTemplate(names));
};

generateIcons();
generateIndex();

console.log("Generate Success");
