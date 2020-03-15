'use strict';
export default class Calculator {
  constructor() {
    this.container = document.querySelector('.constructor');
    this.blocks = this.container.querySelectorAll('.panel-collapse');
    this.btns = this.container.querySelectorAll('a.construct-btn');
    this.checkbox = this.container.querySelector('#myonoffswitch');
    this.checkbox2 = this.container.querySelector('#myonoffswitch-two');
    this.selectD = this.container.querySelectorAll('.diametr');
    this.selectQ = this.container.querySelectorAll('.quantity');
    this.result = this.container.querySelector('#calc-result');

    this.type = true;
    this.diametr = false;
    this.quantity = false;
    this.bottom = true;
  }

  calculate(type, diametr, quantity, bottom) {
    let sum = 0,
      base = 0;

    if (type) {
      base = 10000;
      sum = base;
      sum += (bottom) ? 1000 : 0;
      sum += (+diametr === 2) ? base * 0.2 : 0;
      sum += (+quantity === 2) ? base * 0.3 : (+quantity === 3) ? base * 0.5 : 0;
    } else {
      base = 15000;
      sum = base;
      sum += (bottom) ? 2000 : 0;
      sum += (+diametr.first === 2) ? base * 0.2 : 0;
      sum += (+quantity.first === 2) ? base * 0.3 : (+quantity.first === 3) ? base * 0.5 : 0;
      sum += (+diametr.second === 2) ? base * 0.2 : 0;
      sum += (+quantity.second === 2) ? base * 0.3 : (+quantity.second === 3) ? base * 0.5 : 0;
    }
    return Math.ceil(sum);
  }

  sumAnimate(k, sum) {
    if (k <= sum) {
      let whole = sum / 10,
        remainder = sum % 10;

      if (k === (sum - remainder)) {
        k += remainder;
      } else {
        k += whole;
      }

      this.result.value = k;
      requestAnimationFrame(() => {
        this.sumAnimate(k, sum);
      });
    }
  }

  addEvents() {
    this.btns.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        let nextBlock = document.querySelector(`${btn.getAttribute('href')}`);

        this.blocks.forEach((block) => {
          if (block !== nextBlock) {
            block.classList.remove('in');
          }
        });

        nextBlock.classList.add('in');
        document.getElementById(nextBlock.getAttribute('aria-labelledby')).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });

    this.container.addEventListener('change', (event) => {
      let target = event.target;

      if (target === this.checkbox) {
        let secondBlock = this.container.querySelector('.second_block');
        if (this.checkbox.checked) {
          this.type = true;
          secondBlock.classList.add('hidden');
          this.diametr = this.selectD[0].value;
          this.quantity = this.selectQ[0].value;
        } else {
          secondBlock.classList.remove('hidden');
          this.type = false;
          this.diametr = {
            first: this.selectD[0].value,
            second: this.selectD[1].value
          };
          this.quantity = {
            first: this.selectQ[0].value,
            second: this.selectQ[1].value
          };
        }
      }

      if (target === this.checkbox2) {
        this.bottom = (this.checkbox2.checked) ? true : false;
      }

      if (target === this.selectD[0] || target === this.selectD[1]) {
        this.diametr = (this.type) ?
          this.selectD[0].value : {
            first: this.selectD[0].value,
            second: this.selectD[1].value
          };
      }

      if (target === this.selectQ[0] || target === this.selectQ[1]) {
        this.quantity = (this.type) ?
          this.selectQ[0].value : {
            first: this.selectQ[0].value,
            second: this.selectQ[1].value
          };
      }

      requestAnimationFrame(() => {
        this.sumAnimate(0, this.calculate(this.type, this.diametr, this.quantity, this.bottom));
      });
    });
  }

  init() {
    requestAnimationFrame(() => {
      this.sumAnimate(0, this.calculate(this.type, this.diametr, this.quantity, this.bottom));
    });
    this.addEvents();
  }
}