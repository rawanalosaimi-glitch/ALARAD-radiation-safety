/**
 * PRESENTATION LAYER — main.js
 * -----------------------------------------------------------------------
 * Composition root: this is the ONLY file that wires the layers together
 * and touches global DOM event listeners. All click handling is done via
 * a single delegated listener reading data-action attributes — no inline
 * onclick="" anywhere, so every handler stays properly scoped to its
 * ES module instead of leaking onto window.
 * -----------------------------------------------------------------------
 */
import { initNavigation } from './navigation.js';
import { renderDashboard, handleSimulateLeak, handleViewAllAlerts } from './views/dashboardView.js';
import { renderStaffTable, handleStaffGps } from './views/staffView.js';
import { renderAlerts, handleAckAlert, handleEscalateAlert } from './views/alertsView.js';
import { renderRecommendations, renderExposureLog } from './views/recommendationsView.js';
import { handleRunAnomalyModel, handleAnomalyEscalate, renderAiInputs } from './views/anomalyView.js';
import { renderWearableView, handleRotateDevice } from './views/wearableView.js';
import { renderEmergencyView, selectStaffAndRender, handleReportToRSO } from './views/emergencyView.js';
import { renderKnowledgeSources, handleAskAlaradAI, handleAskPreset } from './views/askAiView.js';
import { renderPolicyTable, renderPolicyGaps } from './views/policyView.js';
import { renderDataSources, renderSecurityArchitecture } from './views/securityView.js';
import { renderFacilitySelector, handleFacilityChange } from './views/facilityView.js';

function initialRender() {
  renderFacilitySelector();
  renderDashboard();
  renderStaffTable();
  renderAlerts();
  renderRecommendations();
  renderExposureLog();
  renderAiInputs();
  renderWearableView();
  renderEmergencyView();
  renderKnowledgeSources();
  renderPolicyTable();
  renderPolicyGaps();
  renderDataSources();
  renderSecurityArchitecture();
}

const ACTIONS = {
  'simulate-leak': () => handleSimulateLeak(),
  'view-all-alerts': () => handleViewAllAlerts(),
  'staff-gps': (el) => handleStaffGps(el.dataset.id),
  'ack-alert': (el) => handleAckAlert(el.dataset.id),
  'escalate-alert': () => handleEscalateAlert(),
  'run-anomaly': () => handleRunAnomalyModel(),
  'anomaly-escalate': () => handleAnomalyEscalate(),
  'rotate-device': () => handleRotateDevice(),
  'select-staff': (el) => selectStaffAndRender(el.dataset.id),
  'report-rso': (el) => handleReportToRSO(el.dataset.id),
  'ask-ai': () => handleAskAlaradAI(),
  'ask-preset': (el) => handleAskPreset(el.textContent.trim()),
};

function initEventDelegation() {
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const handler = ACTIONS[el.dataset.action];
    if (handler) handler(el);
  });

  const aiInput = document.getElementById('aiQuestion');
  if (aiInput) {
    aiInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleAskAlaradAI();
    });
  }

  const facilitySelect = document.getElementById('facilitySelect');
  if (facilitySelect) {
    facilitySelect.addEventListener('change', (e) => handleFacilityChange(e.target.value));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initEventDelegation();
  initialRender();
});
