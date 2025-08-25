// global variables from rates.js file are accessible because of html <script> tag

// static containers
const billCalculatorForm = document.getElementById('bill-calculator-form');
const calculationResultDiv = document.getElementById('calculation-result-div');

// conditional trigger elements
const yearSelectMenu = document.querySelector("[name='year-select-menu");
const recycledWaterServiceSelectMenu = document.querySelector("[name='recycled-water-service-select-menu']");
const privateFireConnectionSelectMenu = document.querySelector("[name='private-fire-connection-select-menu']");

// conditional containers
const ccfBilledForRecycledWaterContainer = document.getElementById('ccf-billed-for-recycled-water-container');
const privateFireConnectionSizeContainer = document.getElementById('private-fire-connection-size-container');

// calculation elements
const meterSizeSelectMenu = document.querySelector("[name='meter-size-select-menu']");
const ccfBilledForPotableWaterInput = document.getElementById('ccf-billed-for-potable-water-input');
const ccfBilledForRecycledWaterInput = document.getElementById('ccf-billed-for-recycled-water-input');
const privateFireConnectionSizeSelectMenu = document.querySelector("[name='private-fire-connection-size-select-menu']");

const data = {
    meterSize: '',
    ccfBilledForPotableWater: 0,
    ccfBilledForRecycledWater: 0,
    privateFireConnectionSize: '',
    year: +yearSelectMenu.value, // defaulted to HTML default value and converted to a number
};

const resetAllData = () => {
    for (const key in data) {
        const value = data[key];
        if (key === 'year') data[key] = 2024;
        else if (typeof value === 'string') data[key] = '';
        else if (typeof value === 'number') data[key] = 0;
    }
};

const resetTargetData = (resetKey, resetValue, element) => {
    data[resetKey] = resetValue;
    element.value = '';
};

const roundToNthDecimalPlace = (number, decimalPlaces) => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(number * factor) / factor;
};

const calculate = (event) => {
    const meterCharge = data.meterSize ? fixedMonthlyMeterChargesPotable[data.meterSize][data.year] : 0;
    const infrastructureCharge = data.meterSize ? fixedMonthlyInfrastructureCharges[data.meterSize][data.year] : 0;
    const privateFireConnectionSizeCharge = data.privateFireConnectionSize ? fixedMonthlyPrivateFireCharges[data.privateFireConnectionSize][data.year] : 0;
    
    const potableWaterVolumetricRateCharge = +data.ccfBilledForPotableWater * volumetricRatesPotable[data.year];
    const recycledWaterVolumetricRateCharge = +data.ccfBilledForRecycledWater * volumetricRatesRecycled[data.year];
    
    const wrdGroundwaterAssessmentCharge = +data.ccfBilledForPotableWater * 1.02;

    const bill = meterCharge 
    + infrastructureCharge 
    + potableWaterVolumetricRateCharge 
    + wrdGroundwaterAssessmentCharge 
    + recycledWaterVolumetricRateCharge 
    + privateFireConnectionSizeCharge;
    
    // uncomment to view data in tabular format
    // console.table(data);

    if (event.type !== 'reset' && !isNaN(bill)) {
        return roundToNthDecimalPlace(bill, 2).toFixed(2);
    } else {
        resetAllData();
        return 0;
    }
};

const showContainer = (container, show) => {
    if (container && show) container.setAttribute('style', 'display: flex;');
    else if (container && !show) container.setAttribute('style', 'display: none;');
};

// coerce and redirect form data
const controller = (eventKey, event) => {
    const value = event?.currentTarget.value;

    const isNumber = !isNaN(value); 
    const booleanValue = value?.toLowerCase() === 'true';

    if (isNumber) data[eventKey] = +value;
    else if (eventKey === 'recycledWaterService') {
        showContainer(ccfBilledForRecycledWaterContainer, booleanValue);
        resetTargetData('ccfBilledForRecycledWater', 0, ccfBilledForRecycledWaterInput);
    } else if (eventKey === 'privateFireConnection') {
        showContainer(privateFireConnectionSizeContainer, booleanValue);
        resetTargetData('privateFireConnectionSize', 0, privateFireConnectionSizeSelectMenu)
    }  else data[eventKey] = value;

    const calculation = calculate(event);
    calculationResultDiv.innerText = `$${calculation}`;
};

billCalculatorForm.addEventListener('reset', (event) => controller('billCalculatorForm', event));

meterSizeSelectMenu.addEventListener('change', (event) => controller('meterSize', event));

ccfBilledForPotableWaterInput.addEventListener('input', (event) => controller('ccfBilledForPotableWater', event));

recycledWaterServiceSelectMenu.addEventListener('change', (event) => controller('recycledWaterService', event));
ccfBilledForRecycledWaterInput.addEventListener('input', (event) => controller('ccfBilledForRecycledWater', event));

privateFireConnectionSelectMenu.addEventListener('change', (event) => controller('privateFireConnection', event));
privateFireConnectionSizeSelectMenu.addEventListener('input', (event) => controller('privateFireConnectionSize', event));

yearSelectMenu.addEventListener('change', (event) => controller('year', event));
