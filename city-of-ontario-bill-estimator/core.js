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

/**
 * @param {Number} tierStart
 * @param {Number} tierEnd
 * @param {Number} currentBillingUnitUsage
 * 
 * Calculates how many units fall within the current billing tier.
 *
 * It first takes the minimum of `currentBillingUnitUsage` and `tierEnd`, ensuring that:
 * - only the actual used units are considered
 * - they don’t exceed the upper bound of the tier
 *
 * Then it subtracts `tierStart` from that value to get the number of units specific to this tier.
 * 
 * This effectively locks in the tier width and ensures no overlap with previous tiers, since `tierStart`
 * is always equal to the previous tier’s `tierEnd`.
 */
const getBillableUnitsAtTier = (tierStart, tierEnd, currentBillingUnitUsage) => {
  const billableUnits = Math.min(currentBillingUnitUsage, tierEnd) - tierStart;
  const roundedBillableUnits = billableUnits > 0 ? roundToNthPlace(billableUnits, 0, true, 'Gaussian') : 0;
  return roundedBillableUnits;
};

const getTierChargeTotal = (year, billingTiers, customerType) => {
  const billingTiersEntries = Object.entries(billingTiers);

  const tierBillingCosts = billingTiersEntries.map(([tier, units]) => {
    const tierRate = waterVariableRates[year][customerType][tier];
    if (tierRate) return calcAndLog`${getTitle(year)} ${tier}: Rate (${tierRate}) * Usage (${units} CCF)`;
    else return 0;
  });

  return getArraySum(tierBillingCosts);
}

const getVariableWaterCharge = (year, valueObject) => {  
  const billingTiers = { 'Tier 1': 0, 'Tier 2': 0, 'Tier 3': 0 };

  const { type, rateOrCharge } = valueObject;

  let customerType = '';
  
  const isWater = type === 'Water';
  const isSingleFamily = customerData.customerClass === 'Single-Family';
  
  if (isSingleFamily && isWater) {
    const [indoorWaterCCFBudget, totalWaterBudget] = [10, 18];
    billingTiers['Tier 1'] = getBillableUnitsAtTier(0, indoorWaterCCFBudget, rateOrCharge);
    billingTiers['Tier 2'] = getBillableUnitsAtTier(indoorWaterCCFBudget, totalWaterBudget, rateOrCharge);
    billingTiers['Tier 3'] = getBillableUnitsAtTier(totalWaterBudget, Infinity, rateOrCharge);
    customerType = customerData.customerClass;
  } else {
    billingTiers['Tier 1'] = getBillableUnitsAtTier(0, Infinity, rateOrCharge);
    customerType = isWater ? 'Non-Single-Family' : type;
  }

  return getTierChargeTotal(year, billingTiers, customerType);
};

const getCharge = (year, utility) => {
    try {
      if (utility === 'Water') {
        return getArraySum(userFormData.get('meter-types-sizes-and-usages').map(({ type, size, rateOrCharge }, index) => {
          return calcAndLog`${getTitle(year)} ${type} Meter ${getString(index + 1)}: Variable Rate ($${getVariableWaterCharge(year, { type, size, rateOrCharge })}) + ${size} Meter Charge ($${waterFixedCharges[year][size]})`;
        }));
      }

      if (utility === 'Sewer') {
        const billingAnchorYear = userFormData.get('billing-cycle-start').getFullYear();

        return getArraySum(userFormData.get('sewer-base-and-ieua-charges').map(({ rateOrCharge }, index) => {
          const customerKey = customerData.customerGroup === 'Non-Residential' ? customerData.customerGroup : customerData.customerClass;
          const [sewerBaseCharge, ieuaCharge] = rateOrCharge;
          const adjustedIEUACharge = customerData.customerClass === 'Single-Family' ? ieuaCharges[year] : ieuaCharge;
          const unitCount = sewerBaseCharge / sewerVariableRates[billingAnchorYear][customerKey];
          const livingUnitTitle = unitCount ? 'Living Unit' : 'Living Units';
          const unitType = customerData.customerGroup === 'Residential' ? livingUnitTitle : 'HCF';
          return calcAndLog`${getTitle(year)} Sewer Rate ${getString(index + 1)} ($${sewerVariableRates[year][customerKey]}) * (${unitCount} ${unitType}) + IEUA Charge ($${adjustedIEUACharge})`;
        }));
      }

      if (utility === 'Stormwater') return getArraySum(userFormData.get('stormwater-base-charges').map(({ rateOrCharge }) => getArraySum(rateOrCharge)));

      if (utility === 'Solid Waste') {
        const uniqueContainers = new Set();
        let scoutingServiceChargeAdded = false;
        
        return getArraySum(userFormData.get('waste-bin-types-sizes-and-pickups').map(({ type, size, rateOrCharge }, index) => {
          const typeSizeRateKey = Object.values({ type, size, rateOrCharge }).join();
          const isUniqueContainer = !uniqueContainers.has(typeSizeRateKey);
          uniqueContainers.add(typeSizeRateKey);
          
          const customerKey = customerData.customerClass === 'Single-Family' ? `${customerData.customerClass} ${type}` : `Non-Single-Family ${type}`;

          const baseCharge = isUniqueContainer ? solidWasteVariableRates[year][size][customerKey] : solidWasteAdditionalContainerRates[year][size][customerKey];          
          const additionalPickupRate = solidWasteAdditionalPickupRates[year][customerKey][size];
          const additionalPickups = rateOrCharge - 1;

          if (customerData.customerClass !== 'Single-Family') {
            const additionalContainerTitle = isUniqueContainer ? '' : '[Additional Container] ';
            const scoutingServiceCharge = userFormData.get('scouting-service-included') ? userFormData.get('scouting-service-charge') : 0;

            if (!scoutingServiceChargeAdded && scoutingServiceCharge) {
              scoutingServiceChargeAdded = true;
              return calcAndLog`${getTitle(year)} ${customerKey} ${getString(index + 1)}: ${additionalContainerTitle}${size} Charge ($${baseCharge}) + Additional Pickup Rate ($${additionalPickupRate}) * Additional Pickups (${additionalPickups}) + Scouting Service (${scoutingServiceCharge})`;
            } else {
              return calcAndLog`${getTitle(year)} ${customerKey} ${getString(index + 1)}: ${additionalContainerTitle}${size} Charge ($${baseCharge}) + Additional Pickup Rate ($${additionalPickupRate}) * Additional Pickups (${additionalPickups})`;
            }
          }
          
          return calcAndLog`${getTitle(year)} ${customerKey} ${getString(index + 1)}: ${size} Charge ($${baseCharge}) + Additional Pickup Rate ($${additionalPickupRate}) * Additional Pickups (${additionalPickups})`;
        }));
      }
      
      if (utility === 'Private Fire') {
        const dedicatedFireLineCharges = userFormData.get('dedicated-fire-line-sizes');
        if (!dedicatedFireLineCharges) return 0;
        return getArraySum(userFormData.get('dedicated-fire-line-sizes').map(({ type, size }, index) => calcAndLog`${getTitle(year)} ${type} ${size} Meter ${getString(index + 1)} Charge ($${dedicatedFireLineFixedCharges[year][size]})`));
      }
    } catch (error) {
      console.error(error);
    }
}

const calculateBill = (year) => {
    try {
      const totalCharge = calcAndLog`${getTitle(year)} Total: Water ($${getCharge(year, 'Water')}) + Sewer ($${getCharge(year, 'Sewer')}) + Stormwater ($${getCharge(year, 'Stormwater')}) + Solid Waste ($${getCharge(year, 'Solid Waste')}) + Private Fire ($${getCharge(year, 'Private Fire')})`;
      yearlyCosts.push(totalCharge);
    } catch (error) {
        console.error(error);
    }
}