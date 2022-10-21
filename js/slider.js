/**
 * To-do:
 *  - Change the slider to be a hidden scrollbar controlled by JS
 */

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
        this.element = slider;
        
        // Direction control buttons
        this.btn1 = this.element.children[0];
        this.btn2 = this.element.children[2];
        
        // <div class="slider_wrapper">
        this.content_wrapper = this.element.children[1];
        // <ul class="slider_content">
        this.content = this.content_wrapper.children[0];
        // Used to measure the width+margin of a single element
        this.firstChild = this.content.children[0];
        
        // step = amount to move
        this.mult = 1.5;
        this.stepx = this.mult * this.content.offsetWidth/this.content.children.length;
        this.stepy = this.mult * this.content.offsetHeight/this.content.children.length;

        this.left = 0;
        this.top = 0;
    }

    /**
     * Moves the offset in a certain direction.
     * @param {{x: Int, y: Int}} v The vector of the direction
     */
    slide(v) {
        if (this.left-v.x*this.stepx >= 0) {
            this.left = 0;
        } else if (this.left-v.x*this.stepx <= this.content_wrapper.offsetWidth-this.content.offsetWidth) {
            this.left = this.content_wrapper.offsetWidth-this.content.offsetWidth;
        } else {
            this.left -= v.x*this.stepx;
        }

        if (this.top-v.y*this.stepy >= 0) {
            this.top = 0;
        } else if (this.top-v.y*this.stepy <= this.content_wrapper.offsetHeight-this.content.offsetHeight) {
            this.top = this.content_wrapper.offsetHeight-this.content.offsetHeight
        } else {
            this.top -= v.y*this.stepy;
        }

        this.content.style.left = `${this.left}px`;
        this.content.style.top = `${this.top}px`;
    }
}