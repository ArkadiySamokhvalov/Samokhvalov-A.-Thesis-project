'use strict';
export default class Form {
  constructor() {
    this.errorImg = '../img/icons/error.png';
    this.loadImg = '../index.js../img/icons/load.png';
    this.successImg = '../img/icons/success.png';
    this.statusMessage = document.createElement('img');
    this.forms = document.querySelectorAll('form');
  }

  postData(body) {
    return fetch('../server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }

  validation(form) {
    form.querySelectorAll('input').forEach((input) => {
      let regex = '';
      input.addEventListener('keypress', (event) => {
        if (input.getAttribute('name') === 'user_name') {
          regex = /[а-я]/i;
        } else if (input.getAttribute('name') === 'user_phone') {
          regex = /[\d]/;
        }

        if (!event.key.match(regex)) {
          event.preventDefault();
        }
      });
    });
  }

  send(form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        form.appendChild(this.statusMessage);
        this.statusMessage.src = this.loadImg;

        const formData = new FormData(form);
        let body = {};

        formData.forEach((value, key) => {
          body.key = value;
        });


        this.postData(body)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Ошибка HTTP: ' + response.status);
            }

            this.statusMessage.src = this.successImg;

            form.querySelectorAll('input').forEach((input) => {
              input.value = '';
            });

            setTimeout(() => {
              form.removeChild(this.statusMessage);
            }, 2000);
          })
          .catch((error) => {
            console.log(error);

            this.statusMessage.src = this.errorImg;

            setTimeout(() => {
              form.removeChild(this.statusMessage);
            }, 2000);
          });
    });
  }

  addEvents() {
    this.forms.forEach((form) => {
      this.validation(form);
      this.send(form);
    });
  }
}