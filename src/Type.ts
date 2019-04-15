export type KindType = 'sequence' | 'scalar' | 'mapping';
export type StyleVariant = 'lowercase' | 'uppercase' | 'camelcase' | 'decimal';
type RepresentFn = (data: any, style?: StyleVariant) => any;

const DEFAULT_RESOLVE = () => true;
const DEFAULT_CONSTRUCT = (data: any) => data;

interface TypeOptions {
    kind: KindType;
    resolve?: (data: any) => boolean;
    construct?: (data: string) => any;
    instanceOf?: object;
    predicate?: (data: object) => boolean;
    represent?: RepresentFn | ObjBoxed<RepresentFn>;
    defaultStyle?: StyleVariant;
    styleAliases?: { [x: string]: any };
}

function checkTagFormat(tag: string): string {
    return tag;
}

export class Type {
    public tag: string;
    public kind: KindType | null = null;
    public instanceOf?: object;
    public predicate?: (data: object) => boolean;
    public represent?: RepresentFn | ObjBoxed<RepresentFn>;
    public defaultStyle?: string;
    public styleAliases?: { [x: string]: any };
    public loadKind?: KindType;

    constructor(tag: string, options?: TypeOptions) {
        this.tag = checkTagFormat(tag);
        if (options) {
            this.kind = options.kind;
            this.resolve = options.resolve || DEFAULT_RESOLVE;
            this.construct = options.construct || DEFAULT_CONSTRUCT;
            this.instanceOf = options.instanceOf;
            this.predicate = options.predicate;
            this.represent = options.represent;
            this.defaultStyle = options.defaultStyle;
            this.styleAliases = options.styleAliases;
        }
    }
    public resolve: (data?: any) => boolean = () => true;
    public construct: (data?: any) => any = data => data;
}
