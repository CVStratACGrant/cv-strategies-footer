import { sewerBillEstimatorContainer } from "./structure.js";
import { sewerBillEstimatorStyle } from "./style.js";

class CityOfMantecaBillEstimator extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
            <style>${sewerBillEstimatorStyle}</style>
            ${sewerBillEstimatorContainer}
        `;
    }

    async connectedCallback() {
        try {
            await Promise.all([
                this.loadScript('https://cvstratacgrant.github.io/web-components/city_of_manteca_bill_estimator/sewer-rates-and-charges.js'),
                this.loadScript('https://cvstratacgrant.github.io/web-components/city_of_manteca_bill_estimator/sewer-view.js'),
                this.loadScript('https://cvstratacgrant.github.io/web-components/city_of_manteca_bill_estimator/sewer-functions.js'),
                this.loadScript('https://cvstratacgrant.github.io/web-components/city_of_manteca_bill_estimator/sewer-core.js')
            ]);
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

customElements.define('city-of-manteca-bill-estimator', CityOfMantecaBillEstimator);