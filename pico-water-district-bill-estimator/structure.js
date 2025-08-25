export const externalFormWrapper = `
<div id="external-form-wrapper">
    <form id="bill-calculator-form">
        <div id="internal-form-wrapper">
            <div class="container">
                <label for="year-select-menu">Year</label>
                <select name="year-select-menu">
                    <option value="2023">Feb 2023 </option>
                    <option selected value="2024">Mar 2024</option>
                    <option value="2025">Jan 2025</option>
                    <option value="2026">Jan 2026</option>
                    <option value="2027">Jan 2027</option>
                    <option value="2028">Jan 2028</option>
                </select>
            </div>

            <div class="container">
                <label for="meter-size-select-menu">Meter Size</label>
                <select name="meter-size-select-menu">
                    <option disabled selected value="">Select</option>
                    <option value="5/8-inch">5/8-inch (15 mm) [All residential]</option>
                    <option value="1-inch">1-inch (25 mm)</option>
                    <option value="1.5-inch">1.5-inch (40 mm)</option>
                    <option value="2-inch">2-inch (50 mm)</option>
                    <option value="3-inch">3-inch (80 mm)</option>
                    <option value="4-inch">4-inch (100 mm)</option>
                    <option value="6-inch">6-inch (150 mm)</option>
                </select>
            </div>

            <div class="container">
                <label for="ccf-billed-for-potable-water-input">CCF (Centum Cubic Feet) Billed for Potable Water</label>
                <input id="ccf-billed-for-potable-water-input" type="number" min="0" value="0">
            </div>

            <div class="container">
                <label for="recycled-water-service-select-menu">Recycled Water Service</label>
                <select name="recycled-water-service-select-menu">
                    <option disable selected value="false">Select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>

            <!-- dynamically shown if condition is met -->
            <div id="ccf-billed-for-recycled-water-container" class="container" style="display: none;">
                <label for="ccf-billed-for-recycled-water-input">CCF (Centum Cubic Feet) Billed for Recycled Water</label>
                <input id="ccf-billed-for-recycled-water-input" type="number" min="0" value="0">
            </div>

            <div class="container">
                <label for="private-fire-connection-select-menu">Private Fire Connection</label>
                <select name="private-fire-connection-select-menu">
                    <option disabled selected value="false">Select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>

            <!-- dynamically shown if condition is met -->
            <div id="private-fire-connection-size-container" class="container" style="display: none;">
                <label for="private-fire-connection-size-select-menu">Connection Size</label>
                <select name="private-fire-connection-size-select-menu">
                    <option disabled selected value="">Select</option>
                    <option value="1.5-inch">1.5-inch (40 mm)</option>
                    <option value="2-inch">2-inch (50 mm)</option>
                    <option value="6-inch">6-inch (150 mm)</option>
                    <option value="8-inch">8-inch (200 mm)</option>
                    <option value="10-inch">10-inch (250 mm)</option>
                </select>
            </div>
            
            <div id="form-footer">
                <div>
                    <button type="reset">Reset</button>
                </div>
                <div id="calculation-result-div">
                    <!-- content dynamically populated -->
                    $0
                </div>
            </div>
        </div>

    </form>
</div>
`;