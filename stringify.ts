const { DenoError, ErrorKind } = Deno;

export async function stringify(obj: any): Promise<any> {
    throw new DenoError(ErrorKind.Other, 'Not yet implemented.');
}

export function stringifySync(obj: any): string {
    throw new DenoError(ErrorKind.Other, 'Not yet implemented.');
}
