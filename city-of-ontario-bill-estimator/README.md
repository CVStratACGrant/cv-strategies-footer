[Live]()
[Live Source](https://billestimator.org/)
["Bill Estimator" in Dropbox]()

# Overview

## Functionality

### Water
- **Time Range**
  - 2026 – 2030
- **Customer Classes**
  - Single-Family Residential
  - Non-Single-Family Residential
    - Multi-Family Residential (not needed in HTML)
    - Commercial (not needed in HTML)
    - Industrial (not needed in HTML)
- **Rates and Charges**
  - Change in rates for
    - all customer classes
    - recycled water
  - Change in charges for
    - all customer classes
    - recycled water
    - private fire

### Sewer
- **Time Range**
  - 2025 – 2030
- **Customer Classes**
  - City
  - Residential
    - Single-Family Residential (defaults to 1 unit)
    - Multi-Family Residential
  - Non-Residential
- **Rates and Charges**
  - Change in charges for all customer classes
    - The *unit* is a dwelling unit for residential and HCF billing unit for non-residential.
      - Whether it is a dwelling unit or HCF is not significant for calculation.
      - The value itself, however, is critical for calculating future years.
      - It is found by dividing the base charge on the bill by the sewer charge for a given year.
      - With that unit value, one can multiply it by projected charges to determine upcoming years' base charges.


### Solid Waste
- **Time Range**
  - 2024 – 2027
- **Customer Classes**
  - Residential Rate
  - Commercial Rate
- **Rates and Charges**
  - Municipal Solid Waste (MSW) covers regular household and commercial trash. On the bill, it shows up as refuse.
  - YD stands for cubic yard, which is equivalent to 202 gallons.
  - For a bin to classify as an *additional container*, it has to have another container on the bill of the same size, type (a.k.a. commodity), and pickup rate (a.k.a. frequency)
  - Change in variable rates for
    - Residential Rates: 32 Gal, 64 Gal, 96 Gal
    - Commercial Rates
      - Municipal Solid Waste: 96 Gal
      - Recycling: 96 Gal
      - Organics: 96 Gal
    - Bin Rates
      - Municipal Solid Waste: 1.5 YD, 2 YD, 3 YD, 4 YD, 6 YD
      - Recycling: 1.5 YD, 2 YD, 3 YD, 4 YD, 6 YD
      - Organics: 1.5 YD, 2 YD, 3 YD
    - Compactor Rates
      - Municipal Solid Waste: 2 YD, 3 YD, 4 YD, 6 YD
      - Recycling: 2 YD, 3 YD, 4 YD, 6 YD
    - Roll Off Rates
      - Any Material: Any Size
      - Plus processing/disposal charge
    - Compacted Roll Off Rates
      - Any Material: Any Size
      - Plus processing/disposal charge


## Site Integration
This site uses the CMS Granicus. The goal was to integrate the bill estimator code without linking an external resource to host it. However, due to the limitations of Granicus, the estimator was built on a WordPress site hosted by WP Engine, using Code Block elements, and then embedded into the client's site.

## Customer Class Input
The Ontario bill structure includes all utilities, thus requiring only the collection of a user's customer class. Originally, however, the customer class input was structured like this to allow for alternative form structures based on utility.
```html
<label for="bill-estimator-type-menu">Customer Class</label>
<select id="bill-estimator-type-menu" name="bill-estimator-type-menu">
    <option data-utility="" data-group="" value="">Please select a rate calculator.</option>

    <optgroup label="Water">
        <option data-utility="Water" data-group="Residential" value="Single-Family">Single-Family Residential</option>
        <option data-utility="Water" data-group="Non-Single-Family Residential" value="Non-Single-Family Residential">Non-Single-Family Residential</option>
    </optgroup>
    
    <optgroup label="Sewer">
        <option data-utility="Sewer" data-group="Residential" value="Single-Family">Single-Family Residential</option>
        <option data-utility="Sewer" data-group="Residential" value="Multi-Family">Multi-Family Residential</option>
        <option data-utility="Sewer" data-group="Non-Residential" value="Non-Residential">Non-Residential</option>
    </optgroup>

    <optgroup label="Solid Waste">
        <option data-utility="Solid Waste" data-group="Residential" value="Residential">Residential</option>
        <option data-utility="Solid Waste" data-group="Commercial" value="Commercial">Commercial</option>
    </optgroup>
</select>
```

## Solid Waste Rate
For the solid waste rate, this was the original rate object structure:
```js
2026: {
    "Residential Rate - 32 Gal": 39.86,
    "Residential Rate - 64 Gal": 44.83,
    "Residential Rate - 96 Gal": 50.15,
    "Commercial Rate - 96 Gal MSW": 19.55,
    "Commercial Rate - 96 Gal REC": 12.93,
    "Commercial Rate - 96 Gal ORG": 19.93,
    "Bin Rate - 1.5 YD MSW": 134.81,
    "Bin Rate - 2 YD MSW": 147.23,
    "Bin Rate - 3 YD MSW": 179.09,
    "Bin Rate - 4 YD MSW": 202.81,
    "Bin Rate - 6 YD MSW": 281.57,
    "Bin Rate - 1.5 YD Rec": 100.49,
    "Bin Rate - 2 YD Rec": 110.59,
    "Bin Rate - 3 YD Rec": 137.66,
    "Bin Rate - 4 YD Rec": 160.03,
    "Bin Rate - 6 YD Rec": 222.19,
    "Bin Rate - 1.5 YD Org": 197.46,
    "Bin Rate - 2 YD Org": 234.19,
    "Bin Rate - 3 YD Org": 282.03,
    "Compactor Rate - 2YD - MSW": 209.74,
    "Compactor Rate - 3YD - MSW": 285.06,
    "Compactor Rate - 4YD - MSW": 361.94,
    "Compactor Rate - 6YD - MSW": 603.03,
    "Compactor Rate - 2YD - REC": 158.85,
    "Compactor Rate - 3YD - REC": 224.87,
    "Compactor Rate - 4YD - REC": 278.18,
    "Compactor Rate - 6YD - REC": 451.31,
    "Roll Off - Any Size - Any Material": 319.63,
    "Compacted Roll Off - Any Size - Any Material": 370.00,
},
```


## Questions

### Pending
None

### Answered

- Do non-single-family residential (non-SFR) water rates increase uniformly across all customer classes, or do multi-family, commercial, and industrial customers have separate rate increases? The data provided implies that they do increase uniformly, but I wanted to clarify.
- The Raftelis draft report shows fixed charge increases for non-SFR water meter customers, but it doesn’t include projections across all years, meter sizes, and customer classes (e.g., multi-family, commercial, industrial). I currently only have that information for single-family residential customers. Could you provide it if available?

---

- What is the 2025 rate for non-residential sewer customers?
- What are the 2025 and 2028 – 2030 sewer city rates?

---

How are solid waste bills calculated?

I assumed some bins may have multiple pickups, but I'm still ending up several dollars over or under the sample bill amounts when comparing to the 2024/2025 rate sheet. Here's what I’ve found:

| **Rate Sheet (4/11/2025)**         | **Sample Bill (3/18–4/16)**       | **Possible Calculation**                     | **Discrepancy**          |
|------------------------------------|-----------------------------------|----------------------------------------------|--------------------------|
| 2 YD Organics – $303.23            | 2 YD Food Waste – $451.15         | $303.23 × 1 pickup = $303.23                 | **–$147.92**             |
| 3 YD Recycling – $126.27           | 3 YD Recycle – $213.24            | $126.27 × 2 pickups = $252.54                | **+$39.30**              |
| 4 YD Refuse – $213.25              | 4 YD Refuse – $213.25             | $213.25 × 1 pickup = $213.25                 | $0                       |
| 4 YD Refuse – $213.25              | 4 YD Refuse – $878.65             | $213.25 × 4 pickups = $853.00                | **–$25.65**              |


So far, it looks like base rates match expected values when assuming weekly or multiple pickups, but discrepancies of $25–$150 remain unexplained — especially for organics and recycling.

## Testing
```js
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
```