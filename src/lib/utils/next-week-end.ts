import { DayOfWeek } from '../enums';

export default (dayOfWeek: DayOfWeek, timeOfDay: number) => {
  const today = new Date();
  const until = new Date(today);

  // Get next dayOfWeek
  until.setDate(today.getDate() + ((dayOfWeek - today.getDay() + 7) % 7));

  // Set the timeOfDay
  const hours = Math.floor(timeOfDay / 60);
  const minutes = timeOfDay % 60;

  until.setHours(hours, minutes, 0, 0);

  // If the time has already passed, move to next week
  if (until.getTime() <= today.getTime()) {
    until.setDate(until.getDate() + 7);
  }

  return until;
};
