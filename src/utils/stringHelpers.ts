export function removeEmojis(str: string): string {
    if (!str) {
        return str;
    }

    return String(str).replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '');
}

export function removeAccents(str: string): string {
    if (!str) {
        return str;
    }

    return String(str)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}
