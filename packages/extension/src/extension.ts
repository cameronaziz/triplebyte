import path from 'path';
import { commands, ExtensionContext, FileType, Terminal, Uri, window, workspace } from 'vscode';

const getWorkspaceUris = (): Uri[] => {
  const folders = workspace.workspaceFolders

  if (!folders) {
    return [];
  }

  return folders.map((folder) => folder.uri)
};

const readDir = async (uri: Uri) => {
  const response = await workspace.fs.readDirectory(uri);
  const uris = response
    .filter(([name]) => !name.startsWith('.') &&  !name.startsWith('node_modules'))
  .map(([name, type]) => Uri.file(path.join(uri.fsPath, name)))
  return packageJson(uris);
}

const packageJson = async (uris: Uri[]): Promise<Uri[]> => {
  const data: Uri[] = []
  for (let i = 0; i < uris.length; i++) {
    const uri = uris[i]
    const stats = await workspace.fs.stat(uri);
    switch (stats.type) {
      case FileType.Directory: {
        const response = await readDir(uri);
        data.push(...response);
      }
      case FileType.File: {
        if (uri.path.endsWith('package.json')) {
          data.push(uri);
        }
      }

    }
  }
  return data;
};

const parse = async (uri: Uri[], terminal: Terminal): Promise<string[]> => {
  const promises = uri
    .map(async (uri) => {
      const file = await workspace.fs.readFile(uri);
      const parsed = JSON.parse(file.toString());
      if (parsed.bin) {
        terminal.sendText(`cd ${uri.fsPath.split('/').slice(0, -1).join('/')}`);
        return Object.keys(parsed.bin)
      }
    })
  const data = await Promise.all(promises)
  const result = data
    .filter((item): item is string[] => !!item)
    .reduce((acc, curr) => acc.concat(curr), [])
  console.log(result)
  return result;
};

const launch = async () => {

  const uris = getWorkspaceUris();
  if (uris.length < 1) {
    window.showErrorMessage('No workspace found');
    return;
  }

  const terminal = window.createTerminal({
    name: 'Tetris',
    shellPath: 'bash',
    location: 2,
  });

  const pj = await packageJson(uris, );
  await parse(pj, terminal)
  terminal.show();
  terminal.sendText("cd packages/cli");
  terminal.sendText("npm link");
  terminal.sendText("tetris");
};

const start = async () => {
  await commands.executeCommand('workbench.action.terminal.focus')
  await commands.executeCommand('workbench.action.terminal.toggleTerminal')
  commands.executeCommand('notifications.clearAll');
  window.showInformationMessage('Starting Tetris in integrated terminal.');
  const { activeTerminal } = window;
  if (activeTerminal) {
    activeTerminal.hide();
  }
  await launch();
}

export const activate = async (context: ExtensionContext) => {

  commands.registerCommand('triplebyte.kill', () => {
    context.workspaceState.update('hasStarted', false);
  });

  commands.registerCommand('triplebyte.auto', () => {
    context.workspaceState.update('hasStarted', true);
  });

  commands.registerCommand('triplebyte.launch', start);

  await start();
};

export const deactivate = () => {
	// Methods executed when extension is deactivated.
};
