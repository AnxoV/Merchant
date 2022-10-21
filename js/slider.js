/**
 * A slider controls how a group of HTMLElements work together.
 * 
 * In HTML a slider follows this structure:
 *
 *      <div class="slider">
 *          <button class="slider_button"/>
 *          <div class="slider_wrapper">
 *              <ul class="slider_content">
 *                  <li class="slider_item">
 *                  <li class="slider_item">
 *                  <li class="slider_item">
 *              </ul>
 *          </div>
 *          <button class="slider_button"/>
 *      </div>
 * 
 * We can control said slider by clicking on the buttons.
 * For the slider to move correctly the slider_wrapper width must be
 * no more than the width+margins of all slider_items but one
 */
export class Slider {
    /**
     * @param {HTMLElement} slider The element of the slider
     */
    constructor(slider) {
        this.slider = slider;
        
        // Direction control buttons
        this.left_btn = this.slider.children[0];
        this.right_btn = this.slider.children[2];
        
        // <div class="slider_wrapper">
        this.content_wrapper = this.slider.children[1];
        // <ul class="slider_content">
        this.content = this.content_wrapper.children[0];
        // Used to measure the width+margin of a single element
        this.firstChild = this.content.children[0];
        
        // index = actual position // step = amount to move // max = limit of the index
        this.index = 0;
        this.step = this.content.offsetWidth/this.content.children.length;
        this.max = this.slider.children[1].children[0].children.length;
        
        // Difference in width between the slider_item and slider_content
        this.diff = this.content.offsetWidth-this.content_wrapper.offsetWidth;
    }

    /**
     * Moves the offset in a certain direction.
     * @param {Int} d The vector of the direction
     */
    slide(d) {
        let extra = 0;
        let left = parseInt(window.getComputedStyle(this.content).left.replace("px", ""));
        if (left-d*this.step >= 0) {
            this.content.style.left = "0px";
            console.log("fuera de rango i");
        } else if (left-d*this.step <= -this.content_wrapper.offsetWidth) {
            this.content.style.left = `${-this.content_wrapper.offsetWidth}px`;
            console.log("fuera de rango d");
                   // Check if slider_content will surpass the slider_Wrapper
                   // We don't want it to happen because it creates empty whitespace
        } else {
            this.content.style.left = `${(left-d*this.step)}px`;
        }
        console.log(`Left: ${left}, Step: ${this.step}, WW: ${this.content_wrapper.offsetWidth}, CW: ${this.content.offsetWidth}, Diff: ${this.diff}`);
    }
}