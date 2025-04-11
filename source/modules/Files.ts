import { Disk, Path, defaultPath, Logs } from "../libraries/modules.js";


export interface Config {
    Startup:{
        Language: string,
        Render: string,
    }
    System: {
        Platform: string,
        Version: string,
        Arch: string,
        Kernel: string,
    }
    Hardware: {
        Processor: {
            Manufacturer: string,
            Model: string,
            Threads: string,
        }
        Graphics: {
            Manufacturer: string,
            Model: string,
            VRAM: string,
        }
        Memory: {
            Size: string,
        }
    }
};
export function createFileOnDisk_Sync(Data:any, Filename:string) {
    try{
        if(!Disk.existsSync(defaultPath)){
            Disk.mkdirSync(defaultPath, { recursive: true });
        };

        let File = Path.join(defaultPath, Filename);
        let Content = JSON.stringify(Data, null, 5);
        Disk.writeFileSync(File, Content, 'utf-8');

        if(Disk.existsSync(File)) {
            Logs.Message('File already exists.');
        } else {
            Logs.Error(`Error on create ${Filename}.json on ${defaultPath}`);
        };
    } catch (message) {
        Logs.Error(`Error on create new ${Filename}: ${message}`);
    }
}