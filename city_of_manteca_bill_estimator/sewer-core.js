/**
 * NOTE: variables from JavaScript files are globally accessible because of the placement of the <script> tags at the end of index.html 
 * 
 * responsible for bill calculation
 */

const yearlyCosts = [];
let equations = {};

const resetYearlyCosts = () => yearlyCosts.length = 0;

const resetEquations = () => equations = {};

const getPerThousandUnits = (value) => {
    if (isNumber(value)) return +value / 1000;
    return value;
}

const findNewCustomerClass = () => {
    try {
        const newCustomerClasses = Object.keys(newToOldCustomerClasses);
        return newCustomerClasses.find((newCustomerClass) => newToOldCustomerClasses[newCustomerClass].includes(customerData.oldCustomerClass));
    } catch(error) {
        console.error(error);
    }
}

const getCustomerClassCharge = (year) => {
    try {
        if (year !== 2024) return sewerRates[year][findNewCustomerClass()];
        else return old2024Rates[customerData.oldCustomerClass];
    } catch(error) {
        console.error(error);
    }
}

const getIndustrialRates = (year) => {
    try {
        if (year === 2024) return old2024Rates.industrial;
        return sewerRates[year].industrial;
    } catch (error) {
        console.error(error);
    }
}

const calculateResidentialSewerBill = (year) => {
    try {
        const is2024 = year === 2024;
        const isResidentialSingleFamilyHome = customerData.oldCustomerClass === 'Residential (Single Family Home)';
        const isResidentialMultiFamilyHome = customerData.oldCustomerClass === 'Residential (Two or More Living Units)';
        const isMobileHome = customerData.oldCustomerClass === 'Mobile Home Park';

        if (isResidentialSingleFamilyHome) {
            yearlyCosts.push(calcAndLog`${getString(year)} ${customerData.customerClassGroup}: Living Units (${sewerFormData.get('fixed-living-units-input')}) * Charge ($${getCustomerClassCharge(year)})`);
        } else if (isResidentialMultiFamilyHome || isMobileHome || !is2024) {
            yearlyCosts.push(calcAndLog`${getString(year)} ${customerData.customerClassGroup}: Living Units (${sewerFormData.get('number-of-living-units-input')}) * Charge ($${getCustomerClassCharge(year)})`);
        } else {
            const consumptionPerThousandCubicFeet = getPerThousandUnits(sewerFormData.get('consumption-input'));
            yearlyCosts.push(calcAndLog`${getString(year)} ${customerData.customerClassGroup}: Consumption Per 1,000 CF (${consumptionPerThousandCubicFeet}) * Rate (${getCustomerClassCharge(year)})`);
        }
    } catch (error) {
        console.error(error);
    }
}

const calculateCommercialSewerBill = (year) => {
    try {
        const consumptionPerThousandCubicFeet = getPerThousandUnits(sewerFormData.get('consumption-input'));
        yearlyCosts.push(calcAndLog`${getString(year)} ${customerData.customerClassGroup}: Consumption Per 1000 CF (${consumptionPerThousandCubicFeet}) * Rate (${getCustomerClassCharge(year)})`);
    } catch (error) {
        console.error(error);
    }
};

const calculateIndustrialSewerBill = (year) => {
    try {
        const biologicalOxygenDemandCharge = calcAndLog`${getString(year)} ${customerData.customerClassGroup}: Biological Oxygen Demand Per Pound (${sewerFormData.get('biological-oxygen-demand-input')}) * Rate (${getIndustrialRates(year).biologicalOxygenDemandPerPoundRate})`;
        const nitrogenCharge = calcAndLog`${getString(year)} ${customerData.customerClassGroup}: Nitrogen Per Pound (${sewerFormData.get('nitrogen-input')}) * Rate (${getIndustrialRates(year).nitrogenPerPoundRate})`;
        const totalSuspendedSolidsCharge = calcAndLog`${getString(year)} ${customerData.customerClassGroup}: Total Suspended Solids Per Pound (${sewerFormData.get('total-suspended-solids-input')}) * Rate (${getIndustrialRates(year).totalSuspendedSolidsPerPoundRate})`;
        const volumeCharge = calcAndLog`${getString(year)} ${customerData.customerClassGroup}: Volume Per Million Gallons (${sewerFormData.get('volume-input')}) * Rate (${getIndustrialRates(year).volumePerMillionGallonsRate})`;

        yearlyCosts.push(calcAndLog`${getString(year)} ${customerData.customerClassGroup}: Biological Oxygen Demand ($${biologicalOxygenDemandCharge}) + Nitrogen ($${nitrogenCharge}) + Total Suspended Solids ($${totalSuspendedSolidsCharge}) + Volume ($${volumeCharge})`);
    } catch (error) {
        console.error(error);
    }
}