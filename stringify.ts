import { safeDump } from './src/dumper/dumper.ts';
import { DumperStateOptions } from './src/dumper/DumperState.ts';

export type DumpOptions = DumperStateOptions;

export function stringify(obj: any, options?: DumpOptions) {
    return safeDump(obj, options);
}
