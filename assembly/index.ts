export { wasiabort } from './env';

import { Console } from '../node_modules/as-wasi/assembly';
import { Base64 } from './base64';

export function _start(): void {
    Console.log('Base64Encode("First blood") = ' + Base64.encode("First blood"));
}
