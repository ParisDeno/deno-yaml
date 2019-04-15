import { Type } from '../Type.ts';

const _hasOwnProperty = Object.prototype.hasOwnProperty;
const _toString = Object.prototype.toString;

function resolveYamlOmap(data: any) {
    const objectKeys: string[] = [];
    let pairKey = '';
    let pairHasKey = false;

    for (const pair of data) {
        pairHasKey = false;

        if (_toString.call(pair) !== '[object Object]') return false;

        for (pairKey in pair) {
            if (_hasOwnProperty.call(pair, pairKey)) {
                if (!pairHasKey) pairHasKey = true;
                else return false;
            }
        }

        if (!pairHasKey) return false;

        if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
        else return false;
    }

    return true;
}

function constructYamlOmap(data: any) {
    return data !== null ? data : [];
}

export const omap = new Type('tag:yaml.org,2002:omap', {
    construct: constructYamlOmap,
    kind: 'sequence',
    resolve: resolveYamlOmap,
});
