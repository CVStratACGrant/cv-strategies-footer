import { billEstimatorContainer } from "./structure";
import { billEstimatorStyle } from "./style";

class CityOfOntarioBillEstimator extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
            <style>${billEstimatorStyle}</style>
            ${billEstimatorContainer}
        `;
    }

    async connectedCallback() {
        try {
            await this.loadScript('https://cvstratacgrant.github.io/web-components/city-of-ontario-bill-estimator/rates-and-charges.js');
            await this.loadScript('https://cvstratacgrant.github.io/web-components/city-of-ontario-bill-estimator/core.js');
            await this.loadScript('https://cvstratacgrant.github.io/web-components/city-of-ontario-bill-estimator/function.js');
            await this.loadScript('https://cvstratacgrant.github.io/web-components/city-of-ontario-bill-estimator/view.js');
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

customElements.define('city-of-ontario-bill-estimator', CityOfOntarioBillEstimator);