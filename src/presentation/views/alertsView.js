/**
 * PRESENTATION LAYER — alertsView.js
 */
import { listAlerts, acknowledgeAlert } from '../../application/alertsService.js';
import { toast } from '../toast.js';
import { showView } from '../navigation.js';

export function renderAlerts() {
  const alerts = listAlerts();
  const list = document.getElementById('alertsList');
  if (alerts.length === 0) {
    list.innerHTML = '<div class="card" style="text-align:center;color:var(--muted);">No active alerts.</div>';
    return;
  }
  list.innerHTML = alerts.map((a) => `
    <div class="alert-item ${a.level}">
      <div class="dot2"></div>
      <div class="body">
        <div class="title">${a.title}</div>
        <div class="meta">${a.meta}${a.ack ? ' · <span style="color:var(--green)">Acknowledged</span>' : ''}</div>
        <div class="actions">
          ${!a.ack ? `<button class="btn sm" data-action="ack-alert" data-id="${a.id}">Acknowledge</button>` : ''}
          <button class="btn sm red" data-action="escalate-alert">Escalate to RSO</button>
        </div>
      </div>
    </div>`
  ).join('');
}

export function handleAckAlert(id) {
  acknowledgeAlert(Number(id));
  renderAlerts();
  toast('Alert acknowledged', 'Logged with timestamp for compliance record.');
}

export function handleEscalateAlert() {
  showView('emergency');
}
