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
 */

// Status is not stored here — it is computed live from each staff member's
// cumulative yearly dose via domain/riskEngine.js's classifyDoseStatus(),
// never hand-typed. See infrastructure/store.js.
export function getStaff() {
  return [
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
  ];
}

export function getWeeklyTrend() {
  return [0.31, 0.28, 0.44, 0.39, 0.52, 0.35, 0.42];
}

export function getInitialAlerts() {
  return [
    { id: 1, level: 'critical', title: 'ST-04 approaching critical exposure level', meta: 'Cath Lab 1 · 2 min ago · Source: Anomaly Detection model', ack: false },
    { id: 2, level: 'critical', title: 'ST-06 approaching critical exposure level', meta: 'Cath Lab 3 · 15 min ago · Source: Anomaly Detection model', ack: false },
    { id: 3, level: 'warning', title: 'ST-11 elevated dose rate this week', meta: 'Fluoroscopy Suite · 40 min ago · Source: Time-series forecast', ack: false },
    { id: 4, level: 'warning', title: 'ST-13 elevated dose trend this week', meta: 'PET/CT Suite · 1 hr ago · Source: Time-series forecast', ack: false },
    { id: 5, level: 'warning', title: 'ST-20 elevated dose trend this week', meta: 'Cath Lab 2 · 1.5 hrs ago · Source: Time-series forecast', ack: false },
    { id: 6, level: 'info', title: 'Weekly compliance report generated', meta: 'Hospital-wide · 3 hrs ago · Source: Automated reporting', ack: false },
  ];
}

export function getRecommendations() {
  return [
    { title: 'Rotate ST-04 out of Cath Lab 1 for remainder of shift', why: 'Cumulative dose trending toward NRRC-R-01-SR02 dose limit within projected 3 procedures.', tag: 'High priority' },
    { title: 'Rotate ST-06 out of Cath Lab 3 pending dose review', why: 'Cumulative dose has crossed 90% of the annual ICRP Publication 103 limit for this shift cycle.', tag: 'High priority' },
    { title: 'Increase shielding for PET/CT Suite tracer-handling procedures', why: 'Forecast model shows repeated elevated dose-rate readings above department baseline for ST-13.', tag: 'Medium priority' },
    { title: 'Schedule additional dosimeter calibration check — Fluoroscopy Suite', why: 'Two devices reporting readings outside expected variance range this week.', tag: 'Low priority' },
  ];
}

export function getExposureLog() {
  return [
    ['08:12', 'ST-04', 'Cath Lab 1', 'Interventional Cardiology', '182 µSv/h', '0.14 mSv'],
    ['09:03', 'ST-11', 'Fluoroscopy Suite', 'Diagnostic Fluoroscopy', '95 µSv/h', '0.06 mSv'],
    ['10:47', 'ST-02', 'Cath Lab 2', 'Angiography', '110 µSv/h', '0.09 mSv'],
    ['11:20', 'ST-07', 'Nuclear Medicine', 'Nuclear Scan', '40 µSv/h', '0.03 mSv'],
    ['12:55', 'ST-04', 'Cath Lab 1', 'Interventional Cardiology', '201 µSv/h', '0.16 mSv'],
    ['13:40', 'ST-09', 'CT Suite', 'CT Scan', '58 µSv/h', '0.05 mSv'],
    ['14:10', 'ST-06', 'Cath Lab 3', 'Interventional Cardiology', '175 µSv/h', '0.13 mSv'],
    ['15:02', 'ST-13', 'PET/CT Suite', 'PET Tracer Handling', '65 µSv/h', '0.05 mSv'],
  ];
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

export function getInitialDeviceBindings() {
  return [
    { device: 'ALARAD-DSM-1042', staffId: 'ST-04', since: '07:02 today' },
    { device: 'ALARAD-DSM-1017', staffId: 'ST-11', since: '07:05 today' },
    { device: 'ALARAD-DSM-1029', staffId: 'ST-02', since: '07:00 today' },
    { device: 'ALARAD-DSM-1033', staffId: 'ST-07', since: '06:55 today' },
    { device: 'ALARAD-DSM-1051', staffId: 'ST-06', since: '07:00 today' },
    { device: 'ALARAD-DSM-1064', staffId: 'ST-13', since: '07:10 today' },
  ];
}

export function getInitialRotationLog() {
  return [
    { time: '07:02', text: 'Device ALARAD-DSM-1042 paired to <b>ST-04 · T. Al-Qahtani</b> at shift start (Day shift).' },
    { time: 'Yesterday 15:00', text: 'Device ALARAD-DSM-1042 handed off from <b>ST-06 · Night shift</b> to <b>ST-04</b> — dosimeter reading carried over, ownership re-bound to new Employee ID.' },
    { time: 'Yesterday 07:00', text: 'Device ALARAD-DSM-1017 paired to <b>ST-11 · F. Al-Harbi</b> at shift start.' },
  ];
}

export function getFloorRooms() {
  return [
    { name: 'Cath Lab 1', x: 10, y: 20, w: 130, h: 110 },
    { name: 'Cath Lab 2', x: 150, y: 20, w: 130, h: 110 },
    { name: 'Cath Lab 3', x: 290, y: 20, w: 130, h: 110 },
    { name: 'Fluoroscopy Suite', x: 430, y: 20, w: 120, h: 110 },
    { name: 'Nuclear Medicine', x: 10, y: 150, w: 130, h: 110 },
    { name: 'PET/CT Suite', x: 150, y: 150, w: 130, h: 110 },
    { name: 'CT Suite', x: 290, y: 150, w: 130, h: 110 },
    { name: 'Corridor', x: 430, y: 150, w: 120, h: 110 },
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
