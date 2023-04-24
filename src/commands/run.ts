import { format as formatDate } from 'date-fns';
import {
  ExtensionContext,
  window,
  StatusBarAlignment,
  workspace,
  WorkspaceConfiguration,
  VsCodeEnv,
} from '../lib/vscode';
import { DisplayText } from '../lib/enums';
import { Configuration } from '../lib/interfaces';
import { nextWeekEnd, onWeekEnd, remainingTime } from '../lib/utils';
import { format } from '../lib/utils';
import { validateWeekEnd } from '../lib/validators';
export const name = 'time-to-week-end.run';

export default (context: ExtensionContext) => {
  const statusBarItem = window.createStatusBarItem(
    StatusBarAlignment.Right,
    100
  );
  context.subscriptions.push(statusBarItem);

  const config = workspace.getConfiguration('time-to-week-end');
  const { dayOfWeek, timeOfDay } = validateWeekEnd(
    config.get<Configuration['week-end']>('week-end', {
      dayOfWeek: 'Friday',
      timeOfDay: '17:00',
    })
  );
  const until = nextWeekEnd(dayOfWeek, timeOfDay);
  const formatOption = config.get<Configuration['format']>('format', 'minutes');
  const additionalText = displayedText(config, until);

  const updateStatusBar = () => {
    const duration = remainingTime(until);
    let display = `${format(duration, formatOption)} ${additionalText}`.trim();

    if (duration <= 0) {
      clearInterval(intervalId);
      display = 'Week-end time !';
      onWeekEnd(
        context,
        config.get<Configuration['on-week-end']>('on-week-end')
      );
      setTimeout(updateStatusBar, 60000);
    }
    statusBarItem.text = display;
    statusBarItem.show();
  };

  const intervalId = setInterval(updateStatusBar, 1000);
  context.subscriptions.push({ dispose: () => clearInterval(intervalId) });
};

const displayedText = (config: WorkspaceConfiguration, until: Date) => {
  const displayTextOption = config.get<Configuration['displayText']>(
    'displayText',
    DisplayText.Custom
  );
  const customTextConfig = config.get<Configuration['customText']>(
    'customText',
    {
      text: 'until week-end !',
      format: 'dd/mm/yyyy HH:mm:ss',
    }
  );

  let displayText = '';
  switch (displayTextOption) {
    case DisplayText.Short: {
      displayText = 'until week-end !';
      break;
    }
    case DisplayText.Medium: {
      displayText = `until ${until.toLocaleDateString(VsCodeEnv.language)} !`;
      break;
    }
    case DisplayText.None: {
      displayText = '';
      break;
    }
    case DisplayText.Long: {
      displayText = `until ${until.toLocaleString(VsCodeEnv.language, {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        day: '2-digit',
        month: 'short',
        year: '2-digit',
      })} !`;
      break;
    }
    case DisplayText.Custom:
    default: {
      const customText = customTextConfig.text || 'until week-end !';
      const customFormat = customTextConfig.format || 'dd/mm/yyyy HH:mm:ss';
      let formattedDate = '';
      try {
        formattedDate = formatDate(until, customFormat);
      } catch {
        formattedDate = formatDate(until, 'dd/MM/yyyy HH:mm:ss');
      }
      displayText = customText.replace(/\{\{\s*date\s*\}\}/gi, formattedDate);
    }
  }

  return displayText;
};
