/**
 * PRESENTATION LAYER — recommendationsView.js
 */
import { listRecommendations, listExposureLog } from '../../application/recommendationsService.js';

export function renderRecommendations() {
  document.getElementById('recList').innerHTML = listRecommendations().map((r) => `
    <div class="card" style="margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;">
        <h3 style="margin:0;">${r.title}</h3>
        <span class="tag-warn">${r.tag}</span>
      </div>
      <p style="color:var(--muted);font-size:12px;margin-top:8px;">${r.why}</p>
      <div style="margin-top:10px;"><button class="btn sm solid">Apply Recommendation</button> <button class="btn sm ghost">Dismiss</button></div>
    </div>`
  ).join('');
}

export function renderExposureLog() {
  document.getElementById('expTable').innerHTML = listExposureLog().map((r) =>
    `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td></tr>`
  ).join('');
}
