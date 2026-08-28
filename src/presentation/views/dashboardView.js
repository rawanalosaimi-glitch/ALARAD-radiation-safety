/**
 * PRESENTATION LAYER — dashboardView.js
 * Renders the Dashboard view from data supplied by dashboardService.
 * Contains DOM/templating only.
 */
import { getDashboardData, simulateLeakEvent } from '../../application/dashboardService.js';
import { getAlertCounts } from '../../application/alertsService.js';
import { listStaff } from '../../application/staffService.js';
import { toast } from '../toast.js';
import { showView } from '../navigation.js';
import { renderAlerts } from './alertsView.js';

export function renderDashboard() {
  const { departments, trend } = getDashboardData();
  const maxDept = Math.max(...departments.map((d) => d.v));
  document.getElementById('deptBars').innerHTML = departments.map((d) =>
    `<div class="dept-row"><div class="name">${d.name}</div><div class="dept-bar-bg"><div class="dept-bar" style="width:${(d.v / maxDept * 100).toFixed(0)}%"></div></div><div class="num">${d.v.toFixed(1)}</div></div>`
  ).join('');

  const maxTrend = Math.max(...trend);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  document.getElementById('trendBars').innerHTML = trend.map((v, i) =>
    `<div class="trend-bar" style="height:${(v / maxTrend * 90 + 10).toFixed(0)}px"><span>${days[i]}</span></div>`
  ).join('');

  refreshAlertKpis();
  refreshCritBanner();
}

/** Critical-staff banner and the "Active Staff" KPI, both derived live from the roster. */
export function refreshCritBanner() {
  const staff = listStaff();
  const criticalStaff = staff.filter((s) => s.status === 'critical');
  document.getElementById('kpiStaff').textContent = staff.length;
  document.getElementById('critCount').textContent = criticalStaff.length;
  document.getElementById('critBanner').style.display = criticalStaff.length > 0 ? 'flex' : 'none';
}

export function refreshAlertKpis() {
  const { active, critical } = getAlertCounts();
  document.getElementById('kpiAlerts').textContent = active;
  document.getElementById('kpiAlertsSub').textContent = critical + ' critical';
  const badge = document.getElementById('alertCountBadge');
  badge.textContent = active;
  badge.style.display = active > 0 ? 'inline-block' : 'none';
}

export function handleSimulateLeak() {
  document.getElementById('critBanner').style.display = 'flex';
  const { immediateToast, escalate } = simulateLeakEvent();
  toast(immediateToast.title, immediateToast.body, immediateToast.crit);
  setTimeout(() => {
    const t = escalate();
    renderAlerts();
    refreshAlertKpis();
    toast(t.title, t.body, true);
  }, 1200);
}

export function handleViewAllAlerts() {
  showView('alerts');
}
