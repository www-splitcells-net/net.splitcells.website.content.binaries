// SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-or-later
// SPDX-FileCopyrightText: Contributors To The `net.splitcells.*` Projects
import {EditorView, basicSetup} from "codemirror"
import {javascript} from "@codemirror/lang-javascript"
function enhanceTextAreas() {
	let textAreas = document.querySelectorAll(".net-splitcells-webserver-form-text-editor");
	for (var i = 0; i < textAreas.length; i++) {
	    let textArea = textAreas[i];
	    if (textArea.getAttribute('net-splitcells-syncing') === 'true') {
            continue;
        }
        textArea.setAttribute('net-splitcells-syncing', 'true');
	    let textAreaContent = textArea.innerHTML;
        textArea.innerHTML = ""; // This is required, so that CodeMirror has a blank div for the editor injection target.
	    let syncTargetId = textArea.getAttribute('net-splitcells-syncs-to');
	    let syncTarget = document.getElementById(syncTargetId);
		let editor = new EditorView({
          extensions: [basicSetup, javascript()
            , EditorView.updateListener.of(function(e) {
                syncTarget.innerHTML = e.state.doc.toString();
            }),

            EditorView.theme({".cm-scroller": {overflow: "hidden"}})
          ],
          parent: textAreas[i]
        });
        let contentInitialization = editor.state.update({changes: {from: 0, to: editor.state.doc.length, insert: textAreaContent}})
        editor.update([contentInitialization]);
        let textAreaObserver = new MutationObserver(function(mutations) {
            if (syncTarget.innerHTML != editor.state.doc.toString()) {
                let updateContent = editor.state.update({changes: {from: 0, to: editor.state.doc.length, insert: syncTarget.innerHTML}})
                editor.update([updateContent]);
            }
        });
        textAreaObserver.observe(syncTarget, { attributes: true, childList: true, subtree: true,characterData: true});
	}
}
enhanceTextAreas();
// This observer probably is not the most efficient thing.
var observer = new MutationObserver(
    function(mutations, observer) {
        for (const m of mutations) {
            if (m.type === "childList") {
                enhanceTextAreas();
                break;
            }
         };
    }
);
observer.observe(document, {
  subtree: true,
  childList: true
  //...
});
