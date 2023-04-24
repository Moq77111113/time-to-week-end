import { DisplayText } from '../enums';

export interface Configuration {
  'week-end': {
    dayOfWeek: string;
    timeOfDay: string;
  };
  format: string;
  displayText: DisplayText;
  customText: {
    text: string;
    format: string;
  };
  'on-week-end': {
    title: string;
    text: string;
    emojis: string[];
    gif: string;
    url?: string;
  };
}
