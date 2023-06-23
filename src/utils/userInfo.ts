export function encodeLanguageList() {}
export function decodeLanguageList() {}

export function optionsToString(params: string[], options: { value: string; label: string }[]) {
    if (Array.isArray(params) && params.length > 0) {
        return params
            .map((value: string) => options.find(item => item.value === value)?.label)
            .join(';');
    }
}
export function optionsToArray(params: string, options: { value: string; label: string }[]) {
    if (params.length) {
        return params
            .split(';')
            .map((label: string) => options.find(item => item.label === label)?.value);
    }
    return [];
}
