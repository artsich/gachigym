const fs = require('fs');
const path = require('path');

const packageJsonPath = path.resolve(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const homepage = process.env.HOMEPAGE;

if (homepage) {
    packageJson.homepage = homepage;
    console.log(`Set homepage to ${homepage}`);
}

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
