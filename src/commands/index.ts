import { default as main, name as mainCommand } from './run';
import {
  default as remainingTime,
  name as remainingTimeCommand,
} from './remaining-time';
import { ExtensionContext } from 'vscode';
const commands: Record<string, (context: ExtensionContext) => void> = {
  [mainCommand]: main,
  [remainingTimeCommand]: remainingTime,
};

export default commands;
export { mainCommand as main };
