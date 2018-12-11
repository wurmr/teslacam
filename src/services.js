#!/usr/bin/node
const fs = require('fs');
const {execSync} = require('./common');

const [path, script, command] = process.argv;

const getServices = dirPath => fs
    .readdirSync(dirPath, { withFileTypes: true})
    .filter(f=>f.isDirectory())
    .map(({ name }) => `${dirPath}/${name}`);


switch(command){

    case 'start':
        getServices('./services')
            .forEach(s=>{
                execSync(`sudo svc -u ${s}`);
            });
        break;
    case 'stop':
        getServices('./services')
            .forEach(s=>{
                execSync(`sudo svc -d ${s}`);
            });
        break;
    case 'status':
        getServices('./services')
            .forEach(s=>{
                execSync(`sudo svstat ${s}`);
            });
        break;
    default:
        console.log('Unknown command. [start|stop|status]')

}
