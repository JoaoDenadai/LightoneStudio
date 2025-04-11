
//  Hardware.ts
//  Created and crafted by João Denadai
//  This library catches the system and hardware details. 
//  Is very useful to control and give to the user the best quality and performance.
//

//
// Import the library from the Modules.ts
import { System, SystemInformation_OS, SystemInformation_CPU, SystemInformation_GPU, SystemInformation_RAM, SystemInformation_DISK } from "../libraries/modules.js";

//
// Initial variables.
let SystemData:typeof SystemInformation_OS | undefined;
let ProcessorData:typeof SystemInformation_CPU | undefined;
let GraphicsData:typeof SystemInformation_GPU | undefined;
let MemoryData:typeof SystemInformation_RAM | undefined;
let HardDiskData:typeof SystemInformation_DISK | undefined;


//
// Preload all the variables with all system available important data.
export async function initSystemData():Promise<void> {
    //
    // Verify every each variable.
    // If the variable have some content, the system will ignore.
    if(!SystemData) SystemData = await System.osInfo();
    if(!ProcessorData) ProcessorData = await System.cpu();
    if(!GraphicsData) GraphicsData = (await System.graphics()).controllers;
    if(!MemoryData) MemoryData = await System.mem();
    if(!HardDiskData) HardDiskData = await System.fsSize();
}

//
// Get some basic Operation System data.
export async function getOperationalSystemData():Promise<object>{
    //
    // If the variable is undefined, will fill with system informations.
    if(!SystemData) SystemData = await System.osInfo();
    // Return the most important data.
    return {platform: SystemData.platform, Distro: SystemData.distro, Arch: SystemData.arch};
};

//
// Get the basic Kernel data.
export async function getKernelData():Promise<object> {
    //
    // If the variable is undefined, will fill with system informations.
    if(!SystemData) SystemData = await System.osInfo();
    // It will return the Kernel code.
    return {Kernel: SystemData.kernel};
}

//
// Get the system distro data.
export async function getOperationalSystemDistroData():Promise<object> {
    //
    //If variable is undefined, will fill with system informations.
    if(!SystemData) SystemData = await System.osInfo();
    // It will return the distro informations.
    return {Distro: SystemData.distro, Arch: SystemData.arch};
}


//
//  After here, you will find hardware functions
//
//

//
// Get some basic processor data.
export async function getProcessorData():Promise<Object> {
    //
    // Regex to format the Processor name.
    const REGEX_CPU = /[^a-zA-Z0-9 \-]/g;
    //If processor data is undefined, will load the variable.
    if(!ProcessorData) ProcessorData = await System.cpu();
    //It will return basic Processor data.
    return {Manufacturer:  ProcessorData.manufacturer, Model: ProcessorData.brand.replace(REGEX_CPU, ''), Threads: ProcessorData.cores};
}

//
// Get some basic Graphics data
export async function getGraphicsCardData():Promise<Object> {
    // If graphics data is undefined, will load the variable.
    if(!GraphicsData) GraphicsData = (await System.graphics()).controllers;

    //
    // Will load each graphics card available.
    // It only get physical graphics controllers.
    let Graphics:Record<string, object> = {};
    for(let i:number = 0; i < GraphicsData.length; i++){
        if(GraphicsData[i].bus){
            Graphics["GPU#"+ i] = {
                Vendor: GraphicsData[i].vendor,
                Model: GraphicsData[i].model,
                VRAM: GraphicsData[i].vram
            }
        };
    }

    // Return all available physical graphics controllers (PGC).
    return Graphics;
}

//
// Get some basic Memory data.
export async function getMemoryData():Promise<Object> {
    //
    // If memory data is undefined, will load the variable.
    if(!MemoryData) MemoryData = await System.mem();

    // 
    //  Important function to convert bytes to gigabytes.
    let calculateMemory = (memory:number):number => {
        memory = Number((memory / 1024 / 1024 / 1024).toFixed(2));
        return memory;
    };
    // Return some memory data.
    return {Total: calculateMemory(MemoryData.total), Free: calculateMemory(MemoryData.free), Used: calculateMemory(MemoryData.used)};
}

//
// Get some disk data.
export async function getHardDiskData():Promise<Object> {
    //
    // If disk data is undefined, will load the varaible.
    if(!HardDiskData) HardDiskData = await System.fsSize();

    //
    // Will load each disks available.
    let Disks:Record<string, object> = {};
    for(let i:number = 0; i < HardDiskData.length; i++){
        //
        // For each disk founded, will fill the variable with each disk data.
        Disks["Disk#" + i] = {
            Partition: HardDiskData[i].mount,
            Type: HardDiskData[i].type,
            Size: Number((HardDiskData[i].size / 1024 / 1024 / 1024).toFixed(2)),
            Used: Number((HardDiskData[i].used / 1024 / 1024 / 1024).toFixed(2))
        };
    }

    //
    // Return all disks.
    return Disks;
}


export default {
    initSystemData,
    getOperationalSystemData,
    getKernelData,
    getOperationalSystemDistroData,
    getProcessorData,
    getGraphicsCardData,
    getMemoryData,
    getHardDiskData,
};
