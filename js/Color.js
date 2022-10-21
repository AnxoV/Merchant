/**
 * A color stores and computates any hexadecimal value
 * withe the following format "#xxx", "xxx", "#xxxxxx", "xxxxxx".
 */
export class Color {
    /**
     * @param {String} color The color string (currently only supported as hex)
     */
    constructor(value) {
        this.value = value;
    }

    /**
     * Converts the color from HEX to RGB
     * @returns {{r: Int, g: Int, b: Int}} The RGB color
     */
    toRGB() {
        let hex = this.value.replace("#", "");
        if (this.value.length < 6) {
            hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        let rgb = {
            r: parseInt(this.value.substring(0, 2), 16),
            g: parseInt(this.value.substring(2, 4), 16),
            b: parseInt(this.value.substring(4, 6), 16)
        };
    
        return rgb;
    }
 
    /**
     * Converts the color from HEX to a monochromatic value
     * ranging from 0 to 255
     * @returns {Int} The monochromatic value
     */
    toMono() {
        let rgb = this.toRGB();
        return Math.round(rgb.r*0.299 + rgb.g*0.587 + rgb.b*0.114);
    }
}