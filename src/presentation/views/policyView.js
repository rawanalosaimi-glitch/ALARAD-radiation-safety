/**
 * PRESENTATION LAYER — policyView.js
 */
import { getPolicyMapping } from '../../infrastructure/mockRepository.js';

export function renderPolicyTable() {
  document.getElementById('policyTable').innerHTML = getPolicyMapping().map((r) =>
    `<tr><td><span class="node-code">${r.node}</span></td><td>${r.comp}</td><td>${r.risk}</td><td>${r.policy}</td><td>${r.req}</td><td>${r.act}</td></tr>`
  ).join('');
}
