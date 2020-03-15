'use strict';
export default function loadMore () {
  const sentence = document.querySelector('.sentence'),
  btn = sentence.querySelector('.add-sentence-btn'),
  hiddenBlocks = sentence.querySelectorAll('.hidden');

  btn.addEventListener('click', () => {
    hiddenBlocks.forEach((block) => {
      block.classList.remove('hidden');
    });

    btn.style.display = 'none';
  });
}