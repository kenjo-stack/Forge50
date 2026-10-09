'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),c={};vm.createContext(c);
vm.runInContext(fs.readFileSync(path.join(root,'js/exercise-demo-data.js'),'utf8'),c);
const data=JSON.parse(JSON.stringify(c.ForgeDemoData)),assets=JSON.parse(fs.readFileSync(path.join(root,'docs/expanded-demo-assets.json'),'utf8'));
assert.equal(Object.keys(assets).length,34);
for(const [id,asset] of Object.entries(assets)){data.assets[id]=asset;data.exercises[id]=[id];}
data.version='original-gifs-v2';data.baseVersion='2.12.0';
assert.equal(Object.keys(data.assets).length,74);assert.equal(Object.keys(data.exercises).length,74);
fs.writeFileSync(path.join(root,'js/exercise-demo-data.js'),'/* Original Forge50 GIF assets. Stable exercise IDs and existing demonstrations are preserved. */\n(function(){\n  const data='+JSON.stringify(data,null,2)+';\n  Object.values(data.assets).forEach(Object.freeze);\n  Object.values(data.exercises).forEach(Object.freeze);\n  Object.freeze(data.assets);Object.freeze(data.exercises);\n  globalThis.ForgeDemoData=Object.freeze(data);\n})();\n');
const swPath=path.join(root,'sw.js');
let sw=fs.readFileSync(swPath,'utf8').replace(/const CACHE='[^']+';/,"const CACHE='forge50-v2.12.0-complete-exercises';");
sw=sw.replace(/const DEMO_NAMES=\[[^\n]+\];/,'const DEMO_NAMES='+JSON.stringify(Object.keys(data.assets).sort())+';');
fs.writeFileSync(swPath,sw);
const appPath=path.join(root,'js/app.js');
fs.writeFileSync(appPath,fs.readFileSync(appPath,'utf8').replaceAll('2.11.4','2.12.0').replace('Incline Dumbbell Fly animated demo','74 exercises · more alternatives · complete animations'));
console.log('Registered 74 animated exercise mappings and a new app-shell cache; existing cached GIFs are retained.');
