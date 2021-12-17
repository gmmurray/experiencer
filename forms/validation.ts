const isRequiredString = 'this field is required';
export const isRequired = (value: any) =>
    value ? undefined : isRequiredString;
export const composeValidators =
    (...validators: any[]) =>
    (value: any) =>
        validators.reduce(
            (error, validator) => error || validator(value),
            undefined,
        );
