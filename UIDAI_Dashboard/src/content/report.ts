export const reportMeta = {
  title: 'Predictive Analysis of Aadhaar Biometric Authentication Failures',
  subtitle: 'UIDAI Data Hackathon 2026',
  authors: ['Karan Sharma', 'Adit Hajre', 'Soham Sandip Mhatre'],
  date: 'January 20, 2026',
} as const

export const reportNarrative = {
  problem: [
    'Aadhaar biometric authentication is a primary identity verification mode for welfare and essential services.',
    'In practice, biometric authentication can fail due to worn fingerprints, aging-related degradation, sensor quality issues, or adverse operating environments.',
    'Failures can trigger demographic fallback authentication, repeated retries, friction, and potential service denial.',
  ],
  approach: [
    'Public UIDAI datasets do not explicitly label failures, so we infer biometric stress using indirect but observable signals.',
    'We model biometric stress using three dimensions: (i) loss of biometric dominance, (ii) increased reliance on demographic fallback, and (iii) elevated authentication intensity (retry loops).',
    'We compute a composite risk score aggregated at date × state × district × pincode to identify high-risk regions proactively.',
  ],
  datasets: [
    {
      name: 'Biometric Authentication Dataset',
      description:
        'Age-wise counts of successful biometric authentications; used to measure biometric dominance and coverage.',
    },
    {
      name: 'Demographic Authentication Dataset',
      description:
        'Authentication events via demographic attributes when biometrics are not used; proxy for fallback dependency and biometric stress.',
    },
    {
      name: 'Enrolment Dataset',
      description:
        'Age-wise enrolment counts; used for normalization and population-relative indicators (authentication intensity).',
    },
  ],
  focus: 'The analysis focuses on the 18+ age group due to higher usage and higher biometric variability.',
} as const

export const reportMetrics = {
  definitions: [
    { symbol: 'B18+', meaning: 'Biometric authentications for 18+' },
    { symbol: 'D18+', meaning: 'Demographic (fallback) authentications for 18+' },
    { symbol: 'E18+', meaning: 'Enrolled population (18+)' },
    { symbol: 'T18+', meaning: 'Total authentication demand = B18+ + D18+' },
  ],
  formulas: [
    { name: 'Biometric Share', formula: 'B18+ / T18+' },
    { name: 'Fallback Dependency Ratio', formula: 'D18+ / T18+' },
    { name: 'Authentication Intensity', formula: 'T18+ / E18+' },
  ],
  riskScore: {
    formula:
      'Risk Score = 0.5 × Fallback Dependency Ratio + 0.3 × (1 − Biometric Share) + 0.2 × Normalized Authentication Intensity',
    categories: [
      { label: 'Low', range: '< 0.3', action: 'Normal biometric authentication flow' },
      { label: 'Medium', range: '0.3 ≤ score < 0.6', action: 'Prepare and prioritize fallback mechanisms' },
      { label: 'High', range: '≥ 0.6', action: 'Proactively enable OTP or Iris to prevent service denial' },
    ],
  },
} as const

export const reportFigures = [
  {
    id: 'fig1',
    title: 'Distribution of Aadhaar Biometric Risk Levels (18+)',
    caption:
      'A significant proportion of pincodes fall under medium and high risk categories, highlighting the need for proactive authentication planning.',
    src: '/figures/output_1.png',
  },
  {
    id: 'fig2',
    title: 'Fallback dependency ratio vs risk score',
    caption:
      'Higher reliance on demographic authentication strongly correlates with increased biometric stress, validating fallback usage as a primary failure proxy.',
    src: '/figures/output_2.png',
  },
  {
    id: 'fig3',
    title: 'Biometric share vs risk score',
    caption:
      'Inverse relationship between biometric share and biometric failure risk; regions with higher biometric dominance exhibit lower failure risk.',
    src: '/figures/output_3.png',
  },
  {
    id: 'fig4',
    title: 'Authentication intensity vs risk score',
    caption:
      'Elevated intensity indicates retry loops and authentication friction, contributing to higher observed biometric stress.',
    src: '/figures/output_4.png',
  },
  {
    id: 'fig5',
    title: 'Average biometric failure risk score by state',
    caption:
      'Significant regional variation enables targeted interventions (infrastructure upgrades, proactive alternate authentication).',
    src: '/figures/output_5.png',
  },
] as const

