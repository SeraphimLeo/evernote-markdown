/**
 * Created by LucasLiu on 2016/11/15.
 */

define(['../js-lib/codemirror-5.20.2/lib/codemirror'], function (CodeMirror) {

    var _insertParagraph = function (editor) {
        var doc = editor.getDoc();
        doc.replaceSelection(doc.lineSeparator());
        doc.replaceSelection(doc.lineSeparator());
        editor.focus();
        console.log("insert a paragraph");
    };

    var _insertLink = function (editor) {
        var doc = editor.getDoc();
        if (doc.somethingSelected()) {
            var selectionText = doc.getSelection();
            var replacement = "[" + selectionText + "]()";
            doc.replaceSelection(replacement);
        } else {
            var cursorPos = doc.getCursor();
            doc.replaceSelection("[]()");
            doc.setCursor({line: cursorPos.line, ch: cursorPos.ch + 1});
        }
        editor.focus();
    };

    var _insertHeader = function (editor, headerLevel) {
        var doc = editor.getDoc();
        var headerMark = "";
        for (var i = 0; i < headerLevel; i++) {
            headerMark += "#";
        }
        headerMark += " ";

        if (doc.somethingSelected()) {
            var selectionText = doc.getSelection();
            var replacement = headerMark + " " + selectionText;
            doc.replaceSelection(replacement);
        } else {
            var cursorPos = doc.getCursor();
            doc.replaceSelection(headerMark);
            doc.setCursor({
                line: cursorPos.line,
                ch: cursorPos.ch + headerLevel + 1
            });
        }
        editor.focus();
    };

    var me = {
        insert: {
            header: _insertHeader,
            paragraph: _insertParagraph,
            link: _insertLink
        }
    };
    return me;
});