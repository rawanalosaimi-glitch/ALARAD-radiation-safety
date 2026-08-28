/**
 * PRESENTATION LAYER — staffView.js
 */
import { listStaff, listDeviceBindings } from '../../application/staffService.js';
import { showView } from '../navigation.js';
import { selectStaffAndRender } from './emergencyView.js';

export function renderStaffTable() {
  const bindings = listDeviceBindings();
  document.getElementById('staffTable').innerHTML = listStaff().map((s) => {
    const binding = bindings.find((b) => b.staffId === s.id);
    return `
    <tr>
      <td><b>${s.name}</b><br><span style="color:var(--muted2);font-size:10px;">${s.id}</span></td>
      <td>${s.role}</td><td>${s.dept}</td>
      <td>${binding ? binding.device : '<span style="color:var(--muted2);">Unassigned</span>'}</td>
      <td>${binding ? binding.shift : '—'}</td>
      <td>${s.today.toFixed(2)} mSv</td><td>${s.year.toFixed(1)} mSv</td>
      <td><span class="badge ${s.status}">${s.status.toUpperCase()}</span></td>
      <td><button class="btn sm" data-action="staff-gps" data-id="${s.id}">GPS ⌖</button></td>
    </tr>`;
  }).join('');
}

export function handleStaffGps(id) {
  showView('emergency');
  selectStaffAndRender(id);
}
