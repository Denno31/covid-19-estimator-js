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
  const hospitalBedsByRequestedTime = totalHospitalBeds - severeCases;
  return hospitalBedsByRequestedTime;
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
  const severeCasesByRequestedTime = Math.trunc(0.15 * severeImpact.infectionsByRequestedTime);
  const beds = availableHospitals(totalHospitalBeds, severeCasesByRequestedTime);
  const hospitalBedsByRequestedTime = beds;

  return {
    data,
    impact,
    severeImpact,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
  };
};

export default covid19ImpactEstimator;
