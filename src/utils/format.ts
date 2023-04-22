type Duration = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

enum Formats {
  hms = 'hms',
  hhmmss = 'hh:mm:ss',
  hoursminutesseconds = 'hours,minutes,seconds',
  dhms = 'dhms',
  ddhhmmss = 'dd:hh:mm:ss',
  dayshourminutesseconds = 'days,hours,minutes,seconds',
}

export default (ts: number, formatStr: string = Formats.hms) => {
  const duration: Duration = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  const totalSeconds = Math.floor(ts / 1000);

  duration.days = Math.floor(totalSeconds / (24 * 60 * 60));
  const remainingSeconds = totalSeconds - duration.days * 24 * 60 * 60;
  duration.hours = Math.floor(remainingSeconds / (60 * 60)) + duration.days * 24;
  duration.minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
  duration.seconds = Math.floor(remainingSeconds % 60);

  switch (formatStr) {
    case Formats.hhmmss:
      return `${duration.hours.toString().padStart(2, '0')}:${duration.minutes
        .toString()
        .padStart(2, '0')}:${duration.seconds.toString().padStart(2, '0')}`;

    case Formats.hoursminutesseconds:
      return `${duration.hours} hours, ${duration.minutes} minutes, ${duration.seconds} seconds`;

    case Formats.ddhhmmss:
      return `${duration.days.toString().padStart(2, '0')}:${duration.hours
        .toString()
        .padStart(2, '0')}:${duration.minutes
        .toString()
        .padStart(2, '0')}:${duration.seconds.toString().padStart(2, '0')}`;

    case Formats.dayshourminutesseconds:
      return `${duration.days} days, ${duration.hours} hours, ${duration.minutes} minutes, ${duration.seconds} seconds`;

    case Formats.dhms:
      return `${duration.days}d ${duration.hours}h ${duration.minutes}m ${duration.seconds}s`;

    case Formats.hms:
    default:
      return `${duration.hours.toString().padStart(2, '0')}h ${duration.minutes
        .toString()
        .padStart(2, '0')}m ${duration.seconds.toString().padStart(2, '0')}s`;
  }
};
