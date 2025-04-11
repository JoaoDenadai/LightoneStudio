import { Logs } from './source/libraries/modules.js';
import { createFileOnDisk_Sync } from './source/modules/Files.js';

(async function Main(){
    createFileOnDisk_Sync({Name: 'Joao', Age: 20}, 'Hello.json');
})();