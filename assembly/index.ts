export { wasiabort } from './env';

import { CommandLine, Console } from '../node_modules/as-wasi/assembly';
import { Base64 } from './base64';

function showHelp(): void {
    Console.log("wapm hash Help");
    Console.log("");
    Console.log("Usage:");
    Console.log("  [wapm run] hash [b64encode|b64decode] <RAW>");
    Console.log("");
}

let memory = new ArrayBuffer(1024);
export function getMemoryPtr(): usize {
    return changetype<usize>(memory);
}

function loadStringFromMemory(len: usize): string {
    let view = new DataView(memory);
    return String.UTF8.decode(view.buffer, true);
}

function saveStringIntoMemory(raw: string): usize {
    const len = raw.length;
    let view = new DataView(memory);
    for (let i=0;i<(len as i32);i++) {
        view.setUint8(i, raw.charCodeAt(i) as i8);
    }
    return len;
}

export function printMemory(len: usize): usize {
    const string = loadStringFromMemory(len);
    Console.log(string);
    return len;
}

export function b64encode(len: usize): usize {
    const inputString = loadStringFromMemory(len);
    const encoded = Base64.encode(inputString);
    return saveStringIntoMemory(encoded);
}

export function b64decode(len: usize): usize {
    const inputString = loadStringFromMemory(len);
    const encoded = Base64.decode(inputString);
    return saveStringIntoMemory(encoded);
}

export function _start(): void {
    const cli = new CommandLine();
    const args: Array<string> = cli.all();
    const argsLength = args.length;

    if (argsLength <= 1 || args.includes("--help") || args.includes("-h")) {
        showHelp();
        return;
    }

    let method = args[1];
    if (method.toLowerCase() == 'b64encode') {
        if (argsLength <= 2) {
            showHelp();
            return;
        }
        let raw = args[2];
        Console.log(Base64.encode(raw));
        return;
    } else if (method.toLowerCase() == 'b64decode') {
        if (argsLength <= 2) {
            showHelp();
            return;
        }
        let raw = args[2];
        Console.log(Base64.decode(raw));
        return;
    } else {
        showHelp();
        return;
    }
}
