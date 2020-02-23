export { wasiabort } from './env';

import { Console } from '../node_modules/as-wasi/assembly';

export function _start(): void {
    Console.log('First blood');
}
