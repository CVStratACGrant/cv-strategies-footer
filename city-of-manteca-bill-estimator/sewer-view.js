/**
 * NOTE: variables from JavaScript files are globally accessible because of the placement of the <script> tags at the end of index.html 
 * 
 * responsible for the visible side of the program
 */

let sewerFormData = new Map();

const years = [2024, 2025, 2026, 2027, 2028];
const customerData = {
    oldCustomerClass: '',
    customerClassGroup: '',
}

const billEstimatorTypeMenu = document.getElementById('bill-estimator-type-menu');
const sewerFormAndTableContainer = document.getElementById('sewer-form-and-table-container');
const sewerBillEstimatorForm = document.getElementById('sewer-bill-estimator-form');
const sewerBillEstimatorFormFieldset = document.getElementById('sewer-bill-estimator-form-fieldset');

const residentialSingleHomeSewerInputsContainer = document.getElementById('residential-single-home-sewer-inputs-container');
const residentialSewerInputsContainer = document.getElementById('residential-sewer-inputs-container');
const commercialSewerInputsContainer = document.getElementById('commercial-sewer-inputs-container');
const industrialSewerInputsContainer = document.getElementById('industrial-sewer-inputs-container');

const sewerBillTable = document.getElementById('sewer-bill-table');
const tableBody = document.querySelector('tbody');
const templateRow = document.getElementById('template-row');
const chargeBreakdownContainer = document.getElementById('charge-breakdown-container');
const chargeBreakdownSubContainer = document.getElementById('charge-breakdown-sub-container');
const templateChargeBreakdown = document.getElementById('template-charge-breakdown');
const templateChargeBreakdownHeader = document.getElementById('charge-breakdown-container-header');

const setSewerFormData = (event) => {
    const freshFormData = new FormData(event?.currentTarget);
    const typedFormData = new Map();
    
    const formDataEntries = Array.from(freshFormData.entries());

    for (const [key, value] of formDataEntries) {
        const typedFormDataValue = typedFormData.get(key);

        if (!typedFormData.has(key)) typedFormData.set(key, getTypedValue(value));
        else {
            const newValue = Array.isArray(typedFormDataValue) ?
                [...typedFormDataValue, getTypedValue(value)] :
                [typedFormDataValue, getTypedValue(value)];
            typedFormData.set(key, newValue);
        }
    }

    sewerFormData = typedFormData;
}

const showContainer = (containers, booleans, parentContainer = sewerBillEstimatorFormFieldset) => {
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
    if (years.length !== yearlyCosts.length) return console.error(years, yearlyCosts);

    const templateRowClone = templateRow.content.cloneNode(true);
    const templateRowCloneLabel = templateRowClone.querySelector('th');
    const templateRowCloneCellData = templateRowClone.querySelectorAll('td');
    
    templateRowCloneLabel.innerText = customerData.customerClassGroup;

    years.forEach((year, index) => {
        templateRowCloneCellData[index].innerText = formatCost(yearlyCosts[index]);
    });

    tableBody.appendChild(templateRowClone);
}

const populateChargeBreakdowns = () => {
    const chargeEntries = Object.entries(equations);
    
    chargeEntries.forEach(([category, equationGroup]) => {
        const templateChargeBreakdownClone = templateChargeBreakdown.content.cloneNode(true);
        const templateChargeBreakdownCloneHeader = templateChargeBreakdownClone.querySelector('h4');
        const templateChargeBreakdownCloneParagraph = templateChargeBreakdownClone.querySelector('p');
        
        const { body, title, titleDelimiter, year } = getTextPortions(category);
        templateChargeBreakdownHeader.innerText = `${title}${titleDelimiter}${body} Charge Breakdown`;
        templateChargeBreakdownCloneHeader.innerText = year;

        equationGroup.forEach((equation, index) => {
            templateChargeBreakdownCloneParagraph.setAttribute('style', 'white-space: pre;');
            templateChargeBreakdownCloneParagraph.textContent += `${index ? '\n' : ''}${equation}`;
        });

        chargeBreakdownContainer.appendChild(templateChargeBreakdownClone);
    });
}

billEstimatorTypeMenu.addEventListener('change', (event) => {
    try {
        const selectMenuEvent = event?.target;
        const oldCustomerClass = selectMenuEvent.value;
        const customerClassGroup = selectMenuEvent.options[selectMenuEvent.selectedIndex].getAttribute('data-group');

        customerData.oldCustomerClass = oldCustomerClass;
        customerData.customerClassGroup = customerClassGroup;

        if (oldCustomerClass) showContainer([sewerBillEstimatorForm, sewerBillTable], [true, true], sewerFormAndTableContainer);
        if (customerClassGroup === 'Single-Family Residential') showContainer([residentialSingleHomeSewerInputsContainer, residentialSewerInputsContainer, commercialSewerInputsContainer, industrialSewerInputsContainer], [true, false, false, false]);
        else if (['Multi-Family Residential', 'Mobile Home Park'].includes(customerClassGroup)) showContainer([residentialSewerInputsContainer, residentialSingleHomeSewerInputsContainer, commercialSewerInputsContainer, industrialSewerInputsContainer], [true, false, false, false]);
        else if (['Trailer Park'].includes(customerClassGroup)) showContainer([residentialSewerInputsContainer, residentialSingleHomeSewerInputsContainer, commercialSewerInputsContainer, industrialSewerInputsContainer], [true, false, true, false]);
        else if (['Commercial (Low-Strength)', 'Commercial (Mid-Strength)', 'Commercial (High-Strength)'].includes(customerClassGroup)) showContainer([commercialSewerInputsContainer, residentialSingleHomeSewerInputsContainer, residentialSewerInputsContainer, industrialSewerInputsContainer], [true, false, false, false]);
        else if (customerClassGroup === 'Industrial') showContainer([industrialSewerInputsContainer, residentialSingleHomeSewerInputsContainer, residentialSewerInputsContainer, commercialSewerInputsContainer], [true, false, false, false]);
        else showContainer([sewerBillEstimatorForm, sewerBillTable], [false, false], sewerFormAndTableContainer);
    } catch (error) {
        console.error(error);
    }
});

sewerBillEstimatorForm.addEventListener('submit', (event) => {
    try {
        event.preventDefault();

        setSewerFormData(event);

        years.forEach((year) => {
            if (customerData.customerClassGroup === 'Industrial') calculateIndustrialSewerBill(year);
            else if (['Commercial (Low-Strength)', 'Commercial (Mid-Strength)', 'Commercial (High-Strength)'].includes(customerData.customerClassGroup)) calculateCommercialSewerBill(year);
            else calculateResidentialSewerBill(year);
        });

        clearContainer(tableBody);
        clearContainer(chargeBreakdownContainer);

        populateTable();
        populateChargeBreakdowns();

        resetYearlyCosts();
        resetEquations();
    } catch (error) {
        console.error(error);
    }
});