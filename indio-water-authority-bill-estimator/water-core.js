/**
 * @fileoverview
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

const getResidentialWaterBudget = (year) => {
  const is2024 = year === 2024;

  const gallonsPerPersonPerDayAllotment = is2024 ? 62.5 : 47;
  const defaultHouseholdSize = residentialDefaultHouseholdSizes[year][userFormData.get('customer-class')];
  const gallonsInABillingUnit = 748;

  const oldTotalBudgetBillingUnits = userFormData.get('current-billing-units-total-water-budget');
  const oldIndoorWaterBudgetBillingUnits = userFormData.get('tier-1-billing-units-water-usage');

  const indoorWaterBudgetBillingUnits = calcAndLog`${getTitle(year)} Indoor (Tier 1) Budget: Default Household Size Based on Customer Class (${defaultHouseholdSize}) * Daily Water Allowance per Person (${gallonsPerPersonPerDayAllotment} Gallons) * Billing Cycle Length (${userFormData.get('current-billing-cycle-days')} Days) / Billing Unit (${gallonsInABillingUnit} Gallons) * Dwelling Units (${userFormData.get('dwelling-units') || 1})=||[CCF]`;
  const outdoorWaterBudgetBillingUnits = calcAndLog`${getTitle(year)} Outdoor (Tier 2) Budget: Current Total Water Budget (${oldTotalBudgetBillingUnits} CCF) - Current Indoor Water Budget (${oldIndoorWaterBudgetBillingUnits} CCF)=||[CCF]`;
  const totalWaterBudget = calcAndLog`${getTitle(year)} Total Water Budget: Indoor Water Budget (${indoorWaterBudgetBillingUnits} CCF) + Outdoor Water Budget (${outdoorWaterBudgetBillingUnits} CCF)=||[CCF]`;
  return { indoorWaterBudgetBillingUnits, outdoorWaterBudgetBillingUnits, totalWaterBudget };
}

const getTierChargeTotal = (year, billingTiers) => {
  const billingTiersEntries = Object.entries(billingTiers);

  const tierBillingCosts = billingTiersEntries.map(([tier, units]) => {
    const tierRate = variableRates[year][customerData.customerClassGroup][tier];
    if (tierRate) return calcAndLog`${getTitle(year)} ${tier}: Rate (${tierRate}) * Usage (${units} CCF)`;
    else return 0;
  });

  return getArraySum(tierBillingCosts);
}

/**
 * This takes the minimum between the `currentBillingUnitUsage` and `tierEnd`.
 * Thus, the maximum amount of billable units is set at `tierEnd`. Then,
 * `tierStart` is subtracted from that minimum, effectively fixing the tier width.
 * This ensures units are not charged for any tiers that may precede this tier 
 * since `tierStart` equals the previous tier's `tierEnd`.
 */
const getBillableUnitsAtTier = (tierStart, tierEnd) => {
  const currentBillingUnitUsage = userFormData.get('current-billing-units-water-usage');
  const billableUnits = Math.min(currentBillingUnitUsage, tierEnd) - tierStart;
  const roundedBillableUnits = billableUnits > 0 ? roundToNthPlace(billableUnits, 0, true, 'Gaussian') : 0;
  return roundedBillableUnits;
};

const getVariableWaterCharge = (year) => {  
  const billingTiers = { 'Tier 1': 0, 'Tier 2': 0, 'Tier 3': 0, 'Tier 4': 0, 'Tier 5': 0 };
  const currentBillingUnits = userFormData.get('current-billing-units-water-usage');

  if (customerData.customerClassGroup === 'Residential') {
    const { indoorWaterBudgetBillingUnits, totalWaterBudget } = getResidentialWaterBudget(year);

    if (year === 2024) {
      billingTiers['Tier 1'] = getBillableUnitsAtTier(0, indoorWaterBudgetBillingUnits);
      billingTiers['Tier 2'] = getBillableUnitsAtTier(indoorWaterBudgetBillingUnits, totalWaterBudget);
      billingTiers['Tier 3'] = getBillableUnitsAtTier(totalWaterBudget, totalWaterBudget * 2.00);
      billingTiers['Tier 4'] = getBillableUnitsAtTier(totalWaterBudget * 2.00, totalWaterBudget * 4.00);
      billingTiers['Tier 5'] = getBillableUnitsAtTier(totalWaterBudget * 4.00, Infinity);
    } else {
      billingTiers['Tier 1'] = getBillableUnitsAtTier(0, indoorWaterBudgetBillingUnits);
      billingTiers['Tier 2'] = getBillableUnitsAtTier(indoorWaterBudgetBillingUnits, totalWaterBudget);
      billingTiers['Tier 3'] = getBillableUnitsAtTier(totalWaterBudget, Infinity);
    }
  } else if (['Non-Residential', 'Irrigation'].includes(customerData.customerClassGroup)) {
    const tier1Budget = userFormData.get('tier-1-billing-units-water-usage');

    if (year === 2024) {
      billingTiers['Tier 1'] = getBillableUnitsAtTier(0, tier1Budget);
      billingTiers['Tier 3'] = getBillableUnitsAtTier(tier1Budget, tier1Budget * 2.00);
      billingTiers['Tier 4'] = getBillableUnitsAtTier(tier1Budget * 2.00, tier1Budget * 4.00);
      billingTiers['Tier 5'] = getBillableUnitsAtTier(tier1Budget * 4.00, Infinity);
    } else if (year !== 2024 && customerData.customerClassGroup === 'Non-Residential' && tier1Budget) {
      billingTiers['Tier 1'] = getBillableUnitsAtTier(0, currentBillingUnits);
    } else if (year !== 2024 && customerData.customerClassGroup === 'Irrigation') {
      billingTiers['Tier 1'] = getBillableUnitsAtTier(0, tier1Budget);
      billingTiers['Tier 2'] = getBillableUnitsAtTier(tier1Budget, Infinity);
    }
  }

  return getTierChargeTotal(year, billingTiers);
};

const getFixedCharge = (year) => {
  const meterSize = userFormData.get('meter-size') || deriveMeterSize(userFormData.get('base-charge'));
  return fixedCharges[year][meterSize] || 0;
}

const getCharge = (year, type) => {
    try {
      if (type === 'fixed') return getFixedCharge(year);
      else if (type === 'fire') return userFormData.get('dedicated-fire-line-included') ? (fixedDedicatedFireLineCharges[year][userFormData.get('dedicated-fire-line-meter-size')] || 0) : 0;
      else if (type === 'variable') return getVariableWaterCharge(year);
      else if (type === 'replenishment') return calcAndLog`${getTitle(year)} Replenishment: Rate (${replenishmentAssessmentCharges[year]}) * Water Used for this Period (${userFormData.get('current-billing-units-water-usage')} CCF)`;
      else if (type === 'backflow') return backflowDeviceTestingCharges[userFormData.get('backflow-device-testing')] || 0;
      else console.error('Invalid type.');
    } catch (error) {
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

const calculateBill = (year) => {
    try {
      const totalChargePreTax = calcAndLog`${getTitle(year)} Pre-Tax Total: Base ($${getCharge(year, 'fixed')}) + Replenishment ($${getCharge(year, 'replenishment')}) + Variable ($${getCharge(year, 'variable')}) + Dedicated Fire Line ($${getCharge(year, 'fire')}) + Backflow Device Testing ($${getCharge(year, 'backflow')})`;
      const taxCharge = calcAndLog`${getTitle(year)} City Tax: Rate (${cityTax[year]}) * Pre-Tax Total ($${totalChargePreTax})`;
      const totalCharge = calcAndLog`${getTitle(year)} Total: Pre-Tax Total ($${totalChargePreTax}) + City Tax ($${taxCharge})`; 
      yearlyCosts.push(totalCharge);
    } catch (error) {
        console.error(error);
    }
}