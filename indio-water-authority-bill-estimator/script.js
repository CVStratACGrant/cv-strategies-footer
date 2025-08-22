import { billEstimatorContainer } from "./structure.js";
import { billEstimatorStyle } from "./style.js";


class IndioWaterAuthorityBillEstimator extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
            <style>${billEstimatorStyle}</style>
            ${billEstimatorContainer}
        `;
    }

    async connectedCallback() {
        await this.loadScript('https://cvstratacgrant.github.io/web-components/water-rates-and-charges.js');
        await this.loadScript('https://cvstratacgrant.github.io/web-components/water-core.js');
        await this.loadScript('https://cvstratacgrant.github.io/web-components/water-functions.js');
        await this.loadScript('https://cvstratacgrant.github.io/web-components/water-view.js');
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

customElements.define('indio-water-authority-bill-estimator', IndioWaterAuthorityBillEstimator);