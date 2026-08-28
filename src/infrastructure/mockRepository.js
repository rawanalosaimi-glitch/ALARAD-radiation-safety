/**
 * INFRASTRUCTURE LAYER — mockRepository.js
 * -----------------------------------------------------------------------
 * Stands in for a real data source (hospital dosimeter API, staff
 * directory, document store). Nothing above this layer should know or
 * care that the data is hardcoded — application services call these
 * functions exactly as they would call a real repository, so swapping
 * this file for real API calls later requires no changes anywhere else.
 *
 * "These are illustrative prototype values and must be replaced with
 * data from calibrated dosimeters before clinical use."
 * -----------------------------------------------------------------------
 * MULTI-FACILITY SUPPORT
 * ALARAD is designed to run as one interface across many hospitals. Every
 * facility-scoped getter below takes a facilityId and looks it up in a
 * per-facility table, defaulting to Hospital A so existing callers keep
 * working unchanged. Swapping this for a real per-tenant API later only
 * touches this file.
 * -----------------------------------------------------------------------
 */

const DEFAULT_FACILITY = 'HOSP-A';

export function getFacilities() {
  return [
    { id: 'HOSP-A', name: 'Hospital A', sub: 'King Fahad Medical City — Riyadh' },
    { id: 'HOSP-B', name: 'Hospital B', sub: 'King Faisal Specialist Hospital — Jeddah' },
    { id: 'HOSP-C', name: 'Hospital C', sub: 'King Abdulaziz Medical City — Dammam' },
  ];
}

// Status is not stored here — it is computed live from each staff member's
// cumulative yearly dose via domain/riskEngine.js's classifyDoseStatus(),
// never hand-typed. See infrastructure/store.js.
const STAFF_BY_FACILITY = {
  'HOSP-A': [
    { id: 'ST-04', name: 'T. Al-Qahtani', role: 'Interventional Radiologist', dept: 'Cath Lab 1', today: 0.61, year: 19.2, x: 60, y: 65 },
    { id: 'ST-11', name: 'F. Al-Harbi', role: 'Radiologic Technologist', dept: 'Fluoroscopy Suite', today: 0.38, year: 11.4, x: 475, y: 60 },
    { id: 'ST-02', name: 'S. Al-Dosari', role: 'Cath Lab Staff', dept: 'Cath Lab 2', today: 0.29, year: 9.8, x: 200, y: 65 },
    { id: 'ST-07', name: 'M. Al-Zahrani', role: 'Nuclear Medicine Staff', dept: 'Nuclear Medicine', today: 0.18, year: 6.1, x: 60, y: 195 },
    { id: 'ST-09', name: 'A. Al-Otaibi', role: 'Radiation Therapist', dept: 'CT Suite', today: 0.22, year: 7.4, x: 340, y: 195 },
    { id: 'ST-15', name: 'H. Al-Shammari', role: 'Medical Physicist', dept: 'Corridor / Rounds', today: 0.09, year: 3.2, x: 475, y: 195 },
    { id: 'ST-06', name: 'K. Al-Ghamdi', role: 'Interventional Cardiologist', dept: 'Cath Lab 3', today: 0.55, year: 18.0, x: 340, y: 65 },
    { id: 'ST-13', name: 'N. Al-Subaie', role: 'PET/CT Technologist', dept: 'PET/CT Suite', today: 0.31, year: 10.6, x: 200, y: 195 },
    { id: 'ST-08', name: 'R. Al-Malki', role: 'Radiologic Technologist', dept: 'Fluoroscopy Suite', today: 0.14, year: 4.8, x: 505, y: 95 },
    { id: 'ST-20', name: 'Y. Al-Harthi', role: 'Radiologic Technologist', dept: 'Cath Lab 2', today: 0.46, year: 14.5, x: 230, y: 95 },
  ],
  'HOSP-B': [
    { id: 'HB-01', name: 'Y. Al-Ghamdi', role: 'Interventional Radiologist', dept: 'Cath Lab 1', today: 0.44, year: 14.8, x: 100, y: 70 },
    { id: 'HB-02', name: 'L. Al-Faraj', role: 'Radiologic Technologist', dept: 'Fluoroscopy Suite', today: 0.27, year: 8.9, x: 300, y: 55 },
    { id: 'HB-03', name: 'O. Al-Sulaiman', role: 'Cath Lab Staff', dept: 'Cath Lab 2', today: 0.58, year: 18.4, x: 100, y: 200 },
    { id: 'HB-04', name: 'R. Al-Ahmadi', role: 'Nuclear Medicine Staff', dept: 'Nuclear Medicine', today: 0.15, year: 5.0, x: 440, y: 200 },
    { id: 'HB-05', name: 'D. Al-Shehri', role: 'Radiation Therapist', dept: 'CT Suite', today: 0.20, year: 6.8, x: 440, y: 55 },
  ],
  'HOSP-C': [
    { id: 'HC-01', name: 'F. Al-Zahrani', role: 'Interventional Cardiologist', dept: 'Cath Lab 1', today: 0.51, year: 17.2, x: 60, y: 65 },
    { id: 'HC-02', name: 'M. Al-Harbi', role: 'PET/CT Technologist', dept: 'PET/CT Suite', today: 0.33, year: 10.9, x: 460, y: 65 },
    { id: 'HC-03', name: 'N. Al-Otaibi', role: 'Radiologic Technologist', dept: 'Fluoroscopy Suite', today: 0.19, year: 6.3, x: 260, y: 65 },
    { id: 'HC-04', name: 'T. Al-Dosari', role: 'Radiation Therapist', dept: 'CT Suite', today: 0.24, year: 7.9, x: 260, y: 195 },
    { id: 'HC-05', name: 'K. Al-Amri', role: 'Nuclear Medicine Staff', dept: 'Nuclear Medicine', today: 0.12, year: 4.1, x: 60, y: 195 },
  ],
};
export function getStaff(facilityId = DEFAULT_FACILITY) {
  return STAFF_BY_FACILITY[facilityId] || STAFF_BY_FACILITY[DEFAULT_FACILITY];
}

