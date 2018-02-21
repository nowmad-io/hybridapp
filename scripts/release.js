const fs = require('fs');
const path = require('path');
const readJson = require('read-json');

const root = path.resolve(__dirname, "..");
const packageJson = path.join(root, './package.json');
const packageLockJson = path.join(root, './package-lock.json');
const androidManifest = path.join(root, './android/app/src/main/AndroidManifest.xml');
const buildGradle = path.join(root, './android/app/build.gradle');
const simpleGit = require('simple-git')(path.join(root, ".git"));

// Bump version
readJson(packageJson, (err, data) => {
  let newVersion = data.version.split('.');
  newVersion[newVersion.length - 1] = +newVersion[newVersion.length - 1] + 1;
  newVersion = newVersion.join('.');

  data.version = newVersion;

  // Update package.json
  updateFile(packageJson, JSON.stringify(data, null, 2));

  // Update package-lock.json
  readJson(packageLockJson, (err, data2) => {
    data2.version = newVersion;

    updateFile(packageLockJson, JSON.stringify(data2, null, 2));
  });

  // Update android/app/src/main/AndroidManifest.xml
  fs.readFile(androidManifest, 'utf8', function(err, contents) {
    newContents = contents.replace(/(android:versionName=")(.*)(")/g, `$1${newVersion}$3`);
    newContents = newContents.replace(/(android:versionCode=")(.*)(")/g, (match, p1, p2, p3) => (
      p1 + (+p2 + 1) + p3
    ));

    updateFile(androidManifest, newContents);
  });

  // Update android/app/build.gradle
  fs.readFile(buildGradle, 'utf8', function(err, contents2) {
    newContents2 = contents2.replace(/(versionName ")(.*)(")/g, `$1${newVersion}$3`);
    newContents2 = newContents2.replace(/(versionCode )(.*)/g, (match, p1, p2) => (
      p1 + (+p2 + 1)
    ));

    updateFile(buildGradle, newContents2);
  });
});

// commit

// checkout master

// merge develop to master


function updateFile(path, data, cb) {
  fs.writeFile(path, data, (err) => {
    if (err) {
      throw err;
    }

    return cb;
  });
}
