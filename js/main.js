import {Slider} from "./Slider.js";

//~~~~~~~~~~~~~~~~~~//

window.onload = function() {
    // Load page sliders
    let sliders = [];
    for(let sl of document.getElementsByClassName("slider")) {
        let slider = new Slider(sl);
        slider.btn1.onclick = () => (slider.slide({x: -1, y: 0}));
        slider.btn2.onclick = () => (slider.slide({x: 1, y: 0}));
        sliders.push(slider);
    }
    //~~~~~~~~~~~~~~~~~~//
};