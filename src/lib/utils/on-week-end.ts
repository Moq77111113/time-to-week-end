import { ExtensionContext, window, ViewColumn } from '../vscode';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as HBS from 'handlebars';
import { Configuration } from '../interfaces/configuration.interface';
import * as vscode from 'vscode';
import hbsHelpers from 'handlebars-helpers';

const helpers = hbsHelpers();

export default (
  context: ExtensionContext,
  data?: Configuration['on-week-end']
) => {
  const panel = window.createWebviewPanel('web', 'Week-end !', ViewColumn.One, {
    enableScripts: true,
  });

  HBS.registerHelper(helpers);

  const template = HBS.compile(
    readFileSync(join(context.extensionPath, 'views', 'weekend.hbs'), 'utf-8')
  );

  const templateData = {
    color: '#FF80BF',
    title: "It's tWeek-end !",
    text: "It's time to relax, enjoy your week-end !",
    emojis: ['🎉', '🎊', '🥳', '🎈', '🎁'],
    gif: 'https://media4.giphy.com/media/vuEAn3bsY9rEs5mXvg/giphy.gif?cid=ecf05e47hfkwkuhunxfskfpz9z9bw1d82muljill914h5ura&rid=giphy.gif&ct=g',
  };
  if (data?.url) {
    try {
      vscode.env.openExternal(vscode.Uri.parse(data.url));
      return;
    } catch {
      //
    }
  }
  panel.webview.html = template({ ...templateData, ...data });
  context.subscriptions.push(panel);
};
