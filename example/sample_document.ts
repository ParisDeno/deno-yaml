import { parseSync } from '../mod.ts';

const { readFileSync, cwd, inspect } = Deno;

(async () => {
    const yml = readFileSync(`${cwd()}/example/sample_document.yml`);

    const document = new TextDecoder().decode(yml);
    const obj = parseSync(document);
    console.log(obj);

    let i = 0;
    for (const o of Object.values(obj)) {
        console.log(`======${i}`);
        for (const [key, value] of Object.entries(o)) {
            console.log(key, value);
        }
        i++;
    }
})();
