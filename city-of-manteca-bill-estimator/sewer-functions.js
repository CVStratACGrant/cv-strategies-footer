/**
 * NOTE: variables from JavaScript files are globally accessible because of the placement of the <script> tags at the end of index.html 
 * 
 * responsible for linking the bill estimation with the visible side of the program
 */

const isNumber = (value, strict = false) => {
    if (strict) return typeof value === "number"
    return typeof value === "number" || !isNaN(value) && !!value.trim().length;
}

const getInterpretedStringValue = (value) => {
    if (isNumber(value)) return +value;
    else if (value === 'true') return true;
    else if (value === 'false') return false;
    else return value;
}

const getTypedValue = (rawValue) => {
    try {
        if (Array.isArray(rawValue)) return rawValue.map((value) => getInterpretedStringValue(value));
        if (typeof rawValue !== "string") return rawValue;
        return getInterpretedStringValue(rawValue);
    } catch (error) {
        console.error(error);
    }
}

const getArraySum = (array) => array.reduce((acc, curr) => acc += (isNumber(curr, true) ? curr : 0), 0);

const getArrayProduct = (array) => array.reduce((acc, curr) => acc *= (isNumber(curr, true) ? curr : 1), 1);

const getString = (value) => {
    if (typeof value === 'string') return value;
    else if (typeof value === 'object') return JSON.stringify(value);
    else return String(value);
};

const roundToNthDecimalPlace = (number, decimalPlaces, returnAsNumber = false) => {
    try {
        if (!isNumber(number, true)) return number;
        const roundedResult = number.toFixed(decimalPlaces);
        return returnAsNumber ? +roundedResult : roundedResult;
    } catch (error) {
        console.error(error);
    }
}

const formatCost = (cost) => {
    if (isNumber(cost) && cost > 0) return `$${roundToNthDecimalPlace(cost, 2)}`;
    else return '$--';
}

const getTextPortions = (string) => {
    const baseObject = { body: '', title: '', titleDelimiter: '', year: '', yearDelimiter: '' };

    if (typeof string !== 'string') return baseObject;

    const titlePattern = /^(\d{4})(\s)([\w\s-\(\)]{1,})([-~:]?)(.*)/
    const matches = string.match(titlePattern);
    if (!matches) return baseObject;

    return { body: matches[5], title: matches[3], titleDelimiter: matches[4], year: matches[1], yearDelimiter: matches[2] };
}

const recordEquation = (rawEquation) => {
    if (typeof rawEquation !== 'string') return '';

    const { body, title, year } = getTextPortions(rawEquation);

    const yearAndTitle = `${year} ${title}`;

    if (equations[yearAndTitle]) equations[yearAndTitle].push(body);
    else equations[yearAndTitle] = [body];
}

const calcAndLog = (strings, ...expressions) => {
    /** 
     * This is tag function and is thus called in this format: calcAndLog`Example Cost: ${10} + ${20}` 
     * All numbers included in the expression will be calculated. All string values will be ignored in calculation.
    */

    if (!strings.length || !expressions.length) return console.error(expressions);
    
    const originalString = strings.reduce((result, currentRawString, index) => {
        const currentExpression = expressions[index] !== undefined ? expressions[index] : '';
        return result + currentRawString + roundToNthDecimalPlace(currentExpression, 3);
    }, '');
    
    let value = 0;

    if (originalString.includes('+') && !originalString.includes('*')) value = getArraySum(expressions);
    else if (originalString.includes('*') && !originalString.includes('+')) value = getArrayProduct(expressions);

    recordEquation(`${originalString} = ${formatCost(value)}`);
    return value;
}