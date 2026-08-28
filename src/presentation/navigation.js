/**
 * PRESENTATION LAYER — navigation.js
 * Switches the visible .view container and highlights the active
 * sidebar item. Pure DOM/UI concern — no business logic.
 */
export function showView(id) {
  document.querySelectorAll('.view').forEach((v) => v.classList.remove('active'));
  document.getElementById('view-' + id).classList.add('active');
  document.querySelectorAll('.nav-item').forEach((n) => n.classList.remove('active'));
  const active = document.querySelector(`.nav-item[data-view="${id}"]`);
  if (active) active.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function initNavigation() {
  document.querySelectorAll('.nav-item').forEach((n) => {
    n.addEventListener('click', () => showView(n.dataset.view));
  });
}
