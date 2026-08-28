/**
 * INFRASTRUCTURE LAYER — store.js
 * -----------------------------------------------------------------------
 * Minimal in-memory application state + a tiny publish/subscribe
 * mechanism. This is the single source of truth mutable state lives in;
 * application services read/write it, presentation views subscribe to
 * be notified when they should re-render. Nothing here knows about the
 * DOM — this file could back a CLI or a test harness just as well.
 * -----------------------------------------------------------------------
 * State is scoped to one selected facility at a time (see setFacility) so
 * the same ALARAD interface can be pointed at Hospital A, B, or C without
 * any other layer knowing the difference.
 * -----------------------------------------------------------------------
 */
import {
  getFacilities, getStaff, getInitialAlerts, getInitialDeviceBindings, getInitialRotationLog,
} from './mockRepository.js';
import { classifyDoseStatus } from '../domain/riskEngine.js';

// Status is derived here, once per facility load, from each staff member's
// cumulative yearly dose against the ICRP Publication 103 / NRRC-R-01-SR02
// occupational limit of 20 mSv/year — never hand-typed in the mock data.
function loadFacilityState(facilityId) {
  const staff = getStaff(facilityId).map((s) => ({ ...s, status: classifyDoseStatus(s.today, s.year) }));
  return {
    staff,
    alerts: getInitialAlerts(facilityId),
    deviceBindings: getInitialDeviceBindings(facilityId),
    rotationLog: getInitialRotationLog(facilityId),
    selectedStaffId: staff[0].id,
  };
}

const defaultFacilityId = getFacilities()[0].id;
const state = {
  facilityId: defaultFacilityId,
  ...loadFacilityState(defaultFacilityId),
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

/** Switch the active facility, replacing staff/alerts/devices/rotation with that facility's data. */
export function setFacility(facilityId) {
  Object.assign(state, { facilityId }, loadFacilityState(facilityId));
  notify('facility');
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
