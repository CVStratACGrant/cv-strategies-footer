export const sewerBillEstimatorContainer = `
    <div id="sewer-bill-estimator-container">
        <label for="bill-estimator-type-menu">Bill Estimator Type</label>
        <select id="bill-estimator-type-menu" name="bill-estimator-type-menu">
            
            <option data-group="" value="">Please select a bill estimator.</option>

            <optgroup label="Single-Family Residential">
                <option data-group="Single-Family Residential" value="Residential (Single Family Home)">Residential (Single Family Home)</option>
            </optgroup>
            
            <optgroup label="Multi-Family Residential">
                <option data-group="Multi-Family Residential" value="Residential (Two or More Living Units)">Residential (Two or More Living Units)</option>
            </optgroup>
            
            <optgroup label="Mobile Home Park">
                <option data-group="Mobile Home Park" value="Mobile Home Park">Mobile Home Park</option>
            </optgroup>
            
            <optgroup label="Trailer Park">
                <option data-group="Trailer Park" value="Trailer Park">Trailer Park</option>
            </optgroup>

            <optgroup label="Commercial (Low-Strength)">
                <option data-group="Commercial (Low-Strength)" value="Car Wash">Car Wash</option>
                <option data-group="Commercial (Low-Strength)" value="Church">Church</option>
                <option data-group="Commercial (Low-Strength)" value="Laundromat">Laundromat</option>
                <option data-group="Commercial (Low-Strength)" value="Service Station">Service Station</option>        
                <option data-group="Commercial (Low-Strength)" value="Light Industrial">Light Industrial</option>
                <option data-group="Commercial (Low-Strength)" value="Non-Profit">Non-Profit</option>
                <option data-group="Commercial (Low-Strength)" value="Office">Office</option>
                <option data-group="Commercial (Low-Strength)" value="School">School</option>
            </optgroup>
            
            <optgroup label="Commercial (Mid-Strength)">
                <option data-group="Commercial (Mid-Strength)" value="Commercial">Commercial</option>
                <option data-group="Commercial (Mid-Strength)" value="Commercial Mixed Use">Commercial Mixed Use</option>
                <option data-group="Commercial (Mid-Strength)" value="Hospital">Hospital</option>
                <option data-group="Commercial (Mid-Strength)" value="Hotel (Without Kitchen)">Hotel (Without Kitchen)</option>
                <option data-group="Commercial (Mid-Strength)" value="Motel (Without Kitchen)">Motel (Without Kitchen)</option>
                <option data-group="Commercial (Mid-Strength)" value="Retail">Retail</option>
            </optgroup>
            
            <optgroup label="Commercial (High-Strength)">
                <option data-group="Commercial (High-Strength)" value="Hotel (With Kitchen)">Hotel (With Kitchen)</option>
                <option data-group="Commercial (High-Strength)" value="Market">Market</option>
                <option data-group="Commercial (High-Strength)" value="Mortuary">Mortuary</option>
                <option data-group="Commercial (High-Strength)" value="Motel (With Kitchen)">Motel (With Kitchen)</option>
                <option data-group="Commercial (High-Strength)" value="Restaurant">Restaurant</option>
            </optgroup>

            <optgroup label="Industrial">
                <option data-group="Industrial" value="Industrial">Industrial</option>  
            </optgroup>
        </select>

        <div id="sewer-form-and-table-container">
            <form id="sewer-bill-estimator-form" style="display: none;">
                <fieldset id="sewer-bill-estimator-form-fieldset">
                    <legend>Sewer Bill Estimator</legend>
    
                    <div id="residential-single-home-sewer-inputs-container" style="display: none;">
                        <label for="fixed-living-units-input">Number of Living Units</label>
                        <small>This customer class is fixed at one living unit.</small>
                        <input 
                            id="fixed-living-units-input"
                            name="fixed-living-units-input"
                            readonly
                            type="number"
                            value="1"
                        >
                    </div>
    
                    <div id="residential-sewer-inputs-container" style="display: none;">
                        <label for="number-of-living-units-input">Number of Living Units</label>
                        <input 
                            id="number-of-living-units-input" 
                            min="1"
                            name="number-of-living-units-input" 
                            placeholder="2"
                            required
                            type="number" 
                        >
                    </div>
    
                    <div id="commercial-sewer-inputs-container" style="display: none;">
                        <label for="consumption-input">Consumption (CF)</label>
                        <small>Input the value in units of cubic feet (CF).</small>
                        <input
                            id="consumption-input"
                            min="1"
                            name="consumption-input"
                            placeholder="5000"
                            required
                            step="1"
                            type="number"
                        >
                    </div>
    
                    <div id="industrial-sewer-inputs-container" style="display: none;">
                        <label for="biological-oxygen-demand-input">Biological Oxygen Demand (lb)</label>
                        <small>Input the value in units of pounds (lb).</small>
                        <input
                            id="biological-oxygen-demand-input"
                            min="1"
                            name="biological-oxygen-demand-input"
                            placeholder="5"
                            required
                            step="1"
                            type="number"
                        >
                        
                        
                        <label for="nitrogen-input">Nitrogen (lb)</label>
                        <small>Input the value in units of pounds (lb).</small>
                        <input
                            id="nitrogen-input"
                            min="1"
                            name="nitrogen-input"
                            placeholder="5"
                            required
                            step="0.1"
                            type="number"
                        >
                        
                        <label for="total-suspended-solids-input">Total Suspended Solids (lb)</label>
                        <small>Input the value in units of pounds (lb).</small>
                        <input
                            id="total-suspended-solids-input"
                            min="1"
                            name="total-suspended-solids-input"
                            placeholder="5"
                            step="1"
                            type="number"
                            required
                        >
    
                        <label for="volume-input">Volume (MG)</label>
                        <small>Input the value in units of millions of gallons (MG).</small>
                        <input
                            id="volume-input"
                            min="1"
                            name="volume-input"
                            placeholder="5"
                            required
                            step="0.00001"
                            type="number"
                        >
                    </div>
                </fieldset>

                <div id="form-buttons-container">
                    <button type="reset">Reset</button>
                    <button type="submit">Submit</button>
                </div>

            </form>
            
            <table id="sewer-bill-table" style="display: none;">
                <caption id="table-caption">Sewer Charges</caption>
                <thead>
                    <tr>
                        <th scope="col">New Customer Class</th>
                        <th scope="col">Current (2010 – 2024)</th>
                        <th scope="col">15 May 2025</th>
                        <th scope="col">1 July 2026</th>
                        <th scope="col">1 July 2027</th>
                        <th scope="col">1 July 2028</th>
                    </tr>
                </thead>
                <tbody>
                    <template id="template-row">
                        <tr>
                            <th scope="row"></th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        <h3 id="charge-breakdown-container-header"></h3>
        <div id="charge-breakdown-container">
            <template id="template-charge-breakdown">
                <h4></h4>
                <p></p>
            </template>
        </div>
    </div>
`;