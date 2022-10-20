function getColors(string) {
    let colors = {};
    let matches = string.match(/(--)\w.+;/gi);
    matches.forEach(match => {
        let split = match.split(":");
        let value = split[1].toString();
        colors[split[0]] = value.slice(0, -1);
    });
    return colors;
}

async function readFile(file) {
    return await fetch(file)
        .then(r => r.text())
        .then(r => r);
}



function toRGB(hex) {
    let rgb = [];
    for (let i = 0; i < 3; i++) {
        let color = parseInt(hex.substr(i*2,2), 16);
        console.log(color);
        rgb[i] = color;
    }
	/*for (i = 0; i < 3; i++) {

		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}*/
    return rgb;
}

function isDark(value) {

}

function template(key, value) {
    return `<div class="color-container">
                <div class="color" style="--color: var(${key});">
                    <h4 class="color-hex dark-c">${value}</h4>
                </div>
                <h5>${key}</h5>
            </div>`;
}

window.onload = async function() {
    const container = document.getElementById("colors_container");
    const file = "http://localhost/Merchant/css/_colors.css";
    const colors = getColors(await readFile(file));
    console.log(colors);
    for (const [key, value] of Object.entries(colors)) {
        container.innerHTML += template(key, value);
    }
    console.log(toRGB("000000"));
};