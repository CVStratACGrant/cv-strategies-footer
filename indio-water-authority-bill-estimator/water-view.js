/**
 * @fileoverview
 * NOTE: variables from JavaScript files are globally accessible because of the placement of the <script> tags at the end of index.html 
 * 
 * responsible for the visible side of the program
 */

let userFormData = new Map();

const years = [2024, 2025, 2026, 2027, 2028, 2029];

const customerData = {
    customerClassGroup: '',
}

const fieldFinderMenu = document.getElementById('field-finder-menu');
const fieldFinderImage = document.getElementById('field-finder-image');
const fieldFinderFigure = document.getElementById('field-finder-figure');
const fieldFinderImageCaption = document.getElementById('field-finder-image-caption');

const billEstimatorTypeMenu = document.getElementById('bill-estimator-type-menu');
const formAndTableContainer = document.getElementById('form-and-table-container');

const billEstimatorForm = document.getElementById('bill-estimator-form');
const billEstimatorFormFieldset = document.querySelector('fieldset');
const billEstimatorFormAndBillTable = document.getElementById('form-and-table-container');

const residentialInputsContainer = document.getElementById('residential-inputs-container');
const multiFamilyResidentialInputsContainer = document.getElementById('multi-family-residential-inputs');
const residentialInputs = document.getElementById('residential-inputs');
const customerClassMenu = document.getElementById('customer-class');

const meterSizeSelectMenu = document.getElementById('meter-size');
const baseChargeContainer = document.getElementById('base-charge-container');
const baseChargeLabel = document.querySelector('label[for="base-charge"]');
const baseChargeSmallText = document.getElementById('base-charge-small-text');
const baseChargeInput = document.getElementById('base-charge');

const dedicatedFireLineIncluded = document.getElementById('dedicated-fire-line-included');
const dedicatedFireLineChargeContainer = document.getElementById('dedicated-fire-line-charge-container');
const dedicatedFireLineChargeLabel = document.querySelector('[for="dedicated-fire-line-charge"]');
const dedicatedFireLineCharge = document.getElementById('dedicated-fire-line-charge');

const billTable = document.querySelector('table');
const billTableBody = document.querySelector('tbody');
const billTableFooter = document.querySelector('tfoot');
const billTableFooterRow = document.getElementById('bill-table-footer-row');
const billTableTemplateRow = document.getElementById('bill-table-template-row');
const billTableCaption = document.querySelector('caption');
const templateChargeBreakdown = document.getElementById('template-charge-breakdown');

const setFormData = (event) => {
    const freshFormData = new FormData(event?.currentTarget);
    const typedFormData = new Map();
    
    const formDataEntries = Array.from(freshFormData.entries());
    
    const repeatingKeys = new Set();
    
    for (const [key, value] of formDataEntries) {
        if (!typedFormData.has(key)) typedFormData.set(key, getTypedValue(value));
        else repeatingKeys.add(key);
    }

    [...repeatingKeys.keys()].forEach((repeatingKey) => {
        const value = freshFormData.getAll(repeatingKey);
        typedFormData.set(repeatingKey, getTypedValue(value));
    });

    typedFormData.set('dedicated-fire-line-meter-size', deriveMeterSize(typedFormData.get('dedicated-fire-line-charge'), fixedDedicatedFireLineCharges));

    userFormData = typedFormData;
}

const showContainer = (containers = [], booleans = [], parentContainer = billEstimatorFormFieldset) => {
    containers.forEach((container, index) => {
        if (booleans[index]) {
            container.setAttribute('style', 'display: "";');
            parentContainer.appendChild(container);
        } else if (parentContainer.contains(container)) {
            container.setAttribute('style', 'display: none;');
            parentContainer.removeChild(container);
        }
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
        
        const { year, description } = getEquationSections(`${category}=>${equationGroup[0]}`);
        
        billTableCaption.innerText = `${description} Charge Breakdown`;
        templateChargeBreakdownCloneHeader.setAttribute('aria-label', year !== '2024' ? `${year} charge breakdown` : 'current charge breakdown');

        equationGroup.forEach((equation, index) => {
            if (index > 0) templateChargeBreakdownCloneParagraph.innerHTML += '<br><br>';
            templateChargeBreakdownCloneParagraph.appendChild(document.createTextNode(equation));
        });

        billTableFooterRow.appendChild(templateChargeBreakdownClone);
    });

    billTableFooter.appendChild(billTableFooterRow);
}

customerClassMenu.addEventListener('change', (event) => {
    const customerClass = event?.target.value;
    if (!['', 'Single-Family'].includes(customerClass)) showContainer([multiFamilyResidentialInputsContainer], [true], residentialInputsContainer);
    else showContainer([multiFamilyResidentialInputsContainer], [false], residentialInputsContainer);
})

fieldFinderMenu.addEventListener('change', (event) => {
  const selectMenu = event?.target;
  const selectMenuOption = selectMenu.options[selectMenu.selectedIndex];
  const selectMenuValue = selectMenu.value;
  const selectMenuCaption = selectMenuOption.dataset.caption;
  const selectMenuText = selectMenuOption.text;

  if (selectMenuValue) {
    showContainer([fieldFinderImageCaption, fieldFinderImage], [true, true], fieldFinderFigure);
    fieldFinderImage.src = selectMenuValue;
    fieldFinderImage.alt = selectMenuText;
    fieldFinderImageCaption.innerText = selectMenuCaption || selectMenuText;
  }

  else {
    showContainer([fieldFinderImageCaption, fieldFinderImage], [false, false], fieldFinderFigure);
  }
});

billEstimatorTypeMenu.addEventListener('change', (event) => {
    try {
        const customerClassGroup = event?.target.value;

        customerData.customerClassGroup = customerClassGroup;

        if (customerData.customerClassGroup === 'Residential') showContainer([residentialInputs], [true], residentialInputsContainer);
        else showContainer([residentialInputs], [false], residentialInputsContainer);

        if (customerClassGroup) showContainer([billEstimatorForm, billTable], [true, true], billEstimatorFormAndBillTable);
        else showContainer([billEstimatorForm, billTable], [false, false], billEstimatorFormAndBillTable);
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

meterSizeSelectMenu.addEventListener('change', (event) => {
  try {
    const meterSize = event?.target.value;
    if (meterSize) showContainer([baseChargeLabel, baseChargeSmallText, baseChargeInput], [false, false, false], baseChargeContainer);
    else showContainer([baseChargeLabel, baseChargeSmallText, baseChargeInput], [true, true, true], baseChargeContainer);
  } catch (error) {
    console.error(error);
  }
})

dedicatedFireLineIncluded.addEventListener('change', (event) => {
    try {
        const dedicatedFireLineIncluded = event?.target.value === 'true';
        if (dedicatedFireLineIncluded) showContainer([dedicatedFireLineChargeLabel, dedicatedFireLineCharge], [true, true], dedicatedFireLineChargeContainer);
        else showContainer([dedicatedFireLineChargeLabel, dedicatedFireLineCharge], [false, false], dedicatedFireLineChargeContainer);
    } catch (error) {
        console.error(error);
    }
});