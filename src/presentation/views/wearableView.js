/**
 * PRESENTATION LAYER — wearableView.js
 */
import { getSensorReadings } from '../../infrastructure/mockRepository.js';
import { listStaff, listDeviceBindings, listRotationLog, rotateDeviceToNextStaff } from '../../application/staffService.js';
import { toast } from '../toast.js';

export function renderSensorGrid() {
  document.getElementById('sensorGrid').innerHTML = getSensorReadings().map((s) =>
    `<div class="sensor-card"><div class="sic">${s.ico}</div><div class="sname">${s.name}</div><div class="sval">${s.val}</div><div class="sunit">${s.unit}</div></div>`
  ).join('');
}

export function renderDeviceBindings() {
  const staff = listStaff();
  document.getElementById('deviceBindings').innerHTML = listDeviceBindings().map((b) => {
    const s = staff.find((x) => x.id === b.staffId);
    return `<div class="device-row">
      <div class="did">${b.device}</div>
      <div class="arrow">↔</div>
      <div class="who">${s ? s.name : 'Unassigned'} <span style="color:var(--muted2);font-weight:400;">(${b.staffId})</span><div class="since">Paired since ${b.since}</div></div>
      <span class="badge normal">ACTIVE</span>
    </div>`;
  }).join('');
}

export function renderRotationLog() {
  document.getElementById('rotationLog').innerHTML = listRotationLog().map((r) =>
    `<div class="rotation-item"><div class="time">${r.time}</div><div class="txt">${r.text}</div></div>`
  ).join('');
}

export function renderWearableView() {
  renderSensorGrid();
  renderDeviceBindings();
  renderRotationLog();
}

export function handleRotateDevice() {
  const result = rotateDeviceToNextStaff();
  renderDeviceBindings();
  renderRotationLog();
  toast(result.title, result.body);
}
