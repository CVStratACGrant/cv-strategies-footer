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
        this.fetchData();
        this._intervalID = setInterval(this.fetchData, 45 * 60 * 1000); // fetch every 45 minutes
    }

    disconnectedCallback() {
        if (this._intervalID) clearInterval(this._intervalID);
    }

    async fetchData() {
        try {
            const response = await fetch('https://waterservices.usgs.gov/nwis/iv/?sites=11109700&agencyCd=USGS&parameterCd=00054&period=P7D&siteStatus=all&format=json');
            const data = await response.json();
            const waterLevelStats1 = this.shadowRoot.getElementById('water-level-stats-1');
            const waterLevelStats2 = this.shadowRoot.getElementById('water-level-stats-2');
            const waterLevelStats3 = this.shadowRoot.getElementById('water-level-stats-3');
            const targetSiteName = 'LK PIRU NR PIRU CA';
            
            const timeSeriesData = data.value.timeSeries[0];
            const waterLevelUnitName = timeSeriesData.variable.unit.unitCode;
            const waterLevelValues = timeSeriesData.values[0].value;
            const latestWaterLevelValue = waterLevelValues[waterLevelValues.length - 1];
        
            if (!waterLevelValues.length || timeSeriesData.sourceInfo.siteName !== targetSiteName) {
            waterLevelStats1.innerText = 'No data available.'
            } else {
                const waterLevel = latestWaterLevelValue.value;
                const timestamp = new Date(latestWaterLevelValue.dateTime);
                const formattedTimestamp = timestamp.toLocaleString('en-US', { timeZoneName: 'short' });
                
                const reservoir_capacity = 83240 // acre-ft, source: https://waterdata.usgs.gov/nwis/wys_rpt/?site_no=11109700
                
                const percentBelowCapacity = (100 - (((waterLevel / reservoir_capacity) * 100))).toFixed(2);
                
                waterLevelStats1.innerText = `${percentBelowCapacity}%`;
                waterLevelStats2.innerText = `1 - (${waterLevel} ${waterLevelUnitName} / ${reservoir_capacity} ${waterLevelUnitName})`;
                waterLevelStats3.innerText = formattedTimestamp;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            const waterLevelStats1 = document.getElementById('water-level-stats-1');
            waterLevelStats1.innerText = 'Failed to fetch data.';
        }
    }
}

customElements.define('lake-piru-water-level-monitor', LakePiruWaterLevelMonitor);