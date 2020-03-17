'use strict';
export default class Form {
  constructor() {
    this.errorImg = './img/icons/error.png';
    this.loadImg = './img/icons/load.png';
    this.successImg = './img/icons/success.png';
    this.statusMessage = document.createElement('img');
    this.forms = document.querySelectorAll('form');
    this.body = false;
  }

  postData(body) {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }

  statusRotate(i) {
    if (this.statusMessage.classList.contains('rotate')) {
      i += 1;
      this.statusMessage.style.transform = `rotate(${i}deg)`;
      requestAnimationFrame(() => {
        this.statusRotate(i);
      });
    } else {
      this.statusMessage.style.transform = 'rotate(0deg)';
    }
  }

  validation(form) {
    form.querySelectorAll('input').forEach((input) => {
      let regex = '';
      input.addEventListener('keypress', (event) => {
        if (input.getAttribute('name') === 'user_name') {
          regex = /[а-я]/i;
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
      let body = {};
      const formData = new FormData(form);

      formData.forEach((value, key) => {
        body[key] = value;
      });

      if (form.classList.contains('construct-form')) {
        body['calc-result'] = document.querySelector('#calc-result').value;
        this.body = body;
        return;
      }

      if (form.classList.contains('director-form')) {
        this.body = body;
        return;
      }

      form.appendChild(this.statusMessage);
      this.statusMessage.src = this.loadImg;
      this.statusMessage.classList.add('rotate');
      requestAnimationFrame(() => {
        this.statusRotate(0);
      });

      if (this.body) {
        Object.assign(body, this.body);
      }

      this.postData(body)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Ошибка HTTP: ' + response.status);
          }

          this.statusMessage.src = this.successImg;
          this.statusMessage.classList.remove('rotate');


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
          this.statusMessage.classList.remove('rotate');


          setTimeout(() => {
            form.removeChild(this.statusMessage);
          }, 2000);
        });
    });
  }

  init() {
    this.forms.forEach((form) => {
      this.validation(form);
      this.send(form);
    });
  }
}