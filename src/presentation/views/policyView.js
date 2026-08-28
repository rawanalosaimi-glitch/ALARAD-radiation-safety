/**
 * PRESENTATION LAYER — policyView.js
 */
import { getPolicyMapping, getPolicyGaps } from '../../infrastructure/mockRepository.js';

export function renderPolicyTable() {
  document.getElementById('policyTable').innerHTML = getPolicyMapping().map((r) =>
    `<tr><td><span class="node-code">${r.node}</span></td><td>${r.comp}</td><td>${r.risk}</td><td>${r.policy}</td><td>${r.req}</td><td>${r.act}</td></tr>`
  ).join('');
}

export function renderPolicyGaps() {
  const el = document.getElementById('policyGapsList');
  if (!el) return;
  el.innerHTML = getPolicyGaps().map((g) =>
    `<div class="gap-item"><div class="gt">${g.title}</div><div class="gd">${g.text}</div></div>`
  ).join('');
}
