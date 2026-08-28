/**
 * PRESENTATION LAYER — toast.js
 * Pure UI component: renders a transient notification. Takes plain data
 * in, touches only the DOM, contains no business logic.
 */
export function toast(title, body, crit = false) {
  const host = document.getElementById('toastHost');
  const el = document.createElement('div');
  el.className = 'toast' + (crit ? ' crit' : '');
  el.innerHTML = `<div class="t-title">${title}</div><div class="t-body">${body}</div>`;
  host.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transition = '.4s';
    setTimeout(() => el.remove(), 400);
  }, 5200);
}