export function getWeeklyTrend() {
  return [0.31, 0.28, 0.44, 0.39, 0.52, 0.35, 0.42];
}

const ALERTS_BY_FACILITY = {
  'HOSP-A': [
    { id: 1, level: 'critical', title: 'ST-04 approaching critical exposure level', meta: 'Cath Lab 1 · 2 min ago · Source: Anomaly Detection model', ack: false },
    { id: 2, level: 'critical', title: 'ST-06 approaching critical exposure level', meta: 'Cath Lab 3 · 15 min ago · Source: Anomaly Detection model', ack: false },
    { id: 3, level: 'warning', title: 'ST-11 elevated dose rate this week', meta: 'Fluoroscopy Suite · 40 min ago · Source: Time-series forecast', ack: false },
    { id: 4, level: 'warning', title: 'ST-13 elevated dose trend this week', meta: 'PET/CT Suite · 1 hr ago · Source: Time-series forecast', ack: false },
    { id: 5, level: 'warning', title: 'ST-20 elevated dose trend this week', meta: 'Cath Lab 2 · 1.5 hrs ago · Source: Time-series forecast', ack: false },
    { id: 6, level: 'info', title: 'Weekly compliance report generated', meta: 'Hospital-wide · 3 hrs ago · Source: Automated reporting', ack: false },
  ],
  'HOSP-B': [
    { id: 1, level: 'critical', title: 'HB-03 approaching critical exposure level', meta: 'Cath Lab 2 · 8 min ago · Source: Anomaly Detection model', ack: false },
    { id: 2, level: 'warning', title: 'HB-01 elevated dose trend this week', meta: 'Cath Lab 1 · 35 min ago · Source: Time-series forecast', ack: false },
    { id: 3, level: 'info', title: 'Weekly compliance report generated', meta: 'Hospital-wide · 2 hrs ago · Source: Automated reporting', ack: false },
  ],
  'HOSP-C': [
    { id: 1, level: 'warning', title: 'HC-01 elevated dose rate this week', meta: 'Cath Lab 1 · 18 min ago · Source: Time-series forecast', ack: false },
    { id: 2, level: 'warning', title: 'HC-02 elevated dose trend this week', meta: 'PET/CT Suite · 45 min ago · Source: Time-series forecast', ack: false },
    { id: 3, level: 'info', title: 'Weekly compliance report generated', meta: 'Hospital-wide · 3 hrs ago · Source: Automated reporting', ack: false },
  ],
};
export function getInitialAlerts(facilityId = DEFAULT_FACILITY) {
  return ALERTS_BY_FACILITY[facilityId] || ALERTS_BY_FACILITY[DEFAULT_FACILITY];
}

