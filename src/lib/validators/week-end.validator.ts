import { DayOfWeek } from '../enums';
import { window } from 'vscode';
import { Configuration } from '../interfaces/configuration.interface';

export const validateWeekEnd = (weekEndConfig: Configuration['week-end']) => {
  const dayOfWeek =
    DayOfWeek[weekEndConfig.dayOfWeek as keyof typeof DayOfWeek];
  if (dayOfWeek === undefined) {
    window.showWarningMessage(
      `Invalid dayOfWeek value in time-to-week-end configuration: ${weekEndConfig.dayOfWeek}. Defaulting to Friday.`
    );
    weekEndConfig.dayOfWeek = 'Friday';
  }

  const timeOfDayRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
  let timeOfDay = 1020; // default to 5:00 PM

  if (timeOfDayRegex.test(weekEndConfig.timeOfDay)) {
    const timeOfDayParts = weekEndConfig.timeOfDay.split(':');
    const hours = parseInt(timeOfDayParts[0]);
    const minutes = parseInt(timeOfDayParts[1]);

    timeOfDay = hours * 60 + minutes;
  } else {
    window.showWarningMessage(
      `Invalid timeOfDay value in time-to-week-end configuration: ${weekEndConfig.timeOfDay}. Defaulting to 17:00.`
    );
  }

  return {
    dayOfWeek,
    timeOfDay,
  };
};
