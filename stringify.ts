import { safeDump } from './src/dumper/dumper.ts';

const { DenoError, ErrorKind } = Deno;

export async function stringify(obj: any): Promise<any> {
    throw new DenoError(ErrorKind.Other, 'Not yet implemented.');
}

export function stringifySync(obj: any): string {
    return safeDump(obj);
}
