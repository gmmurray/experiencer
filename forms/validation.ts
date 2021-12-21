const isRequiredString = 'this field is required';
const isValidUrlString = 'use a valid url';
export const isRequired = (value: any) =>
    value ? undefined : isRequiredString;

export const isEmptyString = (value: any) =>
    typeof value === 'string' && value.length === 0;

export const isNullOrEmptyString = (value: any) =>
    !value || isEmptyString(value);

export const isValidUrl = (value: any) => {
    if (value && typeof value === 'string' && !isEmptyString(value)) {
        return value.match(
            /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
        )
            ? undefined
            : isValidUrlString;
    }
};
export const composeValidators =
    (...validators: any[]) =>
    (value: any) =>
        validators.reduce(
            (error, validator) => error || validator(value),
            undefined,
        );
