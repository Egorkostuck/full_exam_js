export const $ = selector => {
    return document.querySelector(selector);
};

export const getElement = selector => {
    return document.getElementById(selector);
};

Object.prototype.addTo = function(selector) {
    const mySelector = $(selector);
    mySelector.appendChild(this);
};

Object.prototype.addClass = function(className) {
    this.classList.add(className);
    return this;
};

Object.prototype.listener = function(type, func) {
    this.addEventListener(type, func);
    return this;
};