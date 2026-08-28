/**
 * APPLICATION LAYER — anomalyService.js
 * Adapts raw form input into the domain risk engine's shape and returns
 * a result the presentation layer can render, with no business logic
 * of its own — the actual math lives in domain/riskEngine.js.
 */
import { computeAnomaly } from '../domain/riskEngine.js';

export function runAnomalyDetection(formInput) {
  const { room, procMult, rate, dur, dist, shield } = formInput;
  return computeAnomaly({
    room,
    procMult: parseFloat(procMult),
    rate: parseFloat(rate) || 0,
    dur: parseFloat(dur) || 0,
    dist: parseFloat(dist) || 1,
    shield: parseFloat(shield),
  });
}
