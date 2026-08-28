/**
 * PRESENTATION LAYER — facilityView.js
 * Renders the Hospital/Facility switcher and re-renders every
 * facility-scoped view when the selection changes.
 */
import { listFacilities, getCurrentFacility, switchFacility } from '../../application/facilityService.js';
import { toast } from '../toast.js';
import { renderDashboard } from './dashboardView.js';
import { renderStaffTable } from './staffView.js';
import { renderAlerts } from './alertsView.js';
import { renderRecommendations, renderExposureLog } from './recommendationsView.js';
import { renderWearableView } from './wearableView.js';
import { renderEmergencyView } from './emergencyView.js';

export function renderFacilityContext() {
  const f = getCurrentFacility();
  const contextEl = document.getElementById('facilityContext');
  if (contextEl) contextEl.textContent = `Viewing ${f.name} — ${f.sub}`;
  const profileEl = document.getElementById('profileFacility');
  if (profileEl) profileEl.textContent = f.sub;
}

export function renderFacilitySelector() {
  const select = document.getElementById('facilitySelect');
  if (!select) return;
  select.innerHTML = listFacilities().map((f) => `<option value="${f.id}">${f.name}</option>`).join('');
  select.value = getCurrentFacility().id;
  renderFacilityContext();
}

/** Re-render every view whose data is scoped to the active facility. */
function renderAllFacilityScopedViews() {
  renderFacilityContext();
  renderDashboard();
  renderStaffTable();
  renderAlerts();
  renderRecommendations();
  renderExposureLog();
  renderWearableView();
  renderEmergencyView();
}

export function handleFacilityChange(facilityId) {
  switchFacility(facilityId);
  renderAllFacilityScopedViews();
  const f = getCurrentFacility();
  toast('Facility switched', `Now viewing ${f.name} — ${f.sub}.`);
}
