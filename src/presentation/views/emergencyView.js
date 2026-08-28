/**
 * PRESENTATION LAYER — emergencyView.js
 */
import { getFloorRooms } from '../../infrastructure/mockRepository.js';
import { listStaff, getStaffById, getSelectedStaffId, selectStaff, reportToRSO } from '../../application/staffService.js';
import { toast } from '../toast.js';
import { renderAlerts } from './alertsView.js';
import { refreshAlertKpis } from './dashboardView.js';

function statusColor(status) {
  return status === 'critical' ? '#f87171' : status === 'elevated' ? '#fbbf24' : '#34d399';
}

export function renderFloorMap() {
  const rooms = getFloorRooms();
  const staff = listStaff();
  const selectedId = getSelectedStaffId();

  let svg = rooms.map((r) =>
    `<rect class="room-rect" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="6"></rect><text class="room-lbl" x="${r.x + 8}" y="${r.y + 16}">${r.name}</text>`
  ).join('');

  svg += staff.map((s) => {
    const color = statusColor(s.status);
    const sel = s.id === selectedId
      ? `<circle cx="${s.x}" cy="${s.y}" r="12" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.6"><animate attributeName="r" values="9;14;9" dur="1.6s" repeatCount="indefinite"/></circle>`
      : '';
    return `<g class="staff-dot" data-action="select-staff" data-id="${s.id}">${sel}<circle cx="${s.x}" cy="${s.y}" r="6" fill="${color}"></circle><text x="${s.x + 9}" y="${s.y + 4}" font-size="9" fill="#cbd5f5">${s.id}</text></g>`;
  }).join('');

  document.getElementById('floorMap').innerHTML = svg;
}

export function renderStaffInfoPanel() {
  const s = getStaffById(getSelectedStaffId());
  if (!s) return;
  document.getElementById('staffInfoPanel').innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
      <div class="avatar" style="width:38px;height:38px;">${s.name.split(' ').map((w) => w[0]).join('')}</div>
      <div><div style="font-weight:800;color:#fff;">${s.name}</div><div style="font-size:11px;color:var(--muted);">${s.role}</div></div>
    </div>
    <div class="calc-line">Current location: <b>${s.dept}</b></div>
    <div class="calc-line">Today's dose: <b>${s.today.toFixed(2)} mSv</b> · Cumulative (yr): <b>${s.year.toFixed(1)} mSv</b></div>
    <div class="calc-line">Status: <span class="badge ${s.status}">${s.status.toUpperCase()}</span></div>
    <button class="btn red" style="margin-top:12px;width:100%;" data-action="report-rso" data-id="${s.id}">🚨 Report to Radiation Safety Officer</button>
  `;
}

export function renderStaffMiniList() {
  const selectedId = getSelectedStaffId();
  document.getElementById('staffMiniList').innerHTML = listStaff().map((s) => {
    const color = statusColor(s.status);
    return `<div class="staff-mini-row ${s.id === selectedId ? 'sel' : ''}" data-action="select-staff" data-id="${s.id}"><div class="sdot" style="background:${color}"></div><div class="sname">${s.name}</div><div class="sroom">${s.dept}</div></div>`;
  }).join('');
}

export function selectStaffAndRender(id) {
  selectStaff(id);
  renderFloorMap();
  renderStaffInfoPanel();
  renderStaffMiniList();
}

export function renderEmergencyView() {
  renderFloorMap();
  renderStaffInfoPanel();
  renderStaffMiniList();
}

export function handleReportToRSO(id) {
  const result = reportToRSO(id);
  if (!result) return;
  renderAlerts();
  refreshAlertKpis();
  toast(result.title, result.body, result.crit);
}
