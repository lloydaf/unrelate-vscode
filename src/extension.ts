// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { cleanup } from 'unrelate/bin/lib/cleanup';
import { addPath, configureBaseUrl } from 'unrelate/bin/lib/configure';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let cleanupFileCommand = vscode.commands.registerCommand('unrelate:cleanup', () => {
		const currentlyOpenTabfilePath = vscode.window.activeTextEditor?.document.fileName || '';
		const rootPath = vscode.workspace.rootPath || '';
		process.chdir(rootPath);
		vscode.window.showInformationMessage(`Cleaning up ${currentlyOpenTabfilePath}`);
		cleanup(currentlyOpenTabfilePath.replace(rootPath, '.')).catch(error => vscode.window.showErrorMessage(error.message));
	});

	let cleanupDirectory = vscode.commands.registerCommand('unrelate:cleanup-directory', () => {
		const currentlyOpenTabfilePath = vscode.window.activeTextEditor?.document.fileName || '';
		const currentDirectory = currentlyOpenTabfilePath.slice(0, currentlyOpenTabfilePath.lastIndexOf('/'));
		const rootPath = vscode.workspace.rootPath || '';
		process.chdir(rootPath);
		vscode.window.showInformationMessage(`Cleaning up ${currentDirectory}`);
		cleanup(currentDirectory.replace(rootPath, '.')).catch(error => vscode.window.showErrorMessage(error.message));
	});

	let addPathCommand = vscode.commands.registerCommand('unrelate:addPath-directory', () => {
		const currentlyOpenTabfilePath = vscode.window.activeTextEditor?.document.fileName || '';
		const currentDirectory = currentlyOpenTabfilePath.slice(0, currentlyOpenTabfilePath.lastIndexOf('/'));
		const rootPath = vscode.workspace.rootPath || '';
		process.chdir(rootPath);
		vscode.window.showInformationMessage(`Adding Path to ${currentDirectory}`);
		addPath(currentDirectory.replace(rootPath, '.')).catch(error => vscode.window.showErrorMessage(error.message));
	});

	let addPathToFile = vscode.commands.registerCommand('unrelate:addPath', () => {
		const currentlyOpenTabfilePath = vscode.window.activeTextEditor?.document.fileName || '';
		const rootPath = vscode.workspace.rootPath || '';
		process.chdir(rootPath);
		vscode.window.showInformationMessage(`Adding Path to ${currentlyOpenTabfilePath}`);
		addPath(currentlyOpenTabfilePath.replace(rootPath, '.')).catch(error => vscode.window.showErrorMessage(error.message));
	});

	let configureBaseUrlCommand = vscode.commands.registerCommand('unrelate:configureBaseUrl', () => {
		const currentlyOpenTabfilePath = vscode.window.activeTextEditor?.document.fileName || '';
		const currentDirectory = currentlyOpenTabfilePath.slice(0, currentlyOpenTabfilePath.lastIndexOf('/'));
		const rootPath = vscode.workspace.rootPath || '';
		process.chdir(rootPath);
		vscode.window.showInformationMessage(`Setting Base URL to ${currentDirectory}`);
		configureBaseUrl(currentDirectory.replace(rootPath, '.')).catch(error => vscode.window.showErrorMessage(error.message));
	});

	context.subscriptions.push(cleanupFileCommand, cleanupDirectory, addPathCommand, addPathToFile, configureBaseUrlCommand);
}

// this method is called when your extension is deactivated
export function deactivate() { }
