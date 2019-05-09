import { YAMLError } from './error/YAMLError';
import { KindType, Type } from './Type';

function compileList(schema: Schema, name: 'implicit' | 'explicit', result: Type[]): Type[] {
    const exclude: number[] = [];

    schema.include.forEach(includedSchema => {
        result = compileList(includedSchema, name, result);
    });

    schema[name].forEach(currentType => {
        result.forEach((previousType, previousIndex) => {
            if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
                exclude.push(previousIndex);
            }
        });

        result.push(currentType);
    });

    return result.filter((type, index) => exclude.includes(index));
}

export type TypeMap = { [k in KindType | 'fallback']: ObjBoxed<Type> };
function compileMap(...typesList: Type[][]) {
    const result: TypeMap = {
        fallback: {},
        mapping: {},
        scalar: {},
        sequence: {},
    };

    typesList.forEach(types => {
        types.forEach(type => {
            if (type.kind !== null) {
                result[type.kind][type.tag] = result['fallback'][type.tag] = type;
            }
        });
    });
    return result;
}

export class Schema implements SchemaDefinition {
    public static SCHEMA_DEFAULT?: Schema;

    public implicit: Type[];
    public explicit: Type[];
    public include: Schema[];

    public compiledImplicit: Type[];
    public compiledExplicit: Type[];
    public compiledTypeMap: TypeMap;

    constructor(definition: SchemaDefinition) {
        this.explicit = definition.explicit || [];
        this.implicit = definition.implicit || [];
        this.include = definition.include || [];

        this.implicit.forEach(type => {
            if (type.loadKind && type.loadKind !== 'scalar') {
                throw new YAMLError(
                    'There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.',
                );
            }
        });

        this.compiledImplicit = compileList(this, 'implicit', []);
        this.compiledExplicit = compileList(this, 'explicit', []);
        this.compiledTypeMap = compileMap(this.compiledImplicit, this.compiledExplicit);
    }

    public static create() {}
}

export interface SchemaDefinition {
    implicit?: any[];
    explicit?: Type[];
    include?: Schema[];
}
