import { default as main, name as mainCommand } from './run';

import { ExtensionContext } from '../lib/vscode';
const commands: Record<string, (context: ExtensionContext) => void> = {
  [mainCommand]: main,
};

export default commands;
export { mainCommand as main };
