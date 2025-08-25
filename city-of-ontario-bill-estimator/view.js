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