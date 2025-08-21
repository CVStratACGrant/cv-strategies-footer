import fetchData from "./fetch-data";

class LakePiruWaterLevelMonitor extends HTMLElement {
    constructor() {
        super();
        this._intervalID = null;

        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
        <div style="color: white; font-size: 12px; font-weight: bold; font-family: Mukta; text-align: center;">
            <div id="water-level-stats-1" style="font-size: 24px;"></div>
            <div id="water-level-stats-2"></div>
            <div id="water-level-stats-3"></div>
        </div>
        `;
    }

    connectedCallback() {
        fetchData();
        this._intervalID = setInterval(fetchData, 45 * 60 * 1000); // fetch every 45 minutes
    }

    disconnectedCallback() {
        if (this._intervalID) clearInterval(this._intervalID);
    }
}

customElements.define('lake-piru-water-level-monitor', LakePiruWaterLevelMonitor);