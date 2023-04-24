import { Format } from '../enums';
import { Duration } from '../interfaces';
export default (ts: number, Formattr: string = Format.HMS) => {
  const duration: Duration = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  const totalSeconds = Math.floor(ts / 1000);

  duration.days = Math.floor(totalSeconds / (24 * 60 * 60));
  const remainingSeconds = totalSeconds - duration.days * 24 * 60 * 60;
  duration.hours =
    Math.floor(remainingSeconds / (60 * 60)) + duration.days * 24;
  duration.minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
  duration.seconds = Math.floor(remainingSeconds % 60);

  switch (Formattr) {
    case Format.HHMMSS:
      return `${duration.hours
        .toString()
        .padStart(2, '0')}:${duration.minutes
        .toString()
        .padStart(2, '0')}:${duration.seconds.toString().padStart(2, '0')}`;

    case Format.HOURSMINUTESSECONDS:
      return `${duration.hours} hours, ${duration.minutes} minutes, ${duration.seconds} seconds`;

    case Format.DDHHMMSS:
      return `${duration.days
        .toString()
        .padStart(2, '0')}:${duration.hours.toString().padStart(2, '0')}:${
        duration.minutes
      }
        .toString()
        .padStart(2, '0')}:${duration.seconds.toString().padStart(2, '0')}`;

    case Format.DAYSHOURSMINUTESSECONDS:
      return `${duration.days} days, ${duration.hours} hours, ${duration.minutes} minutes, ${duration.seconds} seconds`;

    case Format.DHMS:
      return `${duration.days}d ${duration.hours}h ${duration.minutes}m ${duration.seconds}s`;

    case Format.HMS:
    default:
      return `${duration.hours
        .toString()
        .padStart(2, '0')}h ${duration.minutes
        .toString()
        .padStart(2, '0')}m ${duration.seconds.toString().padStart(2, '0')}s`;
  }
};
