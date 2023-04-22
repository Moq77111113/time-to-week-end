import * as vscode from 'vscode';
import Commands, { main } from './commands';
export const activate = (context: vscode.ExtensionContext) => {
  console.log('Extension "time-to-week-end" is now active!');

  for (const [name, command] of Object.entries(Commands)) {
    context.subscriptions.push(
      vscode.commands.registerCommand(name, () => command(context))
    );
    if (name === main) {
      vscode.commands.executeCommand(name);
    }
  }
};

export const deactivate = () => {};