const RECOMMENDATIONS_BY_FACILITY = {
  'HOSP-A': [
    { title: 'Rotate ST-04 out of Cath Lab 1 for remainder of shift', why: 'Cumulative dose trending toward NRRC-R-01-SR02 dose limit within projected 3 procedures.', tag: 'High priority' },
    { title: 'Rotate ST-06 out of Cath Lab 3 pending dose review', why: 'Cumulative dose has crossed 90% of the annual ICRP Publication 103 limit for this shift cycle.', tag: 'High priority' },
    { title: 'Increase shielding for PET/CT Suite tracer-handling procedures', why: 'Forecast model shows repeated elevated dose-rate readings above department baseline for ST-13.', tag: 'Medium priority' },
    { title: 'Schedule additional dosimeter calibration check — Fluoroscopy Suite', why: 'Two devices reporting readings outside expected variance range this week.', tag: 'Low priority' },
  ],
  'HOSP-B': [
    { title: 'Rotate HB-03 out of Cath Lab 2 pending dose review', why: 'Cumulative dose has crossed 90% of the annual ICRP Publication 103 limit for this shift cycle.', tag: 'High priority' },
    { title: 'Monitor HB-01 dose trend in Cath Lab 1', why: 'Forecast model shows a steady upward trend approaching the elevated-dose threshold.', tag: 'Medium priority' },
    { title: 'Schedule dosimeter calibration check — Fluoroscopy Suite', why: 'Routine QC cycle due this week per NRRC-R-01-SR03.', tag: 'Low priority' },
  ],
  'HOSP-C': [
    { title: 'Monitor HC-01 dose trend in Cath Lab 1', why: 'Forecast model shows dose rate trending toward the elevated threshold this week.', tag: 'Medium priority' },
    { title: 'Review shielding for PET/CT Suite tracer-handling procedures', why: 'Repeated elevated dose-rate readings recorded for HC-02 above department baseline.', tag: 'Medium priority' },
    { title: 'Schedule dosimeter calibration check — Nuclear Medicine', why: 'Routine QC cycle due this week per NRRC-R-01-SR03.', tag: 'Low priority' },
  ],
};
export function getRecommendations(facilityId = DEFAULT_FACILITY) {
  return RECOMMENDATIONS_BY_FACILITY[facilityId] || RECOMMENDATIONS_BY_FACILITY[DEFAULT_FACILITY];
}

