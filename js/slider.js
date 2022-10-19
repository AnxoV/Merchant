const slider = document.getElementById("category_slider");
const slider_content = slider.children[1].children[0]
const slider_button_left = slider.children[0];
const slider_button_right = slider.children[2];
let offset = 0;
let max = 100;

function slide(amount) {
    if (offset - amount < 0)
        offset = 0;
    else if (offset + amount > max)
        offset = max;
    else
        offset += amount;
    slider_content.style.left = offset;
    console.log("a");
}

slider_button_left.onclick = () => (slide(10));
slider_button_right.onclick = () => (slide(-10));