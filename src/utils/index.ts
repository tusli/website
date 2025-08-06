export function createPageUrl(pageName) {
    return `/${pageName}`;
}

export function hyphenToCamelCase(str) {
    return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
}