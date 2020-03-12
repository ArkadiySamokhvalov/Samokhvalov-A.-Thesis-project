'use strict';

import PopUp from './modules/PopUp';
import Form from './modules/Form';

document.addEventListener('DOMContentLoaded', () => {

  const popUp = new PopUp();
  const form = new Form();
  popUp.togglePopUp();
  form.addEvents();
});