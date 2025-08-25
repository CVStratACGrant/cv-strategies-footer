/**
 * @fileoverview
 * NOTE: variables from JavaScript files are globally accessible because of the placement of the <script> tags at the end of index.html 
 * 
 * responsible for linking the bill estimation with the visible side of the program
 */

const deriveMeterSize = (charge, targetObject = fixedCharges) => {
    if (!isNumber(charge, true) || typeof targetObject !== 'object') return false;

    for (const year of years) {
        for (const meterSize in targetObject[year]) {
            if (targetObject[year][meterSize] === charge) return meterSize;
        }
    }
    return false;
}

const isString = (value) => {
    return typeof value === 'string';
}

const isNumber = (value, strict = false) => {
  if (strict) return typeof value === 'number' && Number.isFinite(value);

  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed !== '' && !isNaN(Number(trimmed));
  }

  return typeof value === 'number' && Number.isFinite(value);
};

const getPerThousandUnits = (value) => {
    if (isNumber(value)) return +value / 1000;
    return value;
}

const isDate = (value) => {
  if (typeof value !== 'string') return false;

  const isDelimited = [' ', '-', '/'].some((delimiter) => value.includes(delimiter));
  if (!isDelimited) return false;

  const timestamp = new Date(value).getTime();
  return Number.isFinite(timestamp);
};

const getInterpretedStringValue = (value) => {
    if (isNumber(value)) return +value;
    if (isDate(value)) return new Date(value);
    if (value === 'true') return true;
    if (value === 'false') return false;
    else return value;
}

const getTypedValue = (rawValue) => {
    try {
        if (Array.isArray(rawValue)) return rawValue.map((value) => getInterpretedStringValue(value));
        if (typeof rawValue !== 'string') return rawValue;
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
    if (isNumber(cost) && cost >= 0) return `$${cost.toFixed(2)}`;
    else return '$--';
}

const formatUnitValue = (value, unit) => {
    if (isNumber(value) && value >= 0) return `${value.toFixed(0)}${unit ? ` ${unit}` : ''}`;
    else return '--';
}

/**
 * 
 * @param {Number} year
 * @param {String} description 
 * @returns {Void}
 * 
 * When using this as a helper function for `calcAndLog`, ensure that the year
 * and description match for the entries you want grouped.
 */
const getTitle = (year, description = customerData.customerClass) => {
    if (year && typeof year === 'number') return `${year} ${description}=>`;
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
 * Tagged template function: use as `calcAndLog`Example Title=>${10} + ${20}`.
 *
 * ✅ Behavior:
 * - All **numeric** expressions (`${10}`) are included in the calculation.
 * - All **string** expressions are ignored.
 * 
 * 💡 Tips: 
 * - Use `getTitle(year)` to generate the "Example Title=>" prefix.
 * - Use `getString(value)` to ignore any numerical values inside of expressions (e.g., `${getString(index + 1)}`).
 *
 * ➗ Division:
 * - Use the **division symbol `÷`** instead of `/`.
 *   - Mac: `Option + /`
 *   - Windows: `Alt + 0247`
 *
 * ➖ Subtraction:
 * - Use `-` **with spaces** on both sides when used for subtraction (e.g., `10 - 5`).
 * - Do **not** use `-` as a delimiter except for uniting hyphenated words (e.g., `cost-effective`).
 *
 * 📏 Flags:
 * - Append `~=~` followed by a string to:
 *   - Add a **unit label** (e.g., `~=~lb`).
 *   - **Suppress** the dollar sign prefix.
 * - Special flag: `~=~CALC-ONLY` disables logging (calculation still runs).
 *
 * 🧪 Example:
 *   `Fruit Total: Apple (${10} lb) + Orange (${15} lb)~=~lb` → Logs: `Fruit Total: Apple (10.00 lb) + Orange (15.00 lb) = 25.00 lb`
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
        if ('*+÷'.includes(character)) return true;
        if ('-'.includes(character)) {
            const previousCharacter = array[index - 1];
            const nextCharacter = array[index + 1];

            const isHyphen = previousCharacter &&
                nextCharacter &&
                /[a-zA-Z]/.test(previousCharacter) &&
                /[a-zA-Z]/.test(nextCharacter);

            return !isHyphen;
        }
    });

    const fullMathExpressionArray = numbers.map((number, index) => {
        return `${number}${operators[index] ?? ''}`;
    });
    const fullMathExpression = fullMathExpressionArray.join('').replace('÷', '/').replace(/[*+÷-]$/, '');
    const evaluator = new Function(`return ${fullMathExpression}`);
    value = evaluator();
    const roundedValue = roundToNthPlace(value, 2);
    
    const flagPattern = /~=~(.*)/;
    const flagMatch = reconstructedString.match(flagPattern);

    if (flagMatch === 'CALC-ONLY') return roundedValue;
    
    const formattedEquation = reconstructedString.replace(flagPattern, '').replace('*', '\u00d7').trim();
    const formattedValue = !flagMatch ? formatCost(roundedValue) : formatUnitValue(roundedValue, flagMatch[1]);

    recordEquation(`${formattedEquation} = ${formattedValue}`);
    return roundedValue;
}