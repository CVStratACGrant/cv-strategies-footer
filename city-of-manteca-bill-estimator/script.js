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
            await this.loadScript('https://cvstratacgrant.github.io/web-components/city-of-manteca-bill-estimator/sewer-rates-and-charges.js'),
            await this.loadScript('https://cvstratacgrant.github.io/web-components/city-of-manteca-bill-estimator/sewer-view.js'),
            await this.loadScript('https://cvstratacgrant.github.io/web-components/city-of-manteca-bill-estimator/sewer-functions.js'),
            await this.loadScript('https://cvstratacgrant.github.io/web-components/city-of-manteca-bill-estimator/sewer-core.js')
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