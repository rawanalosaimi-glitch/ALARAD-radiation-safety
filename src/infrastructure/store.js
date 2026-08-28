/**
 * INFRASTRUCTURE LAYER — store.js
 * -----------------------------------------------------------------------
 * Minimal in-memory application state + a tiny publish/subscribe
 * mechanism. This is the single source of truth mutable state lives in;
 * application services read/write it, presentation views subscribe to
 * be notified when they should re-render. Nothing here knows about the
 * DOM — this file could back a CLI or a test harness just as well.
 * -----------------------------------------------------------------------
 */
import {
  getStaff, getInitialAlerts, getInitialDeviceBindings, getInitialRotationLog,
} from './mockRepository.js';
import { classifyDoseStatus } from '../domain/riskEngine.js';

// Status is derived here, once, from each staff member's cumulative yearly
// dose against the ICRP Publication 103 / NRRC-R-01-SR02 occupational limit
// of 20 mSv/year — never hand-typed in the mock data.
const initialStaff = getStaff().map((s) => ({ ...s, status: classifyDoseStatus(s.today, s.year) }));

const state = {
  staff: initialStaff,
  alerts: getInitialAlerts(),
  deviceBindings: getInitialDeviceBindings(),
  rotationLog: getInitialRotationLog(),
  selectedStaffId: initialStaff[0].id,
};

const listeners = new Set();

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notify(topic) {
  listeners.forEach((fn) => fn(topic));
}

export function getState() {
  return state;
}

export function setSelectedStaff(id) {
  state.selectedStaffId = id;
  notify('staff');
}

export function addAlert(alert) {
  state.alerts.unshift(alert);
  notify('alerts');
}

export function acknowledgeAlert(id) {
  state.alerts = state.alerts.map((a) => (a.id === id ? { ...a, ack: true } : a));
  notify('alerts');
}

export function rebindDevice(deviceIndex, newStaffId, logEntry) {
  state.deviceBindings[deviceIndex].staffId = newStaffId;
  state.deviceBindings[deviceIndex].since = 'Just now';
  state.rotationLog.unshift(logEntry);
  notify('wearable');
}
