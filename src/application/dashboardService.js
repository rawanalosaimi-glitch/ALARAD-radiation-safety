/**
 * APPLICATION LAYER — dashboardService.js
 * Orchestrates domain + infrastructure for the Dashboard view.
 * No DOM access here — returns plain data the presentation layer renders.
 */
import { getWeeklyTrend } from '../infrastructure/mockRepository.js';
import { getState, addAlert } from '../infrastructure/store.js';
import { computeDepartmentAverages } from '../domain/riskEngine.js';

export function getDashboardData() {
  return {
    departments: computeDepartmentAverages(getState().staff),
    trend: getWeeklyTrend(),
    doseSummary: { today: 0.42, week: 2.10, month: 8.40, year: 86.70 },
  };
}

/**
 * Simulate Scenario A from the submission: an unplanned radiation leak
 * (e.g. shielding failure) is caught by the anomaly-detection model and
 * escalated to the RSO. Returns the events so the UI can show toasts.
 */
export function simulateLeakEvent() {
  const { staff } = getState();
  const candidate = staff[Math.floor(Math.random() * staff.length)];
  const multiplier = (2.2 + Math.random() * 2.6).toFixed(1); // random 2.2x - 4.8x above baseline

  const escalation = {
    id: Date.now(),
    level: 'critical',
    title: `Radiation leak suspected — ${candidate.dept} (shielding failure pattern)`,
    meta: 'Just now · Source: Anomaly Detection model · Escalated to RSO',
    ack: false,
  };
  return {
    immediateToast: {
      title: '⚠ Anomaly Detected',
      body: `${candidate.id} · ${candidate.dept} — dose rate ${multiplier}× above baseline. Real-time alert sent to smartwatch.`,
      crit: true,
    },
    escalate: () => {
      addAlert(escalation);
      return { title: 'Escalated to Radiation Safety Officer', body: `Event for ${candidate.id} logged for NRRC-R-01-SR02 compliance review.` };
    },
  };
}
