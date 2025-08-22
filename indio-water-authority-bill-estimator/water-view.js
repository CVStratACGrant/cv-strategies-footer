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

/**
 ********************* TESTING  *********************
 */
 
 const testCases = [
    {
      expected: 189.94,
      customerClassGroup: 'Irrigation',
      formData: {
        'backflow-device-testing': 'Backflow Device Testing - 5/8", 3/4" , 1"',
        "base-charge": 52.90,
        "meter-size": '',
        "tier-1-billing-units-water-usage": 41,
        "current-billing-units-water-usage": 62,
        "current-billing-units-total-water-budget": 43,
        "dedicated-fire-line-included": "false",
        "dedicated-fire-line-charge": 20.00,
        "current-billing-cycle-days": 28,
        "customer-class": ""
      }
    },
    {
      expected: 90.10,
      customerClassGroup: 'Irrigation',
      formData: {
        'backflow-device-testing': 'Backflow Device Testing - 6" and Over',
        "base-charge": 0.00,
        "meter-size": '',
        "tier-1-billing-units-water-usage": 0,
        "current-billing-units-water-usage": 0,
        "current-billing-units-total-water-budget": 0,
        "dedicated-fire-line-included": "true",
        "dedicated-fire-line-charge": 60.00,
        "current-billing-cycle-days": 29,
        "customer-class": ""
      }
    },
    {
      expected: 844.81,
      customerClassGroup: 'Irrigation',
      formData: {
        'backflow-device-testing': 'Backflow Device Testing - 1 1/2", and 2"',
        "base-charge": 169.26,
        "meter-size": '',
        "tier-1-billing-units-water-usage": 374,
        "current-billing-units-water-usage": 374,
        "current-billing-units-total-water-budget": 466,
        "dedicated-fire-line-included": "true",
        "dedicated-fire-line-charge": 20.00,
        "current-billing-cycle-days": 30,
        "customer-class": ""
      }
    },
    {
      expected: 272.39,
      customerClassGroup: 'Irrigation',
      formData: {
        'backflow-device-testing': 'Backflow Device Testing - 1 1/2", and 2"',
        "base-charge": 169.26,
        "meter-size": '',
        "tier-1-billing-units-water-usage": 5,
        "current-billing-units-water-usage": 25,
        "current-billing-units-total-water-budget": 5,
        "dedicated-fire-line-included": "false",
        "dedicated-fire-line-charge": 20.00,
        "current-billing-cycle-days": 30,
        "customer-class": ""
      }
    },
    {
      expected: 78.28,
      customerClassGroup: 'Non-Residential',
      formData: {
        'backflow-device-testing': 'Backflow Device Testing - 5/8", 3/4" , 1"',
        "base-charge": 52.90,
        "meter-size": '',
        "tier-1-billing-units-water-usage": 5,
        "current-billing-units-water-usage": 5,
        "current-billing-units-total-water-budget": 12,
        "dedicated-fire-line-included": "false",
        "dedicated-fire-line-charge": 20.00,
        "current-billing-cycle-days": 32,
        "customer-class": ""
      }
    },
    {
      expected: 415.28,
      customerClassGroup: 'Non-Residential',
      formData: {
        'backflow-device-testing': '',
        "base-charge": 52.90,
        "meter-size": '',
        "tier-1-billing-units-water-usage": 77,
        "current-billing-units-water-usage": 166,
        "current-billing-units-total-water-budget": 77,
        "dedicated-fire-line-included": "false",
        "dedicated-fire-line-charge": 20.00,
        "current-billing-cycle-days": 30,
        "customer-class": ""
      }
    },
    {
      expected: 152.38,
      customerClassGroup: 'Residential',
      formData: {
        'backflow-device-testing': '',
        "base-charge": 52.90,
        "meter-size": '',
        "tier-1-billing-units-water-usage": 9,
        "current-billing-units-water-usage": 48,
        "current-billing-units-total-water-budget": 27,
        "dedicated-fire-line-included": "false",
        "dedicated-fire-line-charge": 20.00,
        "current-billing-cycle-days": 28,
        "customer-class": "Single-Family"
      }
    },
    {
      expected: 377.55,
      customerClassGroup: 'Residential',
      formData: {
        'backflow-device-testing': '',
        "base-charge": 21.16,
        "meter-size": '',
        "tier-1-billing-units-water-usage": 10,
        "current-billing-units-water-usage": 118,
        "current-billing-units-total-water-budget": 26,
        "dedicated-fire-line-included": "false",
        "dedicated-fire-line-charge": 20.00,
        "current-billing-cycle-days": 30,
        "customer-class": "Single-Family"
      }
    }
  ];
  
  async function runAllSimulations() {
    const results = [];
  
    for (const [i, testCase] of testCases.entries()) {
      console.log(`🔄 Running Test Case #${i + 1}`);
  
      window.customerData = window.customerData || {};
      customerData.customerClassGroup = testCase.customerClassGroup;
  
      Object.entries(testCase.formData).forEach(([key, value]) => {
        const elements = document.querySelectorAll(`[name="${key}"], #${key}`);
        elements.forEach((el) => {
          if (el.tagName === "SELECT") el.value = value;
          else if (el.type === "checkbox" || el.type === "radio") el.checked = el.value == value;
          else el.value = String(value);
        });
      });
  
      const form = document.querySelector("form");
      if (form) {
        form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        await new Promise(r => setTimeout(r, 300)); // wait for any DOM update/render
      }
  
      const resultEl = document.querySelector("tbody tr td");
      const actualText = resultEl?.textContent?.trim()?.replace(/[^0-9.]/g, '') || "";
      const actual = parseFloat(actualText);
  
      const match = Math.abs(actual - testCase.expected) < 0.01;
  
      results.push({
        case: `${i + 1}: ${testCase.customerClassGroup} `,
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