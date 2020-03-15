'use strict';

// import 'nodelist-foreach-polyfill';
// import '@babel/polyfill';
// import 'formdata-polyfill';
// import 'es6-promise/auto';
// import 'dom-node-polyfills';
// import 'fetch-polyfill';
// import elementClosest from 'element-closest';
// elementClosest(window);
// import smoothscroll from 'smoothscroll-polyfill';
// smoothscroll.polyfill();

import PopUp from './modules/PopUp';
import Form from './modules/Form';
import Accordion from './modules/Accordion';
import Calc from './modules/Calc';
import InputMask from './modules/InputMask';
import loadMore from './modules/loadMore';

document.addEventListener('DOMContentLoaded', () => {
  const accordionOne = new Accordion('#accordion', '.panel-heading', '.panel-collapse', 'a.collapsed'),
    accordionTwo = new Accordion('#accordion-two', '.panel-heading', '.panel-collapse', 'a.collapsed'),
    inputs = document.querySelectorAll('input[name="user_phone"]');

  accordionOne.togglePanel();
  accordionTwo.togglePanel();
  new Calc().init();
  new PopUp().togglePopUp();
  new Form().init();
  Array.prototype.forEach.call(inputs, function (input) {
    new InputMask({
      selector: input,
      layout: input.dataset.mask
    });
  });
  loadMore();
});