/**
 * @fileoverview
 * NOTE: variables from JavaScript files are globally accessible because of the placement of the <script> tags at the end of index.html 
 * 
 * responsible for linking the bill estimation with the visible side of the program
 */

/**
 * Determines the water meter size for a customer based on bill base charge input
 * and provides an option for manual selection.
 *
 * Background:
 * - Customers' water bills do not display the meter size.
 * - The base charge for 5/8" and 3/4" along with 8" and 10" meter sizes are identical for 2024,
 *   so it is not possible to reliably derive meter size based on base charge alone. This function
 *   defaults to 3/4" and 8" when deriving.
 *
 * Resolution:
 * - After discussion with the IWA team, the solution is to:
 *   1. Provide an input option for the user to manually select their meter size.
 *   2. Continue to offer the current input that derives meter size based on the base charge value.
 *   3. Default the estimator to 3/4" meter size, since ~20,000 customers fall into this category,
 *      compared to only ~1,500 customers with a 5/8" meter.
 *
 * Outcome:
 * - This approach guarantees 100% accuracy when the user selects their meter size.
 * - If relying on base charge value, there's approximately a 90% chance of accuracy.
 * - This also means that 5/8" and 3/4" meter sizes
 */
const deriveMeterSize = (charge, targetObject = fixedCharges) => {
    if (!isNumber(charge, true) || typeof targetObject !== "object") return false;

    for (const year of years) {
        for (const meterSize in targetObject[year]) {
            if (targetObject[year][meterSize] === charge && charge === 21.16) return '3/4"';
            if (targetObject[year][meterSize] === charge) return meterSize;
        }
    }
    return false;
}

const isNumber = (value, strict = false) => {
    if (strict === true) return typeof value === "number"
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

const roundToNthPlace = (number, decimalPlaces = 0, returnAsNumber = true, roundingType = 'Gaussian') => {
    try {
        if (!isNumber(number, true)) return number;
        const factor = Math.pow(10, decimalPlaces);
        let roundedResult = 0;

        if (roundingType === 'Ceiling') roundedResult = Math.ceil(number * factor) / factor;
        else if (roundingType === 'Floor') roundedResult = Math.floor(number * factor) / factor;
        else if (roundingType === 'Gaussian') {
            const isHalfway = number % 1 === 0.5;
            const oddWholeNumber = Math.trunc(number) % 2 === 1;

            if (isHalfway && oddWholeNumber) roundedResult = Math.ceil(number * factor) / factor;
            else if (isHalfway && !oddWholeNumber) roundedResult = Math.floor(number * factor) / factor;
            else roundedResult = Math.round(number * factor) / factor;
        } else {
            console.error('Invalid rounding type.');
        }

        if (returnAsNumber) return roundedResult;
        else return getString(roundedResult);
    } catch (error) {
        console.error(error);
    }
}

const formatCost = (cost) => {
    if (isNumber(cost) && cost > 0) return `$${cost.toFixed(2)}`;
    else return '$--';
}

const formatUnitValue = (value, unit) => {
    if (isNumber(value) && value > 0) return `${value.toFixed(0)}${unit ? ` ${unit}` : ''}`;
    else return '--';
}

const getTitle = (year, description = customerData.customerClassGroup) => {
    if (year && typeof year === "number") return `${year} ${description}=>`;
    else console.error('No year provided.')
}

const getEquationSections = (string) => {
    if (!string || !string.includes('=>')) return '';
    const [title, body] = string.split('=>');
    const [year, ...descriptionArray] = title.split(' ');
    const description = descriptionArray.join(' ');
    return { year, description, title, body };
}

const recordEquation = (rawEquation) => {
    if (typeof rawEquation !== 'string') return '';
    
    const { title, body } = getEquationSections(rawEquation);
    
    if (equations[title]) equations[title].push(body);
    else equations[title] = [body];
}

/** 
 * This is tag function and is thus called in this format: calcAndLog`Example Title=>${10} + ${20}`
 * It is strongly recommended to use the `getTitle(year)` function to generate the "Example Title=>" region aforementioned.
 * All numbers included in the expression will be calculated. All string values will be ignored in calculation.
 * The flag `=||[...]` is accepted for appending alternative units to the result, it will also prevent the 
 * addition of the dollar sign. Example of this flag's use: `Fruit: Apple (${10}) + orange (${15})=||[HCF]`. Use
 * no space before or after the flag and input your desired string inside of the brackets.
*/
const calcAndLog = (strings, ...expressions) => {
    if (!strings.length || !expressions.length) return console.error(expressions);
    
    const numbers = expressions.filter((expression) => isNumber(expression, true));
    
    const reconstructedString = strings.reduce((result, currentRawString, index) => {
        const expression = expressions[index];
        const currentExpression = expression !== undefined ? expression : '';
        return result + currentRawString + (isNumber(currentExpression, true) ? currentExpression.toFixed(2): currentExpression);
    }, '');
    
    let value = 0;
    
    const operators = Array.from(reconstructedString).filter((character, index, array) => {
        if ('*+'.includes(character)) return true;
        if ('/-'.includes(character)) {
            const previousCharacter = [array[index - 1]];
            const nextCharacter = [array[index + 1]];
    
            const isHyphenOrSlash = previousCharacter &&
                nextCharacter &&
                /[a-zA-Z]/.test(previousCharacter) &&
                /[a-zA-Z]/.test(nextCharacter);

            return !isHyphenOrSlash
        }
    });

    const fullMathExpressionArray = numbers.map((number, index) => {
        return `${number}${operators[index] ?? ''}`
    });
    const fullMathExpression = fullMathExpressionArray.join('');
    const evaluator = new Function(`return ${fullMathExpression}`);
    value = evaluator();
    const roundedValue = roundToNthPlace(value, 2);
    
    const flagPattern = /=\|\|\[(.*?)\]/;
    const formattedEquation = reconstructedString.replace(flagPattern, '').replace('*', '\u00d7').trim();
    
    const flagMatch = reconstructedString.match(flagPattern);
    const formattedValue = !flagMatch ? formatCost(roundedValue) : formatUnitValue(roundedValue, flagMatch[1]);

    recordEquation(`${formattedEquation} = ${formattedValue}`);
    return roundedValue;
}