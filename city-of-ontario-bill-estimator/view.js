/**
 * @fileoverview
 * NOTE: variables from JavaScript files are globally accessible because of the placement of the <script> tags at the end of index.html 
 * 
 * responsible for the visible side of the program
 */

let userFormData = new Map();

const insertedTemplates = new Set();

const years = [2025, 2026, 2027];

const customerData = {
  customerClass: '',
  customerGroup: '',
}

const fieldFinderMenu = document.getElementById('field-finder-menu');
const fieldFinderImage = document.getElementById('field-finder-image');
const fieldFinderFigure = document.getElementById('field-finder-figure');
const fieldFinderImageCaption = document.getElementById('field-finder-image-caption');

const billEstimatorTypeMenu = document.querySelector('[name="bill-estimator-type-menu"]');
const formAndTableContainer = document.getElementById('form-and-table-container');

const billEstimatorForm = document.getElementById('bill-estimator-form');
const billEstimatorFormFieldset = document.querySelector('fieldset');
const billEstimatorFormLegend = document.querySelector('legend');
const billEstimatorFormAndBillTable = document.getElementById('form-and-table-container');

const customerClassMenu = document.getElementById('customer-class');

const dedicatedFireLineIncluded = document.querySelector('[name="dedicated-fire-line-included"]');
const dedicatedFireLineChargeElements = document.querySelectorAll('.dedicated-fire-line-size-elements');

const scoutingServiceIncluded = document.querySelector('[name="scouting-service-included"]');
const scoutingServiceChargeElements = document.querySelectorAll('.scouting-service-charge-elements');

const ieuaChargeElements = document.querySelector('.ieua-charge-elements')

const billTable = document.querySelector('table');
const billTableBody = document.querySelector('tbody');
const billTableFooter = document.querySelector('tfoot');
const billTableFooterRow = document.getElementById('bill-table-footer-row');
const billTableTemplateRow = document.getElementById('bill-table-template-row');
const billTableCaption = document.querySelector('caption');
const templateChargeBreakdown = document.getElementById('template-charge-breakdown');

const multiInputFieldNames = {
  'dedicated-fire-line-sizes': {
    assignedFieldName: 'dedicated-fire-line-sizes',
    template: document.getElementById('template-dedicated-fire-line-size-elements'),
    rateOrChargeFieldName: '',
  },
  'meter-types-and-sizes': {
    assignedFieldName: 'meter-types-sizes-and-usages',
    template: document.getElementById('template-meter-type-and-size-elements'),
    rateOrChargeFieldName: 'current-ccf-usages',
  },
  'sewer-base-charges': {
    assignedFieldName: 'sewer-base-and-ieua-charges',
    template: document.getElementById('template-sewer-base-and-ieua-charge-elements'),
    rateOrChargeFieldName: 'inland-empire-utilities-agency-charges',
  },
  'stormwater-base-charges': {
    assignedFieldName: 'stormwater-base-charges',
    template: document.getElementById('template-stormwater-base-charge-elements'),
    rateOrChargeFieldName: '',
  },
  'waste-bin-types-and-sizes': {
    assignedFieldName: 'waste-bin-types-sizes-and-pickups',
    template: document.getElementById('template-waste-bin-type-and-size-elements'),
    rateOrChargeFieldName: 'weekly-pickups',
  },
}

const setFormData = (event) => {
    const freshFormData = new FormData(event?.currentTarget);
    const formDataEntries = Array.from(freshFormData.entries());
    const typedFormData = new Map();
    const repeatingKeys = new Set();
    
    for (const [key, value] of formDataEntries) {
      if (!typedFormData.has(key)) typedFormData.set(key, getTypedValue(value));
      else repeatingKeys.add(key);
    }

    Array.from(repeatingKeys.keys()).forEach((repeatingKey) => {
        const value = freshFormData.getAll(repeatingKey);
        typedFormData.set(repeatingKey, getTypedValue(value));
    });

    for (const fieldName in multiInputFieldNames) {
      const multiInputFieldDetails = multiInputFieldNames[fieldName];
      const typedFormDataMainValue = typedFormData.get(fieldName);
      if (!typedFormDataMainValue) continue;
      const typeFormDateSecondaryValue = typedFormData.get(multiInputFieldDetails.rateOrChargeFieldName);

      
      const multiInputFieldValues = Array.isArray(typedFormDataMainValue) ? typedFormDataMainValue : [typedFormDataMainValue];
      const ratesOrCharges = Array.isArray(typeFormDateSecondaryValue) ? typeFormDateSecondaryValue : [typeFormDateSecondaryValue];

      const multiInputCombinedFieldValues = [];
      multiInputFieldValues.forEach((fieldValue, index) => {
        const [type, size] = isString(fieldValue) ? fieldValue.split('|') : [];
        const rateOrCharge = ratesOrCharges[index];

        if (type && size) multiInputCombinedFieldValues.push({ type, size, rateOrCharge });
        else multiInputCombinedFieldValues.push({ type: fieldName, rateOrCharge: [fieldValue, ...(rateOrCharge ? [rateOrCharge] : [])]});
      });

      typedFormData.set(multiInputFieldDetails.assignedFieldName, multiInputCombinedFieldValues);
    }

    const billingCycleStart = typedFormData.get('billing-cycle-start');
    const billingCycleEnd = typedFormData.get('billing-cycle-end');
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const billingCyclePeriod = (Math.abs(billingCycleEnd - billingCycleStart) / millisecondsInADay) + 1;
    typedFormData.set('billing-cycle-period', billingCyclePeriod);

    userFormData = typedFormData;
}

const normalizeElements = (input) => {
  if (!input) return [];
  if (input instanceof HTMLElement) return [input];
  if (input instanceof NodeList || input instanceof HTMLCollection) return Array.from(input);
  if (Array.isArray(input)) return input.filter((element) => element instanceof HTMLElement);
  return [];
}

/**
 * Toggles visibility of one or more HTML elements.
 *
 * @param {HTMLCollection | HTMLElement} elements - Element(s) to show or hide.
 * @param {boolean[] | boolean} booleans - Array controlling visibility per element, or a single boolean applied to all.
 * @param {boolean} condition - Combined with each boolean to determine visibility.
 *
 * When passed more than one element to remove, elements are removed from the document flow but remain in the DOM to preserve references. 
 * Due to this, be cautious with form elements (e.g. `required` inputs), as hidden fields may still trigger validation errors. It's safer
 * to group them in one conditionally rendered parent element than separate non-adjacent elements.
 */
const showElement = (elements, booleans, condition = true) => {
  const elementsArray = normalizeElements(elements);
  const booleansArray = Array.isArray(booleans) ? booleans : Array(elementsArray.length).fill(booleans);
  const removeNotHide = elementsArray.length === 1;

  elementsArray.forEach((element, index) => {
    const shouldShow = booleansArray[index] && condition;
    
    if (!element._originalParent) {
      element._originalParent = element.parentElement;
      element._placeholder = document.createComment('placeholder');
      element.parentElement.insertBefore(element._placeholder, element);
    };

    const parent = element._originalParent;
    const elementIsInsideParent = parent.contains(element);
    const placeholderIsInsideParent = parent.contains(element._placeholder);
    
    element.style.display = shouldShow ? '' : 'none';
    
    if (shouldShow && !elementIsInsideParent && placeholderIsInsideParent) parent.insertBefore(element, element._placeholder);
    else if (shouldShow && !elementIsInsideParent && !placeholderIsInsideParent) parent.appendChild(element, element._placeholder);
    else if (!shouldShow && elementIsInsideParent && removeNotHide) parent.removeChild(element);
  });
}

const clearContainer = (container) => {
    if (container && container instanceof HTMLElement) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
}

const populateTable = () => {
    if (years.length !== yearlyCosts.length) return console.error('Could not populate table.');

    const templateRowClone = billTableTemplateRow.content.cloneNode(true);
    const templateRowCloneCellData = templateRowClone.querySelectorAll('td');

    years.forEach((_, index) => {
        templateRowCloneCellData[index].innerText = formatCost(yearlyCosts[index]);
    });

    billTableBody.appendChild(templateRowClone);
}

const populateChargeBreakdowns = () => {
    const chargeEntries = Object.entries(equations);
    
    chargeEntries.forEach(([category, equationGroup]) => {
        const templateChargeBreakdownClone = templateChargeBreakdown.content.cloneNode(true);
        const templateChargeBreakdownCloneHeader = templateChargeBreakdownClone.querySelector('summary');
        const templateChargeBreakdownCloneParagraph = templateChargeBreakdownClone.querySelector('p');
        
        const year = category.split(' ')[0];
        billTableCaption.innerText = `${customerData.customerClass} Charge Breakdown`;
        templateChargeBreakdownCloneHeader.setAttribute('aria-label', year !== '2024' ? `${year} charge breakdown` : 'current charge breakdown');

        equationGroup.forEach((equation, index) => {
            if (index > 0) templateChargeBreakdownCloneParagraph.innerHTML += '<br><br>';
            templateChargeBreakdownCloneParagraph.appendChild(document.createTextNode(equation));
        });

        billTableFooterRow.appendChild(templateChargeBreakdownClone);
    });

    billTableFooter.appendChild(billTableFooterRow);
}

const insertAfter = (newNode, referenceNode) => {
  if (!(newNode && referenceNode)) return;
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

const updateContainerStyleOnScroll = (container) => {
  const scrollHeight = 150; // This must match the .scroll-wrapper CSS class' max-height value
  if (container.scrollHeight > scrollHeight) container.classList.add('overflow');
  else container.classList.remove('overflow');
}

const modifyDynamicFormFieldText = () => {
  const isSingleFamily = customerData.customerClass === 'Single-Family';

  for (const waterUsageLabelText of document.querySelectorAll('.water-usage-label-text')) {
    if (isSingleFamily) waterUsageLabelText.innerText = 'Total Water Usage (HCF):';
    else waterUsageLabelText.innerText = 'Meter Water Consumption (HCF):';
  }
};

const handleFormFields = (button) => {
  try {
    if (!button) {
      if (!insertedTemplates.size) {
        for (const [key, { template }] of Object.entries(multiInputFieldNames)) {

          const templateParent = template.parentElement;
          const templateClone = template.content.cloneNode(true);
          templateParent.appendChild(templateClone);
          insertedTemplates.add(key)
        }
        modifyDynamicFormFieldText();
      }
      return;
    }

    const buttonParent = button.parentElement;
    const buttonGrandparent = buttonParent.parentElement;

    const { fieldName, action } = button.dataset;
    const currentFieldCount = document.querySelectorAll(`[name="${fieldName}"]`).length;
    const remove = !action && currentFieldCount >= 2;

    const template = multiInputFieldNames[fieldName].template;
    if (action && template) buttonGrandparent.append(template.content.cloneNode(true));
    else if (remove) showElement(buttonParent, false);

    modifyDynamicFormFieldText();
    updateContainerStyleOnScroll(buttonGrandparent);

    return;
  } catch (error) {
    console.error(error);
  }
}

formAndTableContainer.addEventListener('click', (event) => {
  const element = event.target;
  if (element.tagName === 'BUTTON' && element.dataset.fieldName) handleFormFields(element);
});

fieldFinderMenu.addEventListener('change', (event) => {
  const selectMenu = event?.currentTarget;
  const selectMenuOption = selectMenu.options[selectMenu.selectedIndex];
  const selectMenuValue = selectMenu.value;
  const selectMenuCaption = selectMenuOption.dataset.caption;
  const selectMenuText = selectMenuOption.text;

  showElement([fieldFinderFigure], true, selectMenuValue);

  if (selectMenuValue) {
    fieldFinderImage.src = selectMenuValue;
    fieldFinderImage.alt = selectMenuText;
    fieldFinderImageCaption.innerText = selectMenuCaption || selectMenuText;
  }
});

billEstimatorTypeMenu.addEventListener('change', (event) => {
    try {
      const selectMenu = event?.currentTarget;
      const selectedMenuOption = selectMenu.options[selectMenu.selectedIndex];
      
      const customerGroupValue = selectedMenuOption.dataset.group;
      const customerClassValue = selectMenu.value;
      customerData.customerGroup = customerGroupValue;
      customerData.customerClass = customerClassValue;

      if (customerClassValue) billEstimatorFormLegend.innerText = `${customerClassValue} Bill Estimator`;
      
      handleFormFields();
      showElement([billEstimatorForm, billTable], [true, true], customerGroupValue && customerClassValue);
      showElement(ieuaChargeElements, true, customerClassValue !== 'Single-Family');
      showElement(document.querySelectorAll('[data-action]'), true, customerClassValue !== 'Single-Family');
      modifyDynamicFormFieldText();
    } catch (error) {
        console.error(error);
    }
});

billEstimatorForm.addEventListener('submit', (event) => {
    try {
        event.preventDefault();

        setFormData(event);

        years.forEach((year) => calculateBill(year));

        clearContainer(billTableBody);
        clearContainer(billTableFooterRow);

        populateTable();
        populateChargeBreakdowns();

        resetYearlyCosts();
        resetEquations();
    } catch (error) {
        console.error(error);
    }
});

billEstimatorForm.addEventListener('reset', (event) => {
  event.preventDefault();
  window.location.reload();
});

dedicatedFireLineIncluded.addEventListener('change', (event) => {
    try {
        const dedicatedFireLineIsIncluded = event?.target.value === 'true';
        showElement(dedicatedFireLineChargeElements, true, dedicatedFireLineIsIncluded);
    } catch (error) {
        console.error(error);
    }
});

scoutingServiceIncluded.addEventListener('change', (event) => {
    try {
        const scoutingServiceIsIncluded = event?.target.value === 'true';
        showElement(scoutingServiceChargeElements, true, scoutingServiceIsIncluded);
    } catch (error) {
        console.error(error);
    }
});

/**
 ********************* TESTING *********************
*/
 
const testCases = [
  {
    expected: 2994.62,
    customerGroup: 'Non-Residential',
    customerClass: 'Commercial',
    formData: {
      'billing-cycle-start': '2025-03-18',
      'billing-cycle-end': '2025-04-16',
      'current-ccf-usages': '150',
      'sewer-base-charges': '211.50',
      'meter-types-and-sizes': 'Water|2"',
      'inland-empire-utilities-agency-charges': '387.47',
      'stormwater-base-charges': '2.66',
      'waste-bin-types-and-sizes': ['Organics|2 YD', 'Recycling|3 YD', 'Refuse|4 YD', 'Refuse|4 YD'],
      'weekly-pickups': ['2', '2', '1', '6'],
      'scouting-service-included': 'false',
      'scouting-service-charge': '',
      'dedicated-fire-line-included': 'false',
      'dedicated-fire-line-sizes': '',
    }
  },
  {
    expected: 1143.09,
    customerGroup: 'Non-Residential',
    customerClass: 'Industrial',
    formData: {
      'billing-cycle-start': '2025-03-18',
      'billing-cycle-end': '2025-04-16',
      'current-ccf-usages': '15',
      'sewer-base-charges': '21.15',
      'meter-types-and-sizes': 'Water|3"',
      'inland-empire-utilities-agency-charges': '27.11',
      'stormwater-base-charges': '7.30',
      'waste-bin-types-and-sizes': ['Recycling|1.5 YD', 'Organics|32 Gal', 'Refuse|4 YD', 'Refuse|4 YD'],
      'weekly-pickups': ['1', '1', '1', '2'],
      'scouting-service-included': 'false',
      'scouting-service-charge': '',
      'dedicated-fire-line-included': 'false',
      'dedicated-fire-line-sizes': '',
    }
  },
  { /** CUSTOM: NOT DERIVED FROM A SAMPLE BILL */
    expected: 1201.13,
    customerGroup: 'Non-Residential',
    customerClass: 'Industrial',
    multiInputTriggerFieldNames: [['dedicated-fire-line-included', 'true']],
    formData: {
      'billing-cycle-start': '2025-03-18',
      'billing-cycle-end': '2025-04-16',
      'current-ccf-usages': '15',
      'sewer-base-charges': '21.15',
      'meter-types-and-sizes': 'Water|3"',
      'inland-empire-utilities-agency-charges': '27.11',
      'stormwater-base-charges': '7.30',
      'waste-bin-types-and-sizes': ['Recycling|1.5 YD', 'Organics|32 Gal', 'Refuse|4 YD', 'Refuse|4 YD'],
      'weekly-pickups': ['1', '1', '1', '2'],
      'scouting-service-included': 'false',
      'scouting-service-charge': '',
      'dedicated-fire-line-included': 'true',
      'dedicated-fire-line-sizes': ['Private Fire Line|2"', 'Private Fire Line|6"'],
    }
  },
  {
    expected: 1034.95,
    customerGroup: 'Residential',
    customerClass: 'Multi-Family',
    formData: {
      'billing-cycle-start': '2025-03-17',
      'billing-cycle-end': '2025-04-16',
      'current-ccf-usages': ['43', '22'],
      'sewer-base-charges': ['68.40', '68.40'],
      'meter-types-and-sizes': ['Water|1"', 'Water|1"'],
      'inland-empire-utilities-agency-charges': ['104.10', '104.10'],
      'stormwater-base-charges': ['2.36', '1.81'],
      'waste-bin-types-and-sizes': ['Recycling|1.5 YD', 'Organics|32 Gal', 'Refuse|4 YD'],
      'weekly-pickups': ['1', '1', '1'],
      'scouting-service-included': 'true',
      'scouting-service-charge': '41.13',
      'dedicated-fire-line-included': 'false',
      'dedicated-fire-line-sizes': '',
    }
  },
  {
    expected: 161.35,
    customerGroup: 'Residential',
    customerClass: 'Single-Family',
    formData: {
      'billing-cycle-start': '2025-03-17',
      'billing-cycle-end': '2025-04-16',
      'current-ccf-usages': '16',
      'sewer-base-charges': '14.18',
      'meter-types-and-sizes': 'Water|5/8"',
      'inland-empire-utilities-agency-charges': '24.79',
      'stormwater-base-charges': '1',
      'waste-bin-types-and-sizes': 'Refuse|96 Gal',
      'weekly-pickups': '1',
      'scouting-service-included': 'false',
      'scouting-service-charge': '',
      'dedicated-fire-line-included': 'false',
      'dedicated-fire-line-sizes': '',
    }
  }
];

async function runAllSimulations() {
  const results = [];

  for (const [i, testCase] of testCases.entries()) {
    console.log(`🔄 Running Test Case #${i + 1}`);

    /** 🧹 Step 0: Clear leftover dynamic fields from previous test */
    Object.entries(testCase.formData).forEach(([key, value]) => {
      const allFields = document.querySelectorAll(`[name="${key}"]`);
      if (allFields.length > 1) {
        const removeButtons = document.querySelectorAll(`button[data-action=""][data-field-name="${key}"]`);
        for (let i = allFields.length - 1; i > 0; i--) {
          removeButtons[i - 1]?.click();
        }
      }
    });

    customerData.customerGroup = testCase.customerGroup;
    customerData.customerClass = testCase.customerClass;
    billEstimatorTypeMenu.value = testCase.customerClass;
    const multiInputTriggerFieldNames = testCase.multiInputTriggerFieldNames;
    handleFormFields();

    /** Step 1: Conditionally displayed multi inputs need to have their 
     * accompanying element selected before the append buttons are clicked
     */
    if (Array.isArray(multiInputTriggerFieldNames)) {
      multiInputTriggerFieldNames.forEach(([multiInputTriggerFieldName, value]) => {
        const multiInputTrigger = document.querySelector(`[name="${multiInputTriggerFieldName}"]`);
        if (!multiInputTrigger) return;

        if (multiInputTrigger.tagName === "SELECT") {
          multiInputTrigger.value = value;
          multiInputTrigger.dispatchEvent(new Event("change", { bubbles: true }));
        } else if (multiInputTrigger.type === "checkbox" || multiInputTrigger.type === "radio") {
          multiInputTrigger.checked = multiInputTrigger.value == value;
          multiInputTrigger.dispatchEvent(new Event("change", { bubbles: true }));
          multiInputTrigger.dispatchEvent(new Event("click", { bubbles: true }));
        } else {
          multiInputTrigger.value = String(value);
          multiInputTrigger.dispatchEvent(new Event("input", { bubbles: true }));
        }
      });
    }

    // Step 2: Add dynamic inputs if needed
    Object.entries(testCase.formData).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 1) {
        const addButton = document.querySelector(`button[data-action="append"][data-field-name="${key}"]`);
        if (!addButton) return;
        
        const existingFields = document.querySelectorAll(`[name="${key}"]`);
        const needed = value.length - existingFields.length;
        
        for (let i = 0; i < needed; i++) {
          addButton.click();
        }
      }
    });

    // Step 3: Assign values to all inputs
    Object.entries(testCase.formData).forEach(([key, value]) => {
      const elements = document.querySelectorAll(`[name="${key}"], #${key}`);
      elements.forEach((el, idx) => {
        const val = Array.isArray(value) ? value[idx] : value;
        if (el.tagName === "SELECT") el.value = val;
        else if (el.type === "checkbox" || el.type === "radio") el.checked = el.value == val;
        else el.value = String(val);
      });
    });

    // Submit the form and wait
    const form = document.querySelector("form");
    if (form) {
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      await new Promise(r => setTimeout(r, 300));
    }

    // Parse and compare result
    const resultEl = document.querySelector("tbody tr td");
    const actualText = resultEl?.textContent?.trim()?.replace(/[^0-9.]/g, '') || "";
    const actual = parseFloat(actualText);
    const match = Math.abs(actual - testCase.expected) < 0.01;

    results.push({
      case: `${i + 1}: ${testCase.customerClass}`,
      expected: testCase.expected,
      actual,
      match
    });
  }

  console.table(results);
}

// **Button Click Event to Run Simulation**
const testFunctionsButton = document.getElementById('test-functions-button');
testFunctionsButton.addEventListener('click', runAllSimulations);