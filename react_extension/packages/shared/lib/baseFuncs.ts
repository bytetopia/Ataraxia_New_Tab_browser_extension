

const writeConf = (key: string, value: any) => {
    localStorage[key] = JSON.stringify(value);
}

const readConf = (key: string): any => {
    var val = localStorage[key];
    if (val === undefined) {
        return undefined;
    }
    return JSON.parse(val);
}

export { writeConf, readConf };