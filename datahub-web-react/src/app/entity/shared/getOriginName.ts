export const getOriginName = (origin) => {
    if (origin?.startsWith('AZ')) {
        return 'Cloud';
    }
    if (origin?.startsWith('DK')) {
        return 'On-Prem';
    }
    return '';
};
