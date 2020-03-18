'use strict';
export default class PopUp {
  constructor() {
    this.popUpCall = document.querySelector('.popup-call');
    this.popUpDiscount = document.querySelector('.popup-discount');
    this.popUpCheck = document.querySelector('.popup-check');
    this.popUpConsultation = document.querySelector('.popup-consultation');
    this.activePopUp = null;
  }

  togglePopUp() {
    document.addEventListener('click', (event) => {
      let target = event.target;

      if (target.matches('a.call-btn')) {
        event.preventDefault();
      }

      if (target.matches('.call-btn')) {
        this.popUpCall.classList.add('active');
        this.activePopUp = this.popUpCall;
      }

      if (target.matches('.discount-btn')) {
        this.popUpDiscount.classList.add('active');
        this.activePopUp = this.popUpDiscount;
      }

      if (target.matches('.check-btn')) {
        this.popUpCheck.classList.add('active');
        this.activePopUp = this.popUpCheck;
      }

      if (target.matches('.consultation-btn')) {
        this.popUpConsultation.classList.add('active');
        this.activePopUp = this.popUpConsultation;
      }

      if (this.activePopUp) {
        let targetContent = target.closest('.popup-content');

        if (target.matches('.popup-close') || (target.matches('.popup') && !targetContent)) {
          this.activePopUp.classList.remove('active');
        }
      }
    });
  }
}