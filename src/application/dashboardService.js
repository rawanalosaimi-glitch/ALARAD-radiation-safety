/**
 * APPLICATION LAYER — dashboardService.js
 * Orchestrates domain + infrastructure for the Dashboard view.
 * No DOM access here — returns plain data the presentation layer renders.
 */
import { getDepartmentDoseAvg, getWeeklyTrend } from '../infrastructure/mockRepository.js';
import { addAlert } from '../infrastructure/store.js';

export function getDashboardData() {
  return {
    departments: getDepartmentDoseAvg(),
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
  const escalation = {
    id: Date.now(),
    level: 'critical',
    title: 'Radiation leak suspected — Cath Lab 1 (shielding failure pattern)',
    meta: 'Just now · Source: Anomaly Detection model · Escalated to RSO',
    ack: false,
  };
  return {
    immediateToast: {
      title: '⚠ Anomaly Detected',
      body: 'ST-04 · Cath Lab 1 — dose rate 3.4× above baseline. Real-time alert sent to smartwatch.',
      crit: true,
    },
    escalate: () => {
      addAlert(escalation);
      return { title: 'Escalated to Radiation Safety Officer', body: 'Event logged for NRRC-R-01-SR02 compliance review.' };
    },
  };
}
