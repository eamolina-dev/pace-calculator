export const fieldMap = {
  km: "distance",
  meters: "distance",
  hours: "time",
  minutes: "time",
  seconds: "time",
  paceminutes: "pace",
  paceseconds: "pace",
};

export const optionsMap = {
  '5k': { field: 'distance', km: '5', meters: '0' },
  '10k': { field: 'distance', km: '10', meters: '0' },
  '21k': { field: 'distance', km: '21', meters: '97' },
  '42k': { field: 'distance', km: '42', meters: '195' },
  '10m': { field: 'time', hours: '0', minutes: '10', seconds: '0' },
  '30m': { field: 'time', hours: '0', minutes: '30', seconds: '0' },
  '1h': { field: 'time', hours: '1', minutes: '0', seconds: '0' },
  '2h': { field: 'time', hours: '2', minutes: '0', seconds: '0' },
  '3m/km': { field: 'pace', paceMinutes: '3', paceSeconds: '0' },
  '4m/km': { field: 'pace', paceMinutes: '4', paceSeconds: '0' },
  '5m/km': { field: 'pace', paceMinutes: '5', paceSeconds: '0' },
  '6m/km': { field: 'pace', paceMinutes: '6', paceSeconds: '0' },
};
