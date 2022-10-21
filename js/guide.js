import {Slider} from "./Slider.js";
import {Color} from "./Color.js";

// Helper functions

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
 * @param {String} key The variable name
 * @param {Color} color The {@link Color}
 * @returns A HTML structure for displaying colors on the guia.html page
 */
function template(key, color) {
    return `<div class="color-container">
                <div class="color" style="--color: ${color.value};">
                    <h4 class="color-hex ${color.toMono() < 100 ? "light" : "dark"}-c">${color.value}</h4>
                </div>
                <h5>${key}</h5>
            </div>`;
}

//~~~~~~~~~~~~~~~~~~//

window.onload = async function() {

    // Load page sliders
    let sliders = [];
    for(let sl of document.getElementsByClassName("slider")) {
        let slider = new Slider(sl);
        slider.left_btn.onclick = () => (slider.slide(-1));
        slider.right_btn.onclick = () => (slider.slide(1));
        sliders.push(slider);
    }
    //~~~~~~~~~~~~~~~~~~//
    // Load page colors example
    let colors_container = document.getElementById("colors-container");
    let colors_file = "http://localhost/Merchant/css/_colors.css";
    let colors = getVars(await readFile(colors_file));
    for (let [key, value] of Object.entries(colors)) {
        let color = new Color(value);
        colors_container.innerHTML += template(key, color);
    }
    //~~~~~~~~~~~~~~~~~~//
};