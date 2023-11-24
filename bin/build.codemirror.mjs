import {EditorView, basicSetup} from "codemirror"
import {javascript} from "@codemirror/lang-javascript"
function enhanceTextAreas() {
	let textAreas = document.querySelectorAll(".net-splitcells-webserver-form-text-editor");
	for (var i = 0; i < textAreas.length; i++) {
	    let textArea = textAreas[i];
	    let textAreaContent = textArea.innerHTML;
	    textArea.innerHTML = "";
	    let syncTargetId = textArea.getAttribute('net-splitcells-syncs-to');
	    let syncTarget = document.getElementById(syncTargetId);
		let editor = new EditorView({
          extensions: [basicSetup, javascript()
            , EditorView.updateListener.of(function(e) {
                syncTarget.innerHTML = e.state.doc.toString();
            })
          ],
          parent: textAreas[i]
        });
        let contentInitialization = editor.state.update({changes: {from: 0, to: editor.state.doc.length, insert: textAreaContent}})
        editor.update([contentInitialization]);
		}
	}
enhanceTextAreas();
