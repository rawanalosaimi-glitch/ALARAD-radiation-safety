/**
 * APPLICATION LAYER — alertsService.js
 * Use cases for reading and acknowledging alerts.
 */
import { getState, acknowledgeAlert as ackInStore } from '../infrastructure/store.js';

export function listAlerts() {
  return getState().alerts;
}

export function getAlertCounts() {
  const alerts = getState().alerts;
  return {
    active: alerts.length,
    critical: alerts.filter((a) => a.level === 'critical').length,
  };
}

export function acknowledgeAlert(id) {
  ackInStore(id);
}
