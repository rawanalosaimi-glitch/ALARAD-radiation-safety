/**
 * APPLICATION LAYER — askAiService.js
 * Orchestrates the RAG-style pipeline for "Ask ALARAD AI":
 *   Official Documents → Chunking → (Embeddings in production) →
 *   Vector DB → Retrieval → Top chunks → LLM → Answer + Source + Page
 * The retrieval math lives in domain/knowledgeEngine.js; the chunk data
 * lives in infrastructure/mockRepository.js. This file just wires them.
 */
import { getKnowledgeBase } from '../infrastructure/mockRepository.js';
import { retrieveBestMatch } from '../domain/knowledgeEngine.js';

let kbCache = null;
function kb() {
  if (!kbCache) kbCache = getKnowledgeBase();
  return kbCache;
}

export function listKnowledgeSources() {
  return [...new Set(kb().map((e) => e.source))];
}

/**
 * @param {string} question
 * @returns {object|null} the matched KB entry (with source/document/page/action)
 *   or null when no topic matches — the presentation layer must show the
 *   "I could not find a matching topic" fallback rather than invent one.
 */
export function askQuestion(question) {
  return retrieveBestMatch(question, kb());
}
