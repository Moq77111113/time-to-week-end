import * as vscode from 'vscode';
import { Configuration } from '../interfaces/configuration.interface';
import format from '../utils/format';
import remainingTime from '../utils/remainingTime';
import { validateWeekEnd } from '../validators';
import { nextWeekEnd } from '../utils';

export const name = 'time-to-week-end.showRemainingTime';
export default (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'time-to-week-end.showRemainingTime',
      () => {
        const config = vscode.workspace.getConfiguration('time-to-week-end');
        const { dayOfWeek, timeOfDay } = validateWeekEnd(
          config.get<Configuration['week-end']>('week-end', {
            dayOfWeek: 'Friday',
            timeOfDay: '17:00',
          })
        );
        const until = nextWeekEnd(dayOfWeek, timeOfDay);
        const formatOption = config.get<Configuration['format']>(
          'format',
          'minutes'
        );
        const duration = remainingTime(until);
        const display = format(duration, formatOption);
        const date = until.toLocaleString(vscode.env.language, {
          hour12: false,
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
        const customText = config.get<string>('customText', '');
        let statusBarItemText = '';
        if (
          config.get<string>('displayText', 'short') === 'custom' &&
          customText
        ) {
          statusBarItemText = customText
            .replace('{{ date }}', date)
            .replace('{{ format }}', display);
        } else if (config.get<string>('displayText', 'short') !== 'none') {
          statusBarItemText = `${display} until ${date}`;
        }
        if (statusBarItemText) {
          vscode.window.showInformationMessage(statusBarItemText);
        }
      }
    )
  );
};
