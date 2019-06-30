export function isNothing(subject: any): subject is never {
    return typeof subject === 'undefined' || subject === null;
}

export function isArray(value: unknown): value is any[] {
    return Array.isArray(value);
}

export function isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean' || value instanceof Boolean;
}

export function isNull(value: unknown): value is null {
    return value === null;
}

export function isNullOrUndefined(value: unknown): value is null | undefined {
    return value === null || value === undefined;
}

export function isNumber(value: unknown): value is number {
    return typeof value === 'number' || value instanceof Number;
}

export function isString(value: unknown): value is string {
    return typeof value === 'string' || value instanceof String;
}

export function isSymbol(value: unknown): value is symbol {
    return typeof value === 'symbol';
}

export function isUndefined(value: unknown): value is undefined {
    return value === undefined;
}

export function isObject(value: unknown): value is object {
    return value !== null && typeof value === 'object';
}

export function isError(e: unknown): boolean {
    return e instanceof Error;
}

export function isFunction(value: unknown): value is () => void {
    return typeof value === 'function';
}

export function isRegExp(value: unknown): value is RegExp {
    return value instanceof RegExp;
}

export function toArray<T>(sequence: T): T | [] | [T] {
    if (isArray(sequence)) return sequence;
    if (isNothing(sequence)) return [];

    return [sequence];
}

export function repeat(str: string, count: number) {
    let result = '';

    for (let cycle = 0; cycle < count; cycle++) {
        result += str;
    }

    return result;
}

export function isNegativeZero(i: number) {
    return i === 0 && Number.NEGATIVE_INFINITY === 1 / i;
}

export interface ArrayObject<T> {
    [P: string]: T;
}