const EXPOSURE_LOG_BY_FACILITY = {
  'HOSP-A': [
    ['08:12', 'ST-04', 'Cath Lab 1', 'Interventional Cardiology', '182 µSv/h', '0.14 mSv'],
    ['09:03', 'ST-11', 'Fluoroscopy Suite', 'Diagnostic Fluoroscopy', '95 µSv/h', '0.06 mSv'],
    ['10:47', 'ST-02', 'Cath Lab 2', 'Angiography', '110 µSv/h', '0.09 mSv'],
    ['11:20', 'ST-07', 'Nuclear Medicine', 'Nuclear Scan', '40 µSv/h', '0.03 mSv'],
    ['12:55', 'ST-04', 'Cath Lab 1', 'Interventional Cardiology', '201 µSv/h', '0.16 mSv'],
    ['13:40', 'ST-09', 'CT Suite', 'CT Scan', '58 µSv/h', '0.05 mSv'],
    ['14:10', 'ST-06', 'Cath Lab 3', 'Interventional Cardiology', '175 µSv/h', '0.13 mSv'],
    ['15:02', 'ST-13', 'PET/CT Suite', 'PET Tracer Handling', '65 µSv/h', '0.05 mSv'],
  ],
  'HOSP-B': [
    ['08:05', 'HB-01', 'Cath Lab 1', 'Interventional Cardiology', '150 µSv/h', '0.11 mSv'],
    ['09:20', 'HB-03', 'Cath Lab 2', 'Angiography', '195 µSv/h', '0.15 mSv'],
    ['10:40', 'HB-02', 'Fluoroscopy Suite', 'Diagnostic Fluoroscopy', '88 µSv/h', '0.05 mSv'],
    ['12:15', 'HB-05', 'CT Suite', 'CT Scan', '52 µSv/h', '0.04 mSv'],
    ['13:30', 'HB-04', 'Nuclear Medicine', 'Nuclear Scan', '36 µSv/h', '0.03 mSv'],
  ],
  'HOSP-C': [
    ['08:15', 'HC-01', 'Cath Lab 1', 'Interventional Cardiology', '165 µSv/h', '0.12 mSv'],
    ['09:40', 'HC-02', 'PET/CT Suite', 'PET Tracer Handling', '60 µSv/h', '0.04 mSv'],
    ['11:05', 'HC-03', 'Fluoroscopy Suite', 'Diagnostic Fluoroscopy', '80 µSv/h', '0.05 mSv'],
    ['12:50', 'HC-04', 'CT Suite', 'CT Scan', '50 µSv/h', '0.04 mSv'],
    ['14:00', 'HC-05', 'Nuclear Medicine', 'Nuclear Scan', '32 µSv/h', '0.02 mSv'],
  ],
};
export function getExposureLog(facilityId = DEFAULT_FACILITY) {
  return EXPOSURE_LOG_BY_FACILITY[facilityId] || EXPOSURE_LOG_BY_FACILITY[DEFAULT_FACILITY];
}

export function getSensorReadings() {
  return [
    { ico: '☢', name: 'Radiation Dose', val: '201', unit: 'µSv/h' },
    { ico: '♥', name: 'Heart Rate', val: '88', unit: 'bpm' },
    { ico: '≋', name: 'Respiratory Rate', val: '16', unit: 'breaths/min' },
    { ico: '⌖', name: 'Location', val: 'Cath Lab 1', unit: 'indoor GPS' },
    { ico: '🕒', name: 'Work Shift', val: 'Day', unit: '07:00–15:00' },
  ];
}

