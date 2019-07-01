// Copyright 2018-2019 the Deno authors. All rights reserved. MIT license.

import { CbFunction, safeLoad, safeLoadAll } from './src/loader/loader.ts';
import { LoaderStateOptions } from './src/loader/LoaderState.ts';

export type ParseOptions = LoaderStateOptions;

export function parse(content: string, options?: ParseOptions) {
    return safeLoad(content, options);
}

export function parseAll(content: string, iterator?: CbFunction, options?: ParseOptions) {
    return safeLoadAll(content, iterator, options);
}
