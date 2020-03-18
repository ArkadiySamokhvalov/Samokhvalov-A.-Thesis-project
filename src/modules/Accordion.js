'use strict';

export default class Accordion {
  constructor(container, elemHeadClass, elemBodyClass, indexElement) {
    this.container = document.querySelector(container);
    this.headers = this.container.querySelectorAll(elemHeadClass);
    this.bodies = this.container.querySelectorAll(elemBodyClass);
    this.indexes = this.container.querySelectorAll(indexElement);
    this.elemHeadClass = elemHeadClass;
  }

  togglePanel() {
    this.container.addEventListener('click', (event) => {
      let target = event.target.closest(this.elemHeadClass);

      if (target) {
        event.preventDefault();
        this.headers.forEach((elem, index) => {
          if (elem === target) {
            for (let i = 0; i < this.bodies.length; i++) {
              if (i === index) {
                this.bodies[i].classList.add('in');
                let block = this.container.querySelector(this.indexes[i].getAttribute('href'));
              } else {
                this.bodies[i].classList.remove('in');
              }
            }
          }
        });
      }
    });
  }
}