export function isNothing(subject: any): subject is never {
    return typeof subject === 'undefined' || subject === null;
}

export function isObject(subject: any): subject is object {
    return typeof subject === 'object' && subject !== null;
}

export function toArray<T>(sequence: T): T | [] | [T] {
    if (Array.isArray(sequence)) return sequence;
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
