// Copyright 2018-2019 the Deno authors. All rights reserved. MIT license.

import { asserts, testing } from './devDeps.ts';
import { stringify } from './mod.ts';

const { test } = testing;
const { assertEquals } = asserts;

test({
    name: 'stringified correctly',
    fn() {
        const FIXTURE = {
            foo: {
                bar: true,
                test: [
                    'a',
                    'b',
                    {
                        a: false,
                    },
                    {
                        a: false,
                    },
                ],
            },
            test: 'foobar',
        };

        const ASSERTS = `foo:
  bar: true
  test:
    - a
    - b
    - a: false
    - a: false
test: foobar
`;

        assertEquals(stringify(FIXTURE), ASSERTS);
    },
});
