const makeUserPreferences = (dateTime, minTemp, maxTemp, chanceOfPrecipitation) =>
  ({ dateTime, minTemp, maxTemp, chanceOfPrecipitation });

const makeResponseMock = (temperature, precipProbability) => {
  const mock = { data: { currently: {}}};

  if (typeof temperature === 'number' && typeof precipProbability === 'number')
    Object.assign(mock.data.currently, { temperature, precipProbability });

  return mock;
};

export { makeUserPreferences, makeResponseMock };
