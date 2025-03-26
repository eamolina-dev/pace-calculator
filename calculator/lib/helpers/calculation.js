// Convertions
export const getDistanceInKm = (km, meters) => (parseFloat(km) || 0) + (parseFloat(meters) || 0) / 1000;
export const getTimeInMinutes = (hours, minutes, seconds) => (parseFloat(hours) || 0) * 60 + (parseFloat(minutes) || 0) + (parseFloat(seconds) || 0) / 60;
export const getPace = (minutes, seconds) => (parseFloat(minutes) || 0) + (parseFloat(seconds) || 0) / 60;

// Main operations
export const calculatePace = (timeInMinutes, distanceInKm) => distanceInKm > 0 ? timeInMinutes / distanceInKm : 0;
export const calculateDistance = (timeInMinutes, pace) => pace > 0 ? timeInMinutes / pace : 0;
export const calculateTime = (distanceInKm, pace) => distanceInKm > 0 ? distanceInKm * pace : 0;

// Get pace values
export const getPaceMinutes = (pace) => Math.floor(pace);
export const getPaceSeconds = (pace) => Math.round((pace % 1) * 60);

// Get time values
export const getTimeHours = (time) => Math.floor(time / 60);
export const getTimeMinutes = (time) => Math.floor(time % 60);
export const getTimeSeconds = (time) => Math.round((time % 1) * 60);

// Get distance values
export const getDistanceKm = (distance) => Math.floor(distance);
export const getDistanceMeters = (distance) => Math.round((distance % 1) * 1000);
