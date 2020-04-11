const normalisedTimePeriod = (periodType, timeToElapse) => {
  let days = null;
  if (periodType === 'days') days = timeToElapse;
  if (periodType === 'months') days = timeToElapse * 30;
  if (periodType === 'weeks') days = timeToElapse * 7;
  return days;
};
const factorComputation = (periodType, timeToElapse) => {
  const setsOfThree = Math.trunc(normalisedTimePeriod(periodType, timeToElapse) / 3);
  return 2 ** setsOfThree;
};
const availableHospitals = (totalHospitalBeds, severeCases) => {
  const thirtyFivePerc = 0.35 * totalHospitalBeds;
  const hospitalBedsByRequestedTime = thirtyFivePerc - severeCases;
  return Math.trunc(hospitalBedsByRequestedTime);
};
const covid19ImpactEstimator = (data) => {
  const {
    periodType, timeToElapse, reportedCases, totalHospitalBeds
  } = data;
  const impact = {};
  const severeImpact = {};
  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;
  const multiplyFactor = factorComputation(periodType, timeToElapse);
  impact.infectionsByRequestedTime = impact.currentlyInfected * multiplyFactor;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * multiplyFactor;
  // severe impact available hospital beds
  const fifteenPerc = 0.15 * severeImpact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = fifteenPerc;
  const beds = availableHospitals(totalHospitalBeds, fifteenPerc);
  severeImpact.hospitalBedsByRequestedTime = beds;
  // impact availabel hospital beds
  const fifteenImpact = 0.15 * impact.infectionsByRequestedTime;
  impact.severeCasesByRequestedTime = fifteenImpact;
  const bedsImpact = availableHospitals(totalHospitalBeds, fifteenImpact);
  impact.hospitalBedsByRequestedTime = bedsImpact;

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
