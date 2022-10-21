import {Slider} from "./Slider.js";

//~~~~~~~~~~~~~~~~~~//

window.onload = function() {
    // Load page sliders
    let sliders = [];
    for(let sl of document.getElementsByClassName("slider")) {
        let slider = new Slider(sl);
        slider.left_btn.onclick = () => (slider.slide(-1));
        slider.right_btn.onclick = () => (slider.slide(1));
        sliders.push(slider);
    }
    //~~~~~~~~~~~~~~~~~~//
};