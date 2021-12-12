import ObjectID from 'bson-objectid';

export function transformObjectIdFields<T extends Record<string, any>>(
    data: T,
    fields: (keyof T)[],
) {
    const result: Record<keyof T, any> = {
        ...data,
    };

    fields.forEach(f => {
        if (data[f] && typeof (data[f] === 'string')) {
            result[f] = new ObjectID(data[f]);
        }
    });

    return result;
}
