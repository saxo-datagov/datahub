export const getPhysicalEnv = (origin) => {
    if (origin?.endsWith('DEV')) {
        return 'Dev';
    }
    if (origin?.endsWith('TEST')) {
        return 'Test';
    }
    if (origin?.endsWith('PROD')) {
        return 'Prod';
    }
    return '';
};
