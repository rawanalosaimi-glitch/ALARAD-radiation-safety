/**
 * DOMAIN LAYER — knowledgeEngine.js
 * -----------------------------------------------------------------------
 * Pure retrieval-scoring logic for the "Ask ALARAD AI" knowledge base.
 * No DOM access, no data (the KB entries live in infrastructure/).
 * -----------------------------------------------------------------------
 * Architecture this module implements (prototype vs. production):
 *   Official Documents → PDF/Text extraction → Chunking →
 *   [prototype: keyword-weighted scoring | production: Embeddings] →
 *   Vector Database → User Question → Semantic Retrieval →
 *   Top relevant chunks → LLM → Answer + Source + Page
 *
 * scoreEntry() below is the prototype's retrieval step. Swap it for a
 * cosine-similarity lookup against an embeddings index to go to production
 * without touching any other layer.
 * -----------------------------------------------------------------------
 */

/** Score a single KB entry against a question by keyword overlap. */
export function scoreEntry(question, entry) {
  const q = question.toLowerCase();
  let score = 0;
  entry.keywords.forEach((k) => {
    if (q.includes(k.toLowerCase())) score += k.split(' ').length;
  });
  return score;
}

/**
 * Retrieve the best-matching KB entry for a question.
 * Returns null if nothing scores above zero (caller should show the
 * "I could not find a matching topic" fallback rather than fabricate).
 */
export function retrieveBestMatch(question, kb) {
  let best = null, bestScore = 0;
  kb.forEach((entry) => {
    const score = scoreEntry(question, entry);
    if (score > bestScore) { bestScore = score; best = entry; }
  });
  return bestScore > 0 ? best : null;
}
