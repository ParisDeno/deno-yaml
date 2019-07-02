// Copyright 2018-2019 the Deno authors. All rights reserved. MIT license.

import { asserts, testing } from './devDeps.ts';
import { parse } from './mod.ts';

const { test } = testing;
const { assertEquals } = asserts;

test({
    name: 'parsed correctly',
    fn() {
        const FIXTURE = `
        test: toto
        foo:
          bar: True
          baz: 1
          qux: ~
        `;

        const ASSERTS = { test: 'toto', foo: { bar: true, baz: 1, qux: null } };

        assertEquals(parse(FIXTURE), ASSERTS);
    },
});
