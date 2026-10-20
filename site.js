/* global document, navigator */
'use strict';
const preview = document.querySelector('#app-preview');
for (const button of document.querySelectorAll('[data-preview]')) {
  button.addEventListener('click', () => {
    const theme = button.dataset.preview;
    if (!['light', 'dark', 'blue', 'green'].includes(theme) || !preview) return;
    for (const choice of document.querySelectorAll('[data-preview]')) {
      choice.setAttribute('aria-pressed', String(choice === button));
    }
    preview.src = `assets/app-${theme}.png`;
    preview.alt = `Download Manager Settings in the ${theme[0].toUpperCase() + theme.slice(1)} theme, showing appearance and download controls`;
  });
}
for (const button of document.querySelectorAll('[data-copy]')) {
  button.addEventListener('click', async () => {
    const address = button.dataset.copy;
    const status = document.querySelector('#copy-status');
    if (!address || !status) return;
    try {
      await navigator.clipboard.writeText(address);
      status.textContent = `Copied ${address}. Paste it into your browser address bar.`;
      button.textContent = `Copied ${address.startsWith('chrome') ? 'Chrome' : 'Edge'} address`;
    } catch {
      status.classList.remove('sr-only');
      status.textContent = `Copy this address manually: ${address}`;
    }
  });
}
