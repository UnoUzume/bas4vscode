// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function formatted(text) {
    try {
        text = text.replace(/^\s*/gm, "");
        text = text.replace(/\s*{\s*/gm, " {\n");
        text = text.replace(/\s*}/gm, "\n}");
        text = text.replace(/\s*(\w+)\s*=\s*/gm, "\n$1 = ");
        //字符串中不要有大括号
        text = text.replace(/\s*(?<!\".*)(def|let|set|then)(?!.*\")/gm, "\n$1");
        text = text.replace(/\s*set/gm, "\n\nset");
        text = text.replace(/\s*then\s*set/gm, "\nthen set");
        text = text.replace(/def\s+(\w+)/gm, "def $1");
        text = text.replace(/(def \w+|let|set)\s+(\w+)/gm, "$1 $2");
        text = text.replace(/}\s*(\d+\.?\d*(s|ms))/gm, "} $1");
        text = text.replace(/}\s*(\d+\.?\d*(s|ms))\s*,\s*\"/gm, "} $1, \"");
        lines = text.split(/^/m);
        var indent = 0;
        text = "";
        for (var i = 0; i < lines.length; i++) {
            line = lines[i].trim();
            if (line.indexOf("}") != -1) {
                indent--;
            }
            text = text + "    ".repeat(indent) + line + "\n";
            if (line.indexOf("{") != -1) {
                indent++;
            }
        }
        // text = text.replace(/(?<={(.|\s)*)^\s*(?=(.|\s)*})/gm, "    ");
    } catch (e) {
        vscode.window.showInformationMessage(`[Error Format]:${e} \n`);
    }
    return text;
}
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "bas" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand(
        "bas.helloWorld",
        function () {
            // The code you place here will be executed every time your command is executed

            // Display a message box to the user
            vscode.window.showInformationMessage(
                "Hello World from bas4vscode!"
            );
        }
    );

    context.subscriptions.push(disposable);
    context.subscriptions.push(
        vscode.languages.registerDocumentFormattingEditProvider("bas", {
            provideDocumentFormattingEdits(document, options, token) {
                const result = [];
                const start = new vscode.Position(0, 0);
                const end = new vscode.Position(
                    document.lineCount - 1,
                    document.lineAt(document.lineCount - 1).text.length
                );
                const range = new vscode.Range(start, end);
                let text = formatted(document.getText(range));
                result.push(new vscode.TextEdit(range, text));
                // vscode.window.showInformationMessage('Formatted text succeeded!');
                return result;
            },
        })
    );
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
