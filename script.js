class CVStrategiesFooter extends HTMLElement {
    constructor() {
        super();
        
        this.currentYear = (new Date()).getFullYear();
        
        this.attachShadow({ mode: "open" });
    }
    
    render() {
        this.shadowRoot.innerHTML = `
            <style id="cv-strategies-footer-style"></style>

            <div id="cv-strategies-footer-wrapper" style="font-size: ${this.getFontSize()}; text-align: ${this.getTextAlign()}; margin: 0; padding: 0; width: 100vw;">
                <p id="cv-strategies-footer-text" style="margin:0; padding:0;">
                    © Copyright ${this.currentYear} | All Rights Reserved.${this.getContributorPrefix()}
                    <a id="cv-strategies-footer-link" href="${this.getSiteLink()}" target="_blank">${this.getContributor()}</a>.
                </p>
            </div>
        `;
    }

    connectedCallback() {
        this.render();
        this.setBackgroundColor();
    }


    static observedAttributes = ['background-color', 'contributor-prefix', 'contributor', 'link', 'link-hover-color', 'text-align', 'font-size'];
    attributeChangedCallback (name, oldAttribute, newAttribute) {
        if (oldAttribute !== newAttribute) this.render();
    }
    
    resolveCssVariable(variableName) {
        const style = getComputedStyle(this);
        const resolved = style.getPropertyValue(variableName)?.trim();
        return resolved || null;
    }

    getSiteLink() {
        return this.getAttribute('link')?.trim() ?? 'https://cvstrat.com/';
    }
    
    getContributorPrefix() {
        return this.getAttribute('contributor-prefix') ?? ' Designed by ';
    }
    
    getContributor() {
        return this.getAttribute('contributor')?.trim() ?? 'CV Strategies';
    }

    getTextAlign() {
        return this.getAttribute('text-align')?.trim() ?? 'center';
    }

    getFontSize() {
        return this.getAttribute('font-size')?.trim() ?? '16px';
    }

    setLinkHoverColor(accessibleTextColor) {
        const linkHoverColor = this.getAttribute('link-hover-color')?.trim();
        let resolvedHoverColor = linkHoverColor;
        
        if (!linkHoverColor) {
            const accessibleLinkHoverColorFallback = accessibleTextColor === '#000000'
                ? this.adjustColorBrightness(accessibleTextColor, 25)
                : this.adjustColorBrightness(accessibleTextColor, -25);
            resolvedHoverColor = accessibleLinkHoverColorFallback;
        }
        
        if (resolvedHoverColor.startsWith('--')) resolvedHoverColor = this.resolveCssVariable(linkHoverColor);
        if (this.isValidHex(linkHoverColor)) resolvedHoverColor = linkHoverColor;

        this.shadowRoot.getElementById('cv-strategies-footer-style').textContent += `
            #cv-strategies-footer-link {
                transition: color 0.2s ease;
            }

            #cv-strategies-footer-link:hover {
                color: ${resolvedHoverColor};
            }
        `;
    }

    setBackgroundColor() {
        const parentBackgroundColor = getComputedStyle(this.parentElement).backgroundColor;
        console.log(parentBackgroundColor)
        const backgroundColor = this.getAttribute('background-color')?.trim() ?? parentBackgroundColor;

        let resolvedColor = backgroundColor;
        if (backgroundColor.startsWith('--')) resolvedColor = this.resolveCssVariable(backgroundColor);

        this.setAccessibleTextColor(resolvedColor);

        const wrapper = this.shadowRoot.getElementById('cv-strategies-footer-wrapper');
        if (this.isValidHex(resolvedColor)) wrapper.style.backgroundColor = resolvedColor;
    }

    setAccessibleTextColor(hexColor) {
        const rgb = this.parseHexToRgb(hexColor);
        if (!rgb) return '#000000';

        const [red, green, blue] = rgb.map(channel => {
            const normalized = channel / 255;
            return normalized <= 0.03928
                ? normalized / 12.92
                : Math.pow((normalized + 0.055) / 1.055, 2.4);
        });

        const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
        const accessibleTextColor = luminance > 0.5 ? '#000000' : '#ffffff';

        this.setLinkHoverColor(accessibleTextColor);
        
        this.shadowRoot.getElementById('cv-strategies-footer-style').textContent += `
            #cv-strategies-footer-text,
            #cv-strategies-footer-link {
                color: ${accessibleTextColor};
            }
        `;
    }

    parseHexToRgb(hexColor) {
        if (!this.isValidHex(hexColor)) return null;

        const hex = hexColor.replace('#', '');

        const fullHex = hex.length === 3
            ? hex.split('').map(char => char + char).join('') // abc -> aabbcc
            : hex;

        const numericValue = parseInt(fullHex, 16); // aabbcc -> 11189196
        const red = (numericValue >> 16) & 255; // >> 16 shifts to the leftmost 8 bits
        const green = (numericValue >> 8) & 255; // >> 8 shifts to the middle 8 bits
        const blue = numericValue & 255; // & 255 masks just the last 8 bits

        return [red, green, blue];
    }

    adjustColorBrightness(hexColor, percent) {
        const rgb = this.parseHexToRgb(hexColor);
        if (!rgb) return hexColor;

        const adjusted = rgb.map(channel => {
            const adjustedChannel = Math.round(channel + (percent / 100) * 255);
            return Math.min(255, Math.max(0, adjustedChannel));
        });

        return '#' + adjusted.map(channel => channel.toString(16).padStart(2, '0')).join('');
    }


    isValidHex(color) {
        return /^#([0-9a-gA-F]{3}){1,2}/i.test(color);
    }
}

customElements.define('cv-strategies-footer', CVStrategiesFooter);