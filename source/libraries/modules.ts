import {app, BrowserWindow} from 'electron';
import si from 'systeminformation';
import {Systeminformation} from 'systeminformation';
import fs from 'fs';
import path from 'path';

export const Instance:Electron.App = app;
export const Window:typeof Electron.BrowserWindow = BrowserWindow;
export const System:typeof si = si;
export let SystemInformation_OS: Systeminformation.OsData;
export let SystemInformation_CPU: Systeminformation.CpuData;
export let SystemInformation_GPU: Systeminformation.GraphicsControllerInfo[];
export let SystemInformation_RAM: Systeminformation.MemData;
export let SystemInformation_DISK: Systeminformation.FsSizeData[];
export let Disk:typeof fs= fs;
export let Path:typeof path= path;

export const Logs = {
    Error: (Content:string) => console.log('@Lightone_@Error: ' + Content),
    Message: (Content:string) => console.log('@Lightone_@Message: ' + Content),
    Warning: (Content:string) => console.log('@Lightone_@Warning: ' + Content),
};

export let defaultPath = path.resolve('Config');