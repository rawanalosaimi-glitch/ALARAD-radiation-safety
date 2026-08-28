/**
 * PRESENTATION LAYER — askAiView.js
 * Renders the RAG pipeline trace and the answer card. All retrieval
 * logic lives in application/askAiService.js + domain/knowledgeEngine.js.
 */
import { askQuestion, listKnowledgeSources } from '../../application/askAiService.js';

function litPipeline(cb) {
  const steps = document.querySelectorAll('.pipe-step');
  steps.forEach((s) => s.classList.remove('lit'));
  let i = 0;
  const iv = setInterval(() => {
    if (i < steps.length) { steps[i].classList.add('lit'); i++; }
    else { clearInterval(iv); cb && cb(); }
  }, 90);
}

export function renderKnowledgeSources() {
  document.getElementById('kbList').innerHTML = listKnowledgeSources()
    .map((s) => `<div class="kb-tag">${s}</div>`).join('');
}

export function handleAskPreset(text) {
  document.getElementById('aiQuestion').value = text;
  handleAskAlaradAI();
}

export function handleAskAlaradAI() {
  const q = document.getElementById('aiQuestion').value.trim();
  const area = document.getElementById('aiAnswerArea');
  if (!q) return;

  area.innerHTML = `<div class="answer-card"><div class="ai-lbl">AI ANSWER</div><div class="ai-text" style="color:var(--muted2)">Running retrieval pipeline…</div></div>`;

  litPipeline(() => {
    const best = askQuestion(q);
    if (!best) {
      area.innerHTML = `<div class="answer-card">
        <div class="ai-lbl">AI ANSWER</div>
        <div class="ai-text">I could not find a matching topic in the knowledge base. Try keywords like: <i>leak, dose limit, risk, privacy, regulation, cybersecurity, quality control.</i></div>
      </div>`;
      return;
    }
    area.innerHTML = `<div class="answer-card">
      <div class="ai-lbl">AI ANSWER</div>
      <div class="ai-text">${best.answer}</div>
      <div class="meta-grid">
        <div class="meta-box"><div class="k">Source</div><div class="v">${best.source}</div></div>
        <div class="meta-box"><div class="k">Document</div><a class="v" href="${best.url}" target="_blank" rel="noopener">${best.document} ↗</a></div>
        <div class="meta-box"><div class="k">Page</div><div class="v">Page ${best.page}</div></div>
        <div class="meta-box action"><div class="k">Recommended Action</div><div class="v">${best.action}</div></div>
      </div>
    </div>`;
  });
}