// Every binding also carries the current shift, so a wearable reading can
// always be traced to "this employee, this department, this shift" —
// never an anonymous dose number.
const DEVICE_BINDINGS_BY_FACILITY = {
  'HOSP-A': [
    { device: 'ALARAD-DSM-1042', staffId: 'ST-04', since: '07:02 today', shift: 'Day — 07:00–15:00' },
    { device: 'ALARAD-DSM-1017', staffId: 'ST-11', since: '07:05 today', shift: 'Day — 07:00–15:00' },
    { device: 'ALARAD-DSM-1029', staffId: 'ST-02', since: '07:00 today', shift: 'Day — 07:00–15:00' },
    { device: 'ALARAD-DSM-1033', staffId: 'ST-07', since: '06:55 today', shift: 'Day — 07:00–15:00' },
    { device: 'ALARAD-DSM-1051', staffId: 'ST-06', since: '07:00 today', shift: 'Day — 07:00–15:00' },
    { device: 'ALARAD-DSM-1064', staffId: 'ST-13', since: '07:10 today', shift: 'Day — 07:00–15:00' },
    { device: 'ALARAD-DSM-1072', staffId: 'ST-09', since: '07:00 today', shift: 'Day — 07:00–15:00' },
    { device: 'ALARAD-DSM-1085', staffId: 'ST-15', since: '06:50 today', shift: 'Day — 07:00–15:00' },
    { device: 'ALARAD-DSM-1090', staffId: 'ST-08', since: '07:15 today', shift: 'Day — 07:00–15:00' },
    { device: 'ALARAD-DSM-1103', staffId: 'ST-20', since: '07:05 today', shift: 'Day — 07:00–15:00' },
  ],
  'HOSP-B': [
    { device: 'ALARAD-DSM-2011', staffId: 'HB-01', since: '07:00 today', shift: 'Day — 07:00–15:00' },
    { device: 'ALARAD-DSM-2022', staffId: 'HB-02', since: '07:05 today', shift: 'Day — 07:00–15:00' },
    { device: 'ALARAD-DSM-2033', staffId: 'HB-03', since: '06:55 today', shift: 'Day — 07:00–15:00' },
    { device: 'ALARAD-DSM-2044', staffId: 'HB-04', since: '07:10 today', shift: 'Day — 07:00–15:00' },
    { device: 'ALARAD-DSM-2055', staffId: 'HB-05', since: '07:00 today', shift: 'Day — 07:00–15:00' },
  ],
  'HOSP-C': [
    { device: 'ALARAD-DSM-3011', staffId: 'HC-01', since: '07:00 today', shift: 'Day — 07:00–15:00' },
    { device: 'ALARAD-DSM-3022', staffId: 'HC-02', since: '07:10 today', shift: 'Day — 07:00–15:00' },
    { device: 'ALARAD-DSM-3033', staffId: 'HC-03', since: '07:05 today', shift: 'Day — 07:00–15:00' },
    { device: 'ALARAD-DSM-3044', staffId: 'HC-04', since: '06:55 today', shift: 'Day — 07:00–15:00' },
    { device: 'ALARAD-DSM-3055', staffId: 'HC-05', since: '07:00 today', shift: 'Day — 07:00–15:00' },
  ],
};
export function getInitialDeviceBindings(facilityId = DEFAULT_FACILITY) {
  return DEVICE_BINDINGS_BY_FACILITY[facilityId] || DEVICE_BINDINGS_BY_FACILITY[DEFAULT_FACILITY];
}

const ROTATION_LOG_BY_FACILITY = {
  'HOSP-A': [
    { time: '07:02', text: 'Device ALARAD-DSM-1042 paired to <b>ST-04 · T. Al-Qahtani</b> at shift start (Day shift).' },
    { time: 'Yesterday 15:00', text: 'Device ALARAD-DSM-1042 handed off from <b>ST-06 · Night shift</b> to <b>ST-04</b> — dosimeter reading carried over, ownership re-bound to new Employee ID.' },
    { time: 'Yesterday 07:00', text: 'Device ALARAD-DSM-1017 paired to <b>ST-11 · F. Al-Harbi</b> at shift start.' },
  ],
  'HOSP-B': [
    { time: '07:00', text: 'Device ALARAD-DSM-2011 paired to <b>HB-01 · Y. Al-Ghamdi</b> at shift start (Day shift).' },
    { time: 'Yesterday 15:00', text: 'Device ALARAD-DSM-2033 handed off from <b>Night shift staff</b> to <b>HB-03</b> — dosimeter reading carried over, ownership re-bound to new Employee ID.' },
  ],
  'HOSP-C': [
    { time: '07:00', text: 'Device ALARAD-DSM-3011 paired to <b>HC-01 · F. Al-Zahrani</b> at shift start (Day shift).' },
    { time: 'Yesterday 15:00', text: 'Device ALARAD-DSM-3022 handed off from <b>Night shift staff</b> to <b>HC-02</b> — dosimeter reading carried over, ownership re-bound to new Employee ID.' },
  ],
};
export function getInitialRotationLog(facilityId = DEFAULT_FACILITY) {
  return ROTATION_LOG_BY_FACILITY[facilityId] || ROTATION_LOG_BY_FACILITY[DEFAULT_FACILITY];
}

