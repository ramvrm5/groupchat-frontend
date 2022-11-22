// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
/* 
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "groupchat" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('groupchat.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from chat!');
	});

	context.subscriptions.push(disposable);
} */

function activate(context) {
	let disposable = vscode.commands.registerCommand('groupchat.helloWorld', function () {
		const panel = vscode.window.createWebviewPanel(
			'groupchat',
			'Group Chat',
			vscode.ViewColumn.One,
			{
				enableScripts: true,
				retainContextWhenHidden: true
			}
		);

		// And set its HTML content
		panel.webview.html = getWebviewContent();
	});
	context.subscriptions.push(disposable);
}

function getWebviewContent() {
	return `<!DOCTYPE html>
	<html>
	<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Socket.IO chat</title>
	  <style>
      body {
        margin: 0;
        padding-bottom: 3rem;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif;
      }

      #form {
        background: rgba(0, 0, 0, 0.15);
        padding: 0.25rem;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        height: 3rem;
        box-sizing: border-box;
        backdrop-filter: blur(10px);
      }
      #input {
        border: none;
        padding: 0 1rem;
        flex-grow: 1;
        border-radius: 2rem;
        margin: 0.25rem;
      }
      #input:focus {
        outline: none;
      }
      #form > button {
        background: #333;
        border: none;
        padding: 0 1rem;
        margin: 0.25rem;
        border-radius: 3px;
        outline: none;
        color: #fff;
      }

      #messages {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }
      #messages > li {
        padding: 0.5rem 1rem;
      }
      #messages > li:nth-child(odd) {
        background: #efefef;
      }
    </style>
	</head>
	<body style="background-color: white;color: black;">

	<div style="padding-left: 20%; padding-top: 10%">
      <div style="padding-bottom: 12px;color: red;font-weight: 600;" id="error-container"></div>
      <input
        style="
          width: 250px;
          height: 20px;
          border-radius: 5px;
          font-size: 15px;
          text-align: center;
        "
        id="name"
        type="text"
        name="name"
        value=""
        placeholder="Enter your name!"
      />
      <button
        style="height: 30px; font-size: 15px; background-color: #ffff43"
        type="button"
        name="button"
        onclick="setUsername()"
      >
        Let me chat!
      </button>
    </div>

	  <script src="https://cdn.socket.io/4.5.3/socket.io.min.js" integrity="sha384-WPFUvHkB1aHA5TDSZi6xtDgkF0wXJcIIxXhC6h8OT8EH3fC5PWro5pWJ1THjcfEi" crossorigin="anonymous"></script>

		<script>
			var socket = io("http://localhost:3000");
		
			function setUsername() {
				socket.emit("setUsername", {
					username: document.getElementById("name").value,
					userID: socket.id,
				});
			  }
		  
			  var user;
			  var messages;
			  var form;
			  var input;
			  socket.on("userExists", function (data) {
				document.getElementById("error-container").innerHTML = data;
			  });
		  
			  socket.on("userSet", function (data) {
				user = data.username;
				document.body.innerHTML =
				  '<ul id="messages"></ul>\
					<form id="form" action="">\
					  <input id="input" autocomplete="off" /><button>Send</button>\
					</form>';
		  
				messages = document.getElementById("messages");
				form = document.getElementById("form");
				input = document.getElementById("input");
		  
				form.addEventListener("submit", function (e) {
				  e.preventDefault();
				  if (input.value) {
					socket.emit("msg", { message: input.value, user: user });
					input.value = "";
				  }
				});
			  });
		  
			  socket.on("newmsg", function (data) {
				var item = document.createElement("li");
				item.innerHTML +=
				  "<div><b>" + data.user + "</b>: " + data.message + "</div>";
				messages.appendChild(item);
				window.scrollTo(0, document.body.scrollHeight);
			  });

		</script>
	</body>
  </html>`;
}

//fwdian5ccgcchosjfb3yod4eingv5pnexx6x4er6awxjtcyxqzxa
// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}