const fs = require('fs');
const path = require('path');

const baseFolder =
    process.env.APPDATA !== undefined && process.env.APPDATA !== ''
        ? `${process.env.APPDATA}/ASP.NET/https`
        : `${process.env.HOME}/.aspnet/https`;

const certificateArg = process.argv.map(arg => arg.match(/--name=(?<value>.+)/i)).filter(Boolean)[0];
const certificateName = certificateArg ? certificateArg.groups.value : process.env.npm_package_name;

if (!certificateName) {
    console.error('Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<<app>> explicitly.')
    process.exit(-1);
}

const certFilePath = path.join(baseFolder, `dev_${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `dev_${certificateName}.key`);

fs.writeFileSync(
    '.env.development.local',
    `SSL_CRT_FILE=${certFilePath}
SSL_KEY_FILE=${keyFilePath}`
);