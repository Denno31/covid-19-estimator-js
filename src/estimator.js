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
const covid19ImpactEstimator = (data) => {
  const { periodType, timeToElapse, reportedCases } = data;
  const impact = {};
  const severeImpact = {};
  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;
  const multiplyFactor = factorComputation(periodType, timeToElapse);
  impact.infectionsByRequestedTime = impact.currentlyInfected * multiplyFactor;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * multiplyFactor;

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
