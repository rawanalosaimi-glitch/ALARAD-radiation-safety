/**
 * APPLICATION LAYER — facilityService.js
 * Use cases for listing and switching the active hospital/facility.
 * The same ALARAD interface is reused across facilities — switching one
 * only swaps the data behind it (see infrastructure/store.js).
 */
import { getFacilities } from '../infrastructure/mockRepository.js';
import { getState, setFacility } from '../infrastructure/store.js';

export function listFacilities() {
  return getFacilities();
}

export function getCurrentFacility() {
  const { facilityId } = getState();
  return getFacilities().find((f) => f.id === facilityId) || getFacilities()[0];
}

export function switchFacility(facilityId) {
  setFacility(facilityId);
}
