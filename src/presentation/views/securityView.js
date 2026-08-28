/**
 * PRESENTATION LAYER — securityView.js
 * Renders the "Data Sources" mapping and the "Proposed Security
 * Architecture" summary on the Data Security page. Both are prototype
 * documentation, not live integrations — labeled as such in the markup.
 */
import { getDataSources, getSecurityArchitecture } from '../../infrastructure/mockRepository.js';

export function renderDataSources() {
  const el = document.getElementById('dataSourcesList');
  if (!el) return;
  el.innerHTML = getDataSources().map((d) => `
    <div class="datasrc-row">
      <div class="dsi">${d.icon}</div>
      <div class="dsn">${d.source}</div>
      <div class="dsp">→ ${d.provides}</div>
    </div>`
  ).join('');
}

export function renderSecurityArchitecture() {
  const el = document.getElementById('securityArchGrid');
  if (!el) return;
  el.innerHTML = getSecurityArchitecture().map((s) => `
    <div class="sensor-card">
      <div class="sic">${s.ico}</div>
      <div class="sname">${s.name}</div>
      <div class="sunit" style="margin-top:4px;">${s.note}</div>
    </div>`
  ).join('');
}
