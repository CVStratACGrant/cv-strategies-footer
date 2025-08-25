export const billEstimatorContainer = `
    <div id="bill-estimator-container">
        <h3>City of Ontario Bill Estimator</h3>

        <div class="pre-form-inputs">
            <div class="column">
                <select id="field-finder-menu" aria-label="This field helps you find the item on your bill.">
                    <option value="">ℹ️ Assistance finding bill fields.</option>
                    <optgroup label="Water">
                        <option value="https://billestimator.org/wp-content/uploads/2025/06/Ontario-Meter-Size-3.png" data-caption="Bill displays: [Meter Size] Base Charge">Meter Type and Size</option>
                        <option value="https://billestimator.org/wp-content/uploads/2025/06/Ontario-Usage-HCF-3.png" data-caption="Bill displays: Usage (HCF)">Total Water Usage (HCF)</option>
                        <option value="https://billestimator.org/wp-content/uploads/2025/06/Ontario-Consumption-3.png" data-caption="Bill displays: Consumption">Meter Water Consumption (HCF)</option>
                    </optgroup>
                    <optgroup label="Sewer">
                        <option value="https://billestimator.org/wp-content/uploads/2025/06/Ontario-Sewer-Base-Charge-3.png" data-caption="Bill displays: Base Charge">Sewer Base Charge (Dollars)</option>
                        <option value="https://billestimator.org/wp-content/uploads/2025/06/Ontario-IEUA-Charge-3.png" data-caption="Bill displays: IEUA">IEUA Charge (Dollars)</option>
                    </optgroup>
                    <optgroup label="Stormwater">
                        <option value="https://billestimator.org/wp-content/uploads/2025/06/Ontario-Stormwater-Base-Charge-3.png" data-caption="Bill displays: Base Charge">Stormwater Base Charge (Dollars)</option>
                    </optgroup>
                    <optgroup label="Trash & Recycling">
                        <option value="https://billestimator.org/wp-content/uploads/2025/06/Ontario-Scouting-Service-3.png" data-caption="Bill displays: Scouting Service">Scouting Service Charge (Dollars)</option>
                        <option value="https://billestimator.org/wp-content/uploads/2025/06/Ontario-Waste-Bin-Type-and-Size-3.png" data-caption="Bill displays: [Bin Size][Bin Type]">Waste Bin Type and Size</option>
                    </optgroup>
                </select>
    
                <figure id="field-finder-figure" style="display: none;">
                    <figcaption id="field-finder-image-caption"></figcaption>
                    <img id="field-finder-image" src="" alt="">
                </figure>

                <select name="bill-estimator-type-menu" aria-label="customer class, used to determine the bill estimator type">
                    <option data-group="" value="">Please select a customer class.</option>
                    
                    <optgroup label="Residential">
                        <option data-group="Residential" value="Single-Family">Single-Family</option>
                        <option data-group="Residential" value="Multi-Family">Multi-Family</option>
                    </optgroup>
                    
                    <optgroup label="Non-Residential">
                        <option data-group="Non-Residential" value="Commercial">Commercial</option>
                        <option data-group="Non-Residential" value="Industrial">Industrial</option>
                    </optgroup>
                </select>
            </div>
        </div>
    
    <div id="form-and-table-container">
        <form id="bill-estimator-form" style="display: none;">
            <fieldset>
                <legend id="form-title"><!-- Dynamically Populated -->Bill Estimator</legend>
                <div id="form-fields-container">

                    <label class="column">
                        Start of the Service Period
                        <input type="date" name="billing-cycle-start" required>
                    </label>

                    <label class="column">
                        End of the Service Period:
                        <input type="date" name="billing-cycle-end" required>
                    </label>

                    <div class="column">
                        <fieldset class="scroll-wrapper">
                            <legend>Meter Types and Sizes</legend>
                            <template id="template-meter-type-and-size-elements">
                                <div class="row">
                                    <div class="column">
                                        <select aria-label="Meter Type and Size" name="meter-types-and-sizes" required>
                                            <option value="">Please select a meter type and size.</option>
                                            <optgroup label="Water">
                                                <option value='Water|5/8"'>5/8" Water</option>
                                                <option value='Water|3/4"'>3/4" Water</option>
                                                <option value='Water|1"'>1" Water</option>
                                                <option value='Water|1 1/2"'>1 1/2" Water</option>
                                                <option value='Water|2"'>2" Water</option>
                                                <option value='Water|3"'>3" Water</option>
                                                <option value='Water|4"'>4" Water</option>
                                                <option value='Water|6"'>6" Water</option>
                                                <option value='Water|8"'>8" Water</option>
                                                <option value='Water|10"'>10" Water</option>
                                            </optgroup>                                                                                        
                                            <optgroup label="Recycled Water">
                                                <option value='Recycled Water|5/8"'>5/8" Recycled Water</option>
                                                <option value='Recycled Water|3/4"'>3/4" Recycled Water</option>
                                                <option value='Recycled Water|1"'>1" Recycled Water</option>
                                                <option value='Recycled Water|1 1/2"'>1 1/2" Recycled Water</option>
                                                <option value='Recycled Water|2"'>2" Recycled Water</option>
                                                <option value='Recycled Water|3"'>3" Recycled Water</option>
                                                <option value='Recycled Water|4"'>4" Recycled Water</option>
                                                <option value='Recycled Water|6"'>6" Recycled Water</option>
                                                <option value='Recycled Water|8"'>8" Recycled Water</option>
                                                <option value='Recycled Water|10"'>10" Recycled Water</option>
                                            </optgroup>
                                        </select>
                                        <label>
                                            <span class="water-usage-label-text"><!-- Dynamically Populated --></span>
                                            <input name="current-ccf-usages" type="number" placeholder="Ex. 16" step="1" required>
                                        </label>
                                    </div>
                                    <button data-field-name="meter-types-and-sizes" data-action="" aria-label="Remove this meter size." title="Remove this meter size." type="button">-</button>
                                    <button data-field-name="meter-types-and-sizes" data-action="append" aria-label="Add a meter size." title="Add a meter size." type="button">+</button>
                                </div>
                            </template>
                        </fieldset>
                    </div>
                    
                    <div class="column ieua-charge-elements">
                        <fieldset class="scroll-wrapper">
                            <legend>Sewer Base and IEUA Charges</legend>
                            <template id="template-sewer-base-and-ieua-charge-elements">
                                <div class="row">
                                    <div class="column">
                                        <label>
                                            Sewer Base Charge (Dollars):
                                            <input type="number" name="sewer-base-charges" placeholder="Ex. 14.18" step="0.01" required>
                                        </label>

                                        <label> 
                                            IEUA Charge (Dollars):
                                            <input type="number" name="inland-empire-utilities-agency-charges" placeholder="Ex. 24.79" step="0.01" required>
                                        </label>
                                    </div>
                                    <button data-field-name="sewer-base-charges" data-action="" aria-label="Remove this pair of sewer base and IEUA charges." title="Remove this pair of sewer base and IEUA charges." type="button">-</button>
                                    <button data-field-name="sewer-base-charges" data-action="append" aria-label="Add a pair of sewer base and IEUA charges." title="Add a pair of sewer base and IEUA charges." type="button">+</button>
                                </div>
                            </template>
                        </fieldset>
                    </div>

                    <div class="column">
                        <fieldset class="scroll-wrapper">
                            <legend>Waste Bin Types and Sizes</legend>
                            <template id="template-waste-bin-type-and-size-elements">
                                <div class="row">
                                    <div class="column">
                                        <select aria-label="Waste Bin Type and Size" name="waste-bin-types-and-sizes" required>
                                            <option value="">Please select a waste bin type and size.</option>
                                            <optgroup label="Refuse">
                                                <option value="Refuse|32 Gal">32 Gal Refuse</option>
                                                <option value="Refuse|64 Gal">64 Gal Refuse</option>
                                                <option value="Refuse|96 Gal">96 Gal Refuse</option>
                                                <option value="Refuse|1.5 YD">1.5 YD Refuse</option>
                                                <option value="Refuse|2 YD">2 YD Refuse</option>
                                                <option value="Compactor Refuse|2 YD">2 YD Refuse Compactor</option>
                                                <option value="Refuse|3 YD">3 YD Refuse</option>
                                                <option value="Compactor Refuse|3 YD">3 YD Refuse Compactor</option>
                                                <option value="Refuse|4 YD">4 YD Refuse</option>
                                                <option value="Compactor Refuse|4 YD">4 YD Refuse Compactor</option>
                                                <option value="Refuse|6 YD">6 YD Refuse</option>
                                                <option value="Compactor Refuse|6 YD">6 YD Refuse Compactor</option>
                                            </optgroup>
                                            <optgroup label="Recycling">
                                                <option value="Recycling|96 Gal">96 Gal Recycling</option>
                                                <option value="Recycling|1.5 YD">1.5 YD Recycling</option>
                                                <option value="Recycling|2 YD">2 YD Recycling</option>
                                                <option value="Compactor Recycling|2 YD">2 YD Recycling Compactor</option>
                                                <option value="Recycling|3 YD">3 YD Recycling</option>
                                                <option value="Compactor Recycling|3 YD">3 YD Recycling Compactor</option>
                                                <option value="Recycling|4 YD">4 YD Recycling</option>
                                                <option value="Compactor Recycling|4 YD">4 YD Recycling Compactor</option>
                                                <option value="Recycling|6 YD">6 YD Recycling</option>
                                                <option value="Compactor Recycling|6 YD">6 YD Recycling Compactor</option>
                                            </optgroup>
                                            <optgroup label="Green Waste">
                                                <option value="Green Waste|32 Gal">32 Gal Green Waste</option>
                                                <option value="Green Waste|64 Gal">64 Gal Green Waste</option>
                                                <option value="Green Waste|96 Gal">96 Gal Green Waste</option>
                                                <option value="Green Waste|1.5 YD">1.5 YD Green Waste</option>
                                                <option value="Green Waste|2 YD">2 YD Green Waste</option>
                                                <option value="Green Waste|3 YD">3 YD Green Waste</option>
                                                <option value="Green Waste|4 YD">4 YD Green Waste</option>
                                                <option value="Green Waste|6 YD">6 YD Green Waste</option>
                                            </optgroup>
                                            <optgroup label="Organics">
                                                <option value="Organics|32 Gal">32 Gal Organics</option>
                                                <option value="Organics|64 Gal">64 Gal Organics</option>
                                                <option value="Organics|96 Gal">96 Gal Organics</option>
                                                <option value="Organics|1.5 YD">1.5 YD Organics</option>
                                                <option value="Compactor Organics|1.5 YD">1.5 YD Organics Compactor</option>
                                                <option value="Organics|2 YD">2 YD Organics</option>
                                                <option value="Compactor Organics|2 YD">2 YD Organics Compactor</option>
                                                <option value="Organics|3 YD">3 YD Organics</option>
                                                <option value="Compactor Organics|3 YD">3 YD Organics Compactor</option>
                                            </optgroup>
                                            <optgroup label="Roll Off">
                                                <option value="Roll Off|Any Size">Any Size Roll Off</option>
                                                <option value="Compacted Roll Off|Any Size">Any Size Compacted Roll Off</option>
                                            </optgroup>
                                        </select>
                                        <label>
                                            Weekly Waste Bin Pickups:
                                            <input name="weekly-pickups" min="1" type="number" value="1" required>
                                        </label>
                                    </div>
                                    <button data-field-name="waste-bin-types-and-sizes" data-action="" aria-label="Remove this waste bin type and pickup rate." title="Remove this waste bin type and pickup rate." type="button">-</button>
                                    <button data-field-name="waste-bin-types-and-sizes" data-action="append" aria-label="Add a waste bin type and pickup rate." title="Add a waste bin type and pickup rate." type="button">+</button>
                                </div>
                            </template>
                        </fieldset>
                    </div>

                    <div class="column">
                        <fieldset class="scroll-wrapper">
                            <legend>Stormwater Base Charges</legend>
                            <template id="template-stormwater-base-charge-elements">
                                <div class="row">
                                    <label>
                                        Stormwater Base Charge (Dollars):
                                        <input type="number" name="stormwater-base-charges" placeholder="Ex. 1.00" step="0.01" required>
                                    </label>
                                    <button data-field-name="stormwater-base-charges" data-action="" aria-label="Remove this stormwater base charge." title="Remove this stormwater base charge." type="button">-</button>
                                    <button data-field-name="stormwater-base-charges" data-action="append" aria-label="Add a stormwater base charge." title="Add a stormwater base charge." type="button">+</button>
                                </div>
                            </template>
                        </fieldset>
                    </div>

                    <label class="column">
                        Do you have a scouting service?
                        <select name="scouting-service-included" required>
                            <option value="">Please select an option.</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </label>

                    <label class="column scouting-service-charge-elements" style="display: none;">
                        Scouting Service Charge (Dollars):
                        <input name="scouting-service-charge" type="number" placeholder="Ex. 41.13" step="0.01" required>
                    </label>

                    <label class="column">
                        Do you have a dedicated fire line?
                        <select name="dedicated-fire-line-included" required>
                            <option value="">Please select an option.</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </label>
                    
                    <div class="column dedicated-fire-line-size-elements" style="display: none;">
                        <fieldset class="scroll-wrapper">
                            <legend>Private Fire Line Meter Sizes</legend>
                            <template id="template-dedicated-fire-line-size-elements">
                                <div class="row">
                                    <div class="column">
                                        <select aria-label="Private Fire Line Meter Size" name="dedicated-fire-line-sizes" required>
                                            <option value="">Please select a private fire line meter size.</option>
                                            <option value='Private Fire Line|2"'>2" Private Fire</option>
                                            <option value='Private Fire Line|4"'>4" Private Fire</option>
                                            <option value='Private Fire Line|6"'>6" Private Fire</option>
                                            <option value='Private Fire Line|8"'>8" Private Fire</option>
                                            <option value='Private Fire Line|10"'>10" Private Fire</option>
                                            <option value='Private Fire Line|12"'>12" Private Fire</option>
                                            <option value='Private Fire Line|16"'>16" Private Fire</option>
                                        </select>
                                    </div>
                                    <button data-field-name="dedicated-fire-line-sizes" data-action="" aria-label="Remove this private fire line." title="Remove this private fire line." type="button">-</button>
                                    <button data-field-name="dedicated-fire-line-sizes" data-action="append" aria-label="Add a private fire line." title="Add a private fire line." type="button">+</button>
                                </div>
                            </template>
                        </fieldset>
                    </div>

                </div>
            </fieldset>
            
            <div id="form-footer" class="row">
                <button type="reset">Reset</button>
                <button type="submit">Submit</button>
            </div>
        </form>

        <table style="display: none;">
            <caption id="charge-breakdown-caption"><!-- Dynamically Populated -->Charge Breakdown</caption>
            <thead>
                <tr>
                    <th scope="col">Current</th>
                    <th scope="col">2026</th>
                    <th scope="col">2027</th>
                </tr>
            </thead>
            <tbody>
                <template id="bill-table-template-row">
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </template>
            </tbody>
            <tfoot>
                <tr id="bill-table-footer-row">
                    <template id="template-charge-breakdown">
                        <td>
                            <details>
                                <summary>Info</summary>
                                <p></p>
                            </details>
                        </td>
                    </template>
                </tr>
            </tfoot>
        </table>
    </div>
</div>
`;