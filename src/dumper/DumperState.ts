import { Schema, SchemaDefinition } from '../Schema.ts';
import { State } from '../State.ts';
import { StyleVariant, Type } from '../Type.ts';

const _hasOwnProperty = Object.prototype.hasOwnProperty;

function compileStyleMap(schema: Schema, map: Map<string, string> = null) {
    const result = new Map<string, StyleVariant>();
    if (map === null) return result;

    let type: Type;
    for (let [tag, style] of map.entries()) {
        if (tag.slice(0, 2) === '!!') {
            tag = `tag:yaml.org,2002:${tag.slice(2)}`;
        }
        type = schema.compiledTypeMap.fallback[tag];

        if (type && _hasOwnProperty.call(type.styleAliases, style)) {
            style = type.styleAliases[style];
        }

        result.set(tag, style as StyleVariant);
    }

    return result;
}

export interface DumperStateOptions {
    /** indentation width to use (in spaces). */
    indent?: number;
    /** when true, will not add an indentation level to array elements */
    noArrayIndent?: boolean;
    /** do not throw on invalid types (like function in the safe schema) and skip pairs and single values with such types. */
    skipInvalid?: boolean;
    /** specifies level of nesting, when to switch from block to flow style for collections. -1 means block style everwhere */
    flowLevel?: number;
    /** Each tag may have own set of styles.	- "tag" => "style" map. */
    styles?: Map<string, string>;
    /** specifies a schema to use. */
    schema?: SchemaDefinition;
    /** if true, sort keys when dumping YAML. If a function, use the function to sort the keys. (default: false) */
    sortKeys?: boolean | ((a: any, b: any) => number);
    /** set max line width. (default: 80) */
    lineWidth?: number;
    /** if true, don't convert duplicate objects into references (default: false) */
    noRefs?: boolean;
    /** if true don't try to be compatible with older yaml versions. Currently: don't quote "yes", "no" and so on, as required for YAML 1.1 (default: false) */
    noCompatMode?: boolean;
    /**
     * if true flow sequences will be condensed, omitting the space between `key: value` or `a, b`. Eg. `'[a,b]'` or `{a:{b:c}}`.
     * Can be useful when using yaml for pretty URL query params as spaces are %-encoded. (default: false).
     */
    condenseFlow?: boolean;
}

export class DumperState extends State {
    public indent: number;
    public noArrayIndent: boolean;
    public skipInvalid: boolean;
    public flowLevel: number;
    public sortKeys: boolean | ((a: any, b: any) => number);
    public lineWidth: number;
    public noRefs: boolean;
    public noCompatMode: boolean;
    public condenseFlow: boolean;
    public implicitTypes: Type[];
    public explicitTypes: Type[];
    public tag: string = null;
    public result: string = '';
    public duplicates = [];
    public usedDuplicates = null;
    public styleMap: Map<string, StyleVariant>;
    public dump: any;

    constructor({
        schema,
        indent = 2,
        noArrayIndent = false,
        skipInvalid = false,
        flowLevel = -1,
        styles = null,
        sortKeys = false,
        lineWidth = 80,
        noRefs = false,
        noCompatMode = false,
        condenseFlow = false,
    }: DumperStateOptions) {
        super(schema);
        this.indent = Math.max(1, indent);
        this.noArrayIndent = noArrayIndent;
        this.skipInvalid = skipInvalid;
        this.flowLevel = flowLevel;
        this.styleMap = compileStyleMap(this.schema as Schema, styles);
        this.sortKeys = sortKeys;
        this.lineWidth = lineWidth;
        this.noRefs = noRefs;
        this.noCompatMode = noCompatMode;
        this.condenseFlow = condenseFlow;

        this.implicitTypes = (this.schema as Schema).compiledImplicit;
        this.explicitTypes = (this.schema as Schema).compiledExplicit;
    }
}
