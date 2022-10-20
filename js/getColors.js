/**
 * Parses the content of a file looking
 * for css variables (--var_name: value)
 * @param {String} content The content of the file
 * @returns {{string: String}} The css variables
 */
function getVars(content) {
    let vars = {};
    let matches = content.match(/(--)\w.+;/gi);
    matches.forEach(match => {
        let split = match.split(":");
        let value = split[1].toString().trim();
        vars[split[0]] = value.slice(0, -1);
    });
    return vars;
}

/**
 * @async
 * @param {String} file Location of the file
 * @returns The contents of the file
 */
async function readFile(file) {
    return await fetch(file)
        .then(r => r.text())
        .then(r => r);
}


/**
 * Converts any six-degit hexadecimal
 * @param {String} hex The hexadecimal value without the #
 * @returns {{r: Int, g: Int, b: Int}} The rgb value
 */
function toRGB(hex) {
    hex = hex.replace("#", "");
    if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    let rgb = {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16)
    };

    return rgb;
}

/**
 * Converts any rgb value to a monochrome value
 * ranging between 0 and 255
 * @param {{r: Int, g: Int, b: Int}} rgb The rgb value
 * @return {Int} The monochrome value
 */
function toMono(rgb) {
    return Math.round(rgb.r*0.299 + rgb.g*0.587 + rgb.b*0.114);
}

/**
 * Evaluates if any rgb value is dark enough
 * @param {{r: Int, g: Int, b: Int}} rgb The rgb value
 * @return {boolean} true if the color is dark enough, false otherwise
 */
function isDark(rgb) {
    let mono = toMono(rgb);
    if (mono < 100) {
        return true;
    }
    return false;
}

/**
 * @param {String} key The variable name
 * @param {String} value The value of the variable
 * @returns A HTML structure for displaying colors on the guia.html page
 */
function template(key, value) {
    return `<div class="color-container">
                <div class="color" style="--color: ${value};">
                    <h4 class="color-hex ${isDark(toRGB(value)) ? "light" : "dark"}-c">${value}</h4>
                </div>
                <h5>${key}</h5>
            </div>`;
}
/**
    const container = document.getElementById("colors_container");
    const colors_file = "http://localhost/Merchant/css/_colors.css";
    const color_vars = getVars(await readFile(colors_file));
    for (const [key, value] of Object.entries(color_vars)) {
        container.innerHTML += template(key, value);
    } */