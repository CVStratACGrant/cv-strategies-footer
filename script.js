/**
 * # How to use custom attributes
 *
 * ## General Usage
 *
 * #### Supported Attributes
 * [
 *   'background-color',
 *   'contributor-prefix',
 *   'contributor',
 *   'link',
 *   'link-hover-color',
 *   'text-align',
 *   'font-size'
 * ]
 *
 * To apply custom attributes, add them directly to the `<cv-strategies-footer>` tag in the format:
 *
 * <cv-strategies-footer custom-attribute="value">
 *
 * Example:
 * <cv-strategies-footer background-color="#008000" contributor-prefix=" Maintained by ">
 *
 * ---
 *
 * ## Attribute Specifications
 *
 * #### Default Footer Text
 * By default, the footer text is:
 * 
 * © Copyright 2025 | All Rights Reserved. Designed by CV Strategies.
 *
 * | Attribute            | Default value                                                                 |
 * |----------------------|--------------------------------------------------------------------------------|
 * | `contributor`        | "CV Strategies"                                                                |
 * | `contributor-prefix` | " Designed by "                                                                |
 * | `link`               | "https://cvstrat.com/"                                                         |
 * | `link-hover-color`   | Calculated dynamically based on contrast rules, can be overridden manually.   |
 * | `background-color`   | "#FFFFFF"                                                                      |
 * | `text-align`         | "center"                                                                       |
 * | `font-size`          | "16px"                                                                         |
 *
 * #### Rules/Constraints for each attribute
 *
 * contributor:
 *   - Purpose: Sets the name of the designer or organization.
 *   - Example: <cv-strategies-footer contributor="New Contributor">
 *
 * contributor-prefix:
 *   - Purpose: Change the verbage before the contributor name.
 *   - Rule: Must include spaces before and after the text.
 *   - Example: <cv-strategies-footer contributor-prefix=" New Prefix ">
 *
 * link:
 *   - Purpose: Sets link embed on the contributor text.
 *   - Example: <cv-strategies-footer link="https://contributor-link.com">
 *
 * link-hover-color:
 *   - Purpose: Set color on hover for the link text.
 *   - Accepts hex code or WordPress theme color variable.
 *   - Example: <cv-strategies-footer link-hover-color="#00c000">
 *   - WP Example: <cv-strategies-footer link-hover-color="--awb-custom_color1">
 *   - Notes:
 *     - Drop `var()` and just use the variable name.
 *     - Find variable via:
 *       1. Avada Menu > Options > Colors.
 *       2. Inspect element > CSS styles.
 *
 * background-color:
 *   - Purpose: Sets the background color of the footer.
 *   - Accepts hex or theme color variable (reference link-hover-color for instructions).
 *   - Example: <cv-strategies-footer background-color="#cc0000">
 *   - WP Example: <cv-strategies-footer background-color="--awb-custom_color7">
 *
 * text-align:
 *   - Purpose: Change text alignment of the footer.
 *   - Accepts standard CSS values.
 *   - Example: <cv-strategies-footer text-align="left">
 *
 * font-size:
 *   - Purpose: Set the size of the footer text.
 *   - Accepts standard CSS values.
 *   - Example: <cv-strategies-footer font-size="2rem">
 */
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
        const backgroundColor = this.getAttribute('background-color')?.trim() ?? parentBackgroundColor;

        let resolvedColor = backgroundColor;
        if (backgroundColor.startsWith('--')) resolvedColor = this.resolveCssVariable(backgroundColor);

        this.setAccessibleTextColor(resolvedColor);

        const wrapper = this.shadowRoot.getElementById('cv-strategies-footer-wrapper');
        if (this.isValidHex(resolvedColor)) wrapper.style.backgroundColor = resolvedColor;
    }

    setAccessibleTextColor(color) {
        const rgb = color.startsWith('rgb') ? this.formatRgb(color) : this.parseHexToRgb(color);

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

    formatRgb(rgbString) {
          return rgbString
            .match(/\(([^)]+)\)/)[1] // Extract inside of parentheses
            .split(',') // Split by commas
            .map(val => val.trim()) // Trim whitespace
            .map(val => +val); // Convert to numbers
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