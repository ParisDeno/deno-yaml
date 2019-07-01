import { stringify } from '../mod.ts';

console.log(
    stringify({
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
    }),
);
