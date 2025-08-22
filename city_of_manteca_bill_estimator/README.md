["Manteca Sewer Bill Estimator" in Dropbox](https://www.dropbox.com/scl/fo/dwf3czvp2zigqf2wg703v/AO8h-25CLOYLUGyyomckaug?rlkey=mmvfs76a3mu0x0o9bhxpuqfos&st=mktyn7qf&dl=0)
[Live](https://mantecawastewater.org/billestimator/)

### Testing

#### Individual Functions
```html
<button id="test-functions-button">Test Functions</button>
```

```js
const testFunctionsButton = document.getElementById('test-functions-button');
testFunctionsButton.addEventListener('click', () => {
    console.log('Function call here...');
});
```

#### Form Testing Implementation
```js
/**
 ********************* TESTING  *********************
 */

function simulateBillEstimatorFormSubmission() {
    // Calculator Type
    customerData.customerClassGroup = 'Residential';

    // **Utility Functions**
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomFloat(min, max, decimals) {
        return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
    }

    function getRandomOption(options) {
        return options[Math.floor(Math.random() * options.length)];
    }

    // With Random Data
    // const fakeFormData = {
    //     "current-billing-units-water-usage": getRandomNumber(10, 100),
    //     "current-billing-cycle-days": getRandomNumber(25, 35),
    //     "household-size": getRandomNumber(1, 6),
    //     "landscape-area-square-feet": getRandomNumber(500, 5000),
    //     "evapotranspiration": getRandomFloat(0.1, 1.5, 2),
    //     "irrigation-efficiency": getRandomFloat(0.5, 1, 2),
    //     "meter-size": getRandomOption(["5/8 inch", "3/4 inch", "1 inch", "1.5 inch", "2 inch"]),
    //     "dedicated-fire-line-included": getRandomOption(["true", "false"])
    // };

    // With Fixed Data
    const fakeFormData = {
        "current-billing-units-water-usage": 10,
        "current-billing-cycle-days": 30,
        "household-size": 4,
        "landscape-area-square-feet": 8000,
        "evapotranspiration": 6,
        "irrigation-efficiency": 0.8,
        "meter-size": "5/8 inch",
        "dedicated-fire-line-included": 'false',
    };

    console.log("Simulating Form Submission with Data:", fakeFormData);

    // Populate the actual form fields in the DOM (if they exist)
    Object.keys(fakeFormData).forEach(field => {
        const inputElement = document.querySelector(`[name="${field}"], #${field}`);
        if (inputElement) {
            if (inputElement.tagName === "SELECT") {
                inputElement.value = fakeFormData[field]; // Set value for select fields
            } else {
                inputElement.value = String(fakeFormData[field]); // Set value for inputs
            }
        }
    });

    // Trigger the form submission event
    if (billEstimatorForm) {
        const event = new Event("submit", { bubbles: true, cancelable: true });
        billEstimatorForm.dispatchEvent(event);
        console.log("🔄 Bill Estimator Form Submitted!");
    } else {
        console.warn("⚠️ Form with ID 'billEstimatorForm' not found!");
    }
}

const testFunctionsButton = document.getElementById('test-functions-button');
testFunctionsButton.addEventListener('click', () => {
    // console.log('Function call here...');
    
    // **Run the simulation**
    simulateBillEstimatorFormSubmission();
});
```