const FLOOR_ROOMS_BY_FACILITY = {
  'HOSP-A': [
    { name: 'Cath Lab 1', x: 10, y: 20, w: 130, h: 110 },
    { name: 'Cath Lab 2', x: 150, y: 20, w: 130, h: 110 },
    { name: 'Cath Lab 3', x: 290, y: 20, w: 130, h: 110 },
    { name: 'Fluoroscopy Suite', x: 430, y: 20, w: 120, h: 110 },
    { name: 'Nuclear Medicine', x: 10, y: 150, w: 130, h: 110 },
    { name: 'PET/CT Suite', x: 150, y: 150, w: 130, h: 110 },
    { name: 'CT Suite', x: 290, y: 150, w: 130, h: 110 },
    { name: 'Corridor', x: 430, y: 150, w: 120, h: 110 },
  ],
  'HOSP-B': [
    { name: 'Cath Lab 1', x: 20, y: 20, w: 180, h: 110 },
    { name: 'Cath Lab 2', x: 20, y: 150, w: 180, h: 110 },
    { name: 'Fluoroscopy Suite', x: 220, y: 20, w: 180, h: 80 },
    { name: 'Nuclear Medicine', x: 360, y: 150, w: 180, h: 110 },
    { name: 'CT Suite', x: 360, y: 20, w: 180, h: 80 },
    { name: 'Corridor', x: 220, y: 120, w: 120, h: 140 },
  ],
  'HOSP-C': [
    { name: 'Cath Lab 1', x: 20, y: 20, w: 170, h: 110 },
    { name: 'Fluoroscopy Suite', x: 200, y: 20, w: 170, h: 110 },
    { name: 'PET/CT Suite', x: 380, y: 20, w: 160, h: 110 },
    { name: 'Nuclear Medicine', x: 20, y: 150, w: 170, h: 110 },
    { name: 'CT Suite', x: 200, y: 150, w: 170, h: 110 },
    { name: 'Corridor', x: 380, y: 150, w: 160, h: 110 },
  ],
};
export function getFloorRooms(facilityId = DEFAULT_FACILITY) {
  return FLOOR_ROOMS_BY_FACILITY[facilityId] || FLOOR_ROOMS_BY_FACILITY[DEFAULT_FACILITY];
}

/**
 * AI model inputs used for personalized risk assessment. "active" inputs
 * are actually read by the computed logic in domain/riskEngine.js today;
 * "proposed" inputs are already collected by the wearable (see
 * getSensorReadings) but are not yet wired into the risk/anomaly model —
 * label them as proposed rather than implying a live connection.
 */
export function getAiInputs() {
  return [
    { ico: '☢', name: 'Radiation Dose', note: 'µSv/h from the wearable dosimeter', status: 'active' },
    { ico: '⏱', name: 'Exposure Duration', note: 'Minutes in the current procedure', status: 'active' },
    { ico: '📈', name: 'Previous Exposure', note: 'Cumulative yearly dose on file', status: 'active' },
    { ico: '♥', name: 'Heart Rate', note: 'bpm from the wearable sensor', status: 'proposed' },
    { ico: '≋', name: 'Respiratory Rate', note: 'breaths/min from the wearable sensor', status: 'proposed' },
    { ico: '🕒', name: 'Work Shift', note: 'Day / Night rotation context', status: 'proposed' },
  ];
}

/** Illustrative source → data mapping for the prototype's standardized JSON payload. Not live integrations. */
export function getDataSources() {
  return [
    { source: 'Wearable Sensors', icon: '⌚', provides: 'Heart Rate, Respiratory Rate' },
    { source: 'Radiation Monitor', icon: '☢', provides: 'Radiation Dose' },
    { source: 'Staff Management System', icon: '🪪', provides: 'Employee ID, Work Shift' },
    { source: 'Hospital System', icon: '🏥', provides: 'Department, Facility' },
  ];
}

/** Proposed security architecture — see Data Security view for implementation status. */
export function getSecurityArchitecture() {
  return [
    { ico: '📡', name: 'Secure Data Transmission', note: 'TLS-authenticated wearable → gateway channel' },
    { ico: '🔐', name: 'Encryption', note: 'AES-256 at rest' },
    { ico: '🔒', name: 'Transport Security', note: 'TLS 1.2+' },
    { ico: '🪪', name: 'Role-Based Access Control', note: 'RSO / admin / staff roles' },
  ];
}

/** Regulatory/governance gaps identified while mapping ALARAD's components to current policy (see Policy Mapping view). */
export function getPolicyGaps() {
  return [
    { title: 'Data Standardization Gap', text: 'No hospital-wide mandate yet requires a common JSON schema for dose, biometric, and location data — cross-vendor exchange still relies on ad hoc mappings.' },
    { title: 'Wearable–Employee Identification Gap', text: 'Existing regulations do not specify how a wearable device must be verifiably bound to an Employee ID across shift handoffs.' },
    { title: 'Inter-Hospital Data Sharing Gap', text: 'No policy currently governs how exposure history should follow a staff member who rotates between facilities such as Hospital A, B, and C.' },
    { title: 'AI Governance Gap', text: 'No dedicated framework yet defines audit, explainability, and human-review requirements specific to AI-based radiation risk prediction.' },
  ];
}

/** Knowledge base: chunked, source-tagged excerpts from the 7 reference documents. */
export function getKnowledgeBase() {
  return [
    {
      keywords: ['dose limit', 'approach', 'limit', 'exceed', 'occupational dose', 'regulatory limit'],
      answer: 'The applicable occupational limit is 20 mSv per year, averaged over defined periods of 5 years, with no single year exceeding 50 mSv (ICRP Publication 103). When a projected or measured dose approaches this limit, ALARAD flags the reading through its risk-prediction model, sends a real-time alert to the staff member’s smartwatch, and escalates the case to the hospital dashboard. The event is checked against this limit before any escalation proceeds, and a Radiation Safety Officer reviews the case before further action is taken.',
      source: 'NRRC — Compliance with Dose Limits', document: 'NRRC-R-01-SR02', page: 2,
      action: 'Review by Radiation Safety Officer',
      url: 'https://istitlaa.ncc.gov.sa/ar/energy/nrrc/compliancewithdoeslimits/Documents/Compliance%20with%20Dose%20Limits-NRRC-R-01-SR02.pdf',
    },
    {
      keywords: ['regulation', 'saudi arabia', 'applies', 'legal framework', 'who regulates', 'regulator', 'ksa law'],
      answer: 'Occupational radiation dose limits in Saudi Arabia fall under the Nuclear and Radiological Regulatory Commission (NRRC) legal framework, which sets the compliance requirements ALARAD’s alerts and escalation workflow are checked against.',
      source: 'NRRC — Nuclear and Radiological Regulatory Legal Framework', document: 'NRRC Legal Framework', page: 1,
      action: 'Confirm alert thresholds against current NRRC limits',
      url: 'https://nrrc.gov.sa/en/legal-framework/nuclear-regulations-and-executive-regulations/',
    },
    {
      keywords: ['leak', 'radiation leak', 'shielding failure', 'equipment malfunction', 'abnormal', 'anomaly', 'malfunction'],
      answer: 'ALARAD’s anomaly detection model continuously compares live dose-rate readings to expected baselines for that room and procedure. An unplanned pattern — such as a shielding failure — is identified in real time and distinguished from normal fluctuation, triggering an immediate alert to the affected staff member and an escalation to the hospital dashboard for RSO review.',
      source: 'IAEA SSG-46 — Radiation Protection and Safety in Medical Uses of Ionizing Radiation', document: 'IAEA SSG-46', page: 14,
      action: 'Escalate to Radiation Safety Officer and document per NRRC reporting requirements',
      url: 'https://www.iaea.org/publications/11102/radiation-protection-and-safety-in-medical-uses-of-ionizing-radiation',
    },
    {
      keywords: ['privacy', 'personal data', 'performance review', 'misuse', 'staff evaluation', 'fairness', 'data governance'],
      answer: 'Exposure and alert data collected for radiation-safety purposes should not automatically be reused for unrelated staff-performance decisions. Any secondary use must be assessed against purpose limitation, lawful basis, transparency, and access-control requirements, and reviewed by data-protection and compliance personnel before proceeding.',
      source: 'SDAIA/NDMO — National Data Management and Personal Data Protection Standards', document: 'SDAIA/NDMO Standards', page: 8,
      action: 'Route request through data-protection and compliance review',
      url: 'https://sdaia.gov.sa/ndmo/Files/PoliciesEn001.pdf',
    },
    {
      keywords: ['secure', 'transmission', 'cybersecurity', 'ot', 'it', 'network', 'encrypted'],
      answer: 'Data from the ALARAD smartwatch is transmitted to the mobile application and cloud platform under secure operational-technology cybersecurity controls covering hospital OT/IT systems, before any pre-processing or model input occurs.',
      source: 'NCA — Operational Technology Cybersecurity Controls Methodology (OTCC-1:2022)', document: 'NCA OTCC-1:2022', page: 3,
      action: 'Verify transmission channel against OTCC-1:2022 controls',
      url: 'https://cdn.nca.gov.sa/api/files/public/upload/071d52fc-014b-4f15-84ce-1289f3f5c3a9_Operational-Technology-Cybersecurity-Controls-Methodogy-and-Mapping-Annex.pdf',
    },
    {
      keywords: ['quality control', 'qc program', 'equipment check', 'calibration', 'medical equipment'],
      answer: 'Medical radiological equipment supporting ALARAD’s data collection is expected to operate under an established quality-control program, ensuring the dose-rate readings feeding the AI models remain reliable.',
      source: 'NRRC — QC Program for Medical Radiological Equipment', document: 'NRRC-R-01-SR03', page: 4,
      action: 'Confirm equipment is within current QC program cycle',
      url: 'https://istitlaa.ncc.gov.sa/en/energy/nrrc/establishmentandimplementationofqcprogram/Documents/Establishment%20and%20Implementation%20of%20Quality%20Control%20(QC)%20Program%20for%20Medical%20Radiological%20Equipment-2025_Istitlaa.pdf',
    },
    {
      keywords: ['risk', 'risk prediction', 'forecast', 'predict dose', 'time series', 'model'],
      answer: 'ALARAD’s AI layer does not measure radiation directly — it forecasts expected future dose using time-series analysis of historical and real-time readings, assigns a risk level, and flags individuals trending toward higher occupational exposure.',
      source: 'ICRP Publication 103 — The 2007 Recommendations of the ICRP', document: 'ICRP Publication 103', page: 5,
      action: 'Cross-check forecast against ICRP dose-limitation principles',
      url: 'https://www.icrp.org/docs/icrp_publication_103-annals_of_the_icrp_37(2-4)-free_extract.pdf',
    },
  ];
}

export function getPolicyMapping() {
  return [
    { node: 'SRC', comp: 'Smartwatch + electronic dosimeter — real-time dose, rate & context capture', risk: 'Sensor drift / miscalibration', policy: 'IAEA GSR Part 3', req: 'Radiation protection & safety of sources', act: 'Periodic dosimeter calibration' },
    { node: 'C', comp: 'Mobile app & cloud platform — secure transmission', risk: 'Data interception / tampering', policy: 'NCA OTCC-1:2022', req: 'OT/IT cybersecurity controls', act: 'Encrypted transmission channel' },
    { node: 'PP', comp: 'Pre-processing — cleaning & structuring exposure, working, user & environmental data', risk: 'Data quality / bias before model input', policy: 'SDAIA/NDMO Standards', req: 'Data management standards', act: 'Validate & structure before model input' },
    { node: 'M', comp: 'Time-series forecasting, risk prediction, anomaly detection', risk: 'False negative / missed anomaly', policy: 'ICRP Publication 103', req: 'ICRP dose-limitation recommendations', act: 'Flag deviation, forecast next dose' },
    { node: 'P', comp: 'Human-in-the-loop — outputs checked against dose limits', risk: 'Unreviewed high-risk escalation', policy: 'NRRC-R-01-SR02 / IAEA SSG-46', req: 'Compliance with dose limits', act: 'RSO review before escalation' },
    { node: 'D', comp: 'Alert routing — smartwatch (individual) + dashboard (department)', risk: 'Delayed / missed delivery', policy: 'NCA OTCC-1:2022', req: 'Secure distribution across OT/IT', act: 'Dual-channel real-time delivery' },
    { node: 'SINK', comp: 'End-user alert (staff) & RSO / hospital administration dashboard', risk: 'Data reused outside safety purpose', policy: 'ITU AI-Ready Framework 2.0', req: 'Standardized AI-readiness governance', act: 'Purpose-limitation review for secondary use' },
  ];
}
