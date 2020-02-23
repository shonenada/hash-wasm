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
