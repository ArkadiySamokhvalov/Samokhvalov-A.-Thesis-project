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
                document.getElementById(block.getAttribute('aria-labelledby')).scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
                //this.headers[i].parentNode.classList.remove('slideInUp');
                //this.headers[i].parentNode.classList.add('slideInDown');
              } else {
                this.bodies[i].classList.remove('in');
                // this.headers[i].parentNode.classList.add('slideInUp');
                // this.headers[i].parentNode.classList.remove('slideInDown');
              }
            }
          }
        });
      }
    });
  }
}