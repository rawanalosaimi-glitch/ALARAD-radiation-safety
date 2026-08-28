/**
 * APPLICATION LAYER — staffService.js
 * Use cases for staff lookup, wearable device ↔ Employee ID binding,
 * staff rotation, and reporting a staff member's location to the RSO.
 */
import { getState, setSelectedStaff, addAlert, rebindDevice } from '../infrastructure/store.js';
import { getFloorRooms as repoGetFloorRooms } from '../infrastructure/mockRepository.js';

export function listStaff() {
  return getState().staff;
}

/** Physical floor layout for the currently selected facility. */
export function getFloorRooms() {
  return repoGetFloorRooms(getState().facilityId);
}

export function getStaffById(id) {
  return getState().staff.find((s) => s.id === id);
}

export function getSelectedStaffId() {
  return getState().selectedStaffId;
}

export function selectStaff(id) {
  setSelectedStaff(id);
}

/** Human-in-the-loop safety action: notify the Radiation Safety Officer with live location + dose. */
export function reportToRSO(staffId) {
  const s = getStaffById(staffId);
  if (!s) return null;
  addAlert({
    id: Date.now(),
    level: 'critical',
    title: `Manual report: ${s.name} — GPS location shared with RSO`,
    meta: `Just now · ${s.dept} · Reported by dashboard user`,
    ack: false,
  });
  return {
    title: 'Report sent',
    body: `Dr. Radiation Safety Officer notified with ${s.name}\u2019s live location (${s.dept}) and current dose.`,
    crit: true,
  };
}

export function listDeviceBindings() {
  return getState().deviceBindings;
}

export function listRotationLog() {
  return getState().rotationLog;
}

/** Simulate a shift-change handoff: device re-bound from one Employee ID to another. */
export function rotateDeviceToNextStaff() {
  const { staff, deviceBindings } = getState();
  const boundIds = new Set(deviceBindings.map((b) => b.staffId));
  const unbound = staff.filter((s) => !boundIds.has(s.id));
  const incoming = unbound.length ? unbound[0] : staff[Math.floor(Math.random() * staff.length)];
  const binding = deviceBindings[0];
  const outgoing = getStaffById(binding.staffId);

  const logEntry = {
    time: 'Just now',
    text: `Device ${binding.device} handed off from <b>${outgoing ? outgoing.name : binding.staffId}</b> to <b>${incoming.name} (${incoming.id})</b> — Employee ID re-bound, dose counter continues under new owner.`,
  };
  rebindDevice(0, incoming.id, logEntry);

  return {
    title: 'Device re-paired',
    body: `${binding.device} now bound to Employee ID ${incoming.id} (${incoming.name}).`,
  };
}
