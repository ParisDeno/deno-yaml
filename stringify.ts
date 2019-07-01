// Copyright 2018-2019 the Deno authors. All rights reserved. MIT license.

import { safeDump } from './src/dumper/dumper.ts';
import { DumperStateOptions } from './src/dumper/DumperState.ts';

export type DumpOptions = DumperStateOptions;

export function stringify(obj: any, options?: DumpOptions) {
    return safeDump(obj, options);
}
