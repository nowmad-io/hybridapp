const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, "..");

const reactNativeCodePush = path.join(root, './node_modules/react-native-code-push/android/app/build.gradle');
const reactNativeConfig = path.join(root, './node_modules/react-native-config/android/build.gradle');
const buildVersion = '25.0.0';

function updateBuildTool(path) {
  fs.readFile(path, 'utf8', function(err, contents) {
    newContents = contents.replace(/(buildToolsVersion ")(.*)(")/g, `$1${buildVersion}$3`);

    fs.writeFileSync(path, newContents);
  });
}

updateBuildTool(reactNativeCodePush);
updateBuildTool(reactNativeConfig);
