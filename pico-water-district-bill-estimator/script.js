

class PicoWaterDistrictBillEstimator extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = ``;
    }

    async connectedCallback() {
        await this.loadScript('')
    }

    loadScript(src) {

    }
}