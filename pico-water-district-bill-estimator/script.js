import { externalFormWrapper } from "./structure.js";
import { externalFormWrapperStyle } from "./style.js";

class PicoWaterDistrictBillEstimator extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
            <style>${externalFormWrapperStyle}</style>
            ${externalFormWrapper}
        `;
    }

    async connectedCallback() {
        try {
            await this.loadScript('https://cvstratacgrant.github.io/web-components/pico-water-district/rates.js')
            await this.loadScript('https://cvstratacgrant.github.io/web-components/pico-water-district/functions.js')
        } catch (error) {
            console.error('Failed to load scripts:', error);
        }
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.defer = true;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }
}

customElements.define('pico-water-district-bill-estimator', PicoWaterDistrictBillEstimator);