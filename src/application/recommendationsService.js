/**
 * APPLICATION LAYER — recommendationsService.js
 * Use cases for AI recommendations and the exposure log, both scoped to
 * the currently selected facility.
 */
import { getRecommendations, getExposureLog } from '../infrastructure/mockRepository.js';
import { getState } from '../infrastructure/store.js';

export function listRecommendations() {
  return getRecommendations(getState().facilityId);
}

export function listExposureLog() {
  return getExposureLog(getState().facilityId);
}
