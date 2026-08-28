/**
 * PRESENTATION LAYER — anomalyView.js
 * Reads the form, calls the application service, renders the result.
 * No dose/risk math lives in this file — see domain/riskEngine.js.
 */
import { runAnomalyDetection } from '../../application/anomalyService.js';
import { handleSimulateLeak } from './dashboardView.js';
import { showView } from '../navigation.js';

export function handleRunAnomalyModel() {
  const room = document.getElementById('inRoom').value;
  const procMult = document.getElementById('inProc').value;
  const rate = document.getElementById('inRate').value;
  const dur = document.getElementById('inDur').value;
  const dist = document.getElementById('inDist').value;
  const shield = document.getElementById('inShield').value;

  const result = runAnomalyDetection({ room, procMult, rate, dur, dist, shield });
  renderAnomalyResult(room, dur, result);
}

function renderAnomalyResult(room, dur, r) {
  const maxv = Math.max(...r.series, ...r.forecast.next);
  const bars = r.series.map((v) =>
    `<div class="trend-bar" style="height:${(v / maxv * 70 + 6).toFixed(0)}px;background:linear-gradient(180deg,#22d3ee,#0e5b6b)"></div>`
  ).join('') + r.forecast.next.map((v) =>
    `<div class="trend-bar" style="height:${(v / maxv * 70 + 6).toFixed(0)}px;background:linear-gradient(180deg,#fbbf24,#6a4d13)"></div>`
  ).join('');

  document.getElementById('anomalyResult').innerHTML = `
    <div class="result-box risk-${r.riskClass}">
      <span class="risk-badge ${r.riskClass}">${r.riskLabel}</span>
      <div class="calc-line" style="margin-top:10px;">Baseline expected rate for <b>${room}</b> × procedure factor = <b>${r.baseline.toFixed(1)} µSv/h</b></div>
      <div class="calc-line">Deviation from baseline = <b>${(r.deviation * 100).toFixed(0)}%</b></div>
      <div class="calc-line">Distance-corrected, shielding-adjusted effective rate = <b>${r.effectiveRate.toFixed(1)} µSv/h</b></div>
      <div class="calc-line">Projected dose for this ${dur}-minute task = <b>${r.cumulativeDoseMsv.toFixed(3)} mSv</b></div>
      <div class="calc-line">Time-series model recalculated — trailing 6-point series + linear regression forecast, slope = <b>${r.forecast.slope.toFixed(4)}</b> mSv/step</div>
      <div class="calc-line">Forecast next 3 tasks (if pattern continues): <b>${r.forecast.next.map((v) => v.toFixed(3)).join(' → ')}</b> mSv</div>
      <div class="spark">
        <div class="trend-wrap" style="height:80px;">${bars}</div>
        <div style="font-size:9.5px;color:var(--muted2);margin-top:2px;">cyan = observed trailing readings · amber = forecast</div>
      </div>
      ${r.riskClass === 'high' ? '<button class="btn red sm" style="margin-top:10px;" data-action="anomaly-escalate">⚠ Escalate as Anomaly Alert</button>' : ''}
    </div>
  `;
}

export function handleAnomalyEscalate() {
  handleSimulateLeak();
  showView('dashboard');
}
