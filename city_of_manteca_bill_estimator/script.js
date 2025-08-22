

class CityOfMantecaBillEstimator extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            
        `;
    }
}

customElements.define('city-of-manteca-bill-estimator', CityOfMantecaBillEstimator);