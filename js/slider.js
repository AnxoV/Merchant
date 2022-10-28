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
*               <div class="slider_item">
*               <div class="slider_item">
*               <div class="slider_item">
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
        this.content = this.element.children[1];
        
        // stepxy = amount to move
        this.mult = 1.5;
        this.step = {
            x: this.mult * this.content.offsetWidth/this.content.children.length,
            y: this.mult * this.content.offsetHeight/this.content.children.length
        };
    }

    /**
     * Moves the offset in a certain direction.
     * @param {{x: Int, y: Int}} v The vector of the direction
     */
    slide(v) {
        this.content.scrollBy(v.x*this.step.x, v.y*this.step.y);
    }
}