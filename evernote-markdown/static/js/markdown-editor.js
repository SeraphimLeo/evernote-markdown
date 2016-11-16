/**
 * Created by LucasLiu on 2016/11/15.
 */

define(['vendor/codemirror-5.20.2/lib/codemirror'], function (CodeMirror) {

    var _insertNewLine = function (editor) {
        var doc = editor.getDoc();
        if (doc.somethingSelected()) {

        } else {
            editor.execCommand("goLineEnd");
            doc.replaceSelection(doc.lineSeparator());
        }
        editor.focus();
    };

    var _insertParagraph = function (editor) {
        var doc = editor.getDoc();
        if (doc.somethingSelected()) {

        } else {
            doc.replaceSelection(doc.lineSeparator());
            doc.replaceSelection(doc.lineSeparator());
        }
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

    var _insertImage = function (editor) {
        var doc = editor.getDoc();
        if (doc.somethingSelected()) {
            var selectionText = doc.getSelection();
            var replacement = "![" + selectionText + "]()";
            doc.replaceSelection(replacement);
        } else {
            var cursorPos = doc.getCursor();
            doc.replaceSelection("![]()");
            doc.setCursor({line: cursorPos.line, ch: cursorPos.ch + 2});
        }
        editor.focus();
    };

    var _insertHr = function (editor) {
        var doc = editor.getDoc();
        doc.replaceSelection(doc.lineSeparator());
        doc.replaceSelection(doc.lineSeparator());
        doc.replaceSelection("------");
        doc.replaceSelection(doc.lineSeparator());
        doc.replaceSelection(doc.lineSeparator());
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

    var _insertBold = function (editor) {
        var doc = editor.getDoc();
        if (doc.somethingSelected()) {
            var selectionText = doc.getSelection();
            var replacement = "**" + selectionText + "**";
            doc.replaceSelection(replacement)
        } else {
            var cursorPos = doc.getCursor();
            doc.replaceSelection("****");
            doc.setCursor({line: cursorPos.line, ch: cursorPos.ch + 2});
        }
        editor.focus();
    };

    var _insertItalic = function (editor) {
        var doc = editor.getDoc();
        if (doc.somethingSelected()) {
            var selectionText = doc.getSelection();
            var replacment = "*" + selectionText + "*";
            doc.replaceSelection(replacment);
        } else {
            var cursorPos = doc.getCursor();
            doc.replaceSelection("**");
            doc.setCursor({line: cursorPos.line, ch: cursorPos.ch + 1});
        }
        editor.focus();
    };

    var _insertQuote = function (editor) {
        var doc = editor.getDoc();
        if (doc.somethingSelected()) {
            var selectionText = doc.getSelection();
            var replacement = ">" + selectionText;
            doc.replaceSelection(replacement);
        } else {
            var cursorPos = doc.getCursor();
            doc.replaceSelection("> ");
            doc.setCursor({line: cursorPos.line, ch: cursorPos.ch + 2});
        }
        editor.focus();
    };

    var _insertUl = function (editor) {
        var doc = editor.getDoc();
        if (doc.somethingSelected()) {
            var selectionText = doc.getSelection();
            var replacement = "* " + selectionText;
            doc.replaceSelection(replacement);
        } else {
            var cursorPos = doc.getCursor();
            doc.replaceSelection("* ");
            doc.setCursor({line: cursorPos.line, ch: cursorPos.ch + 2});
        }
        editor.focus();
    };

    var _insertOl = function (editor) {
        var doc = editor.getDoc();
        if (doc.somethingSelected()) {
            var selectionText = doc.getSelection();
            var replacement = "1. " + selectionText;
            doc.replaceSelection(replacement);
        } else {
            var cursorPos = doc.getCursor();
            doc.replaceSelection("1. ");
            doc.setCursor({line: cursorPos.line, ch: cursorPos.ch + 3});
        }
        editor.focus();
    };

    var _insertCode = function (editor) {
        var doc = editor.getDoc();
        if (doc.somethingSelected()) {
            var selectionText = doc.getSelection();
            var replacement = "```" + selectionText + "```";
            doc.replaceSelection(replacement);
        }
    };


    return {
        //插入
        insert: {
            header: _insertHeader,
            paragraph: _insertParagraph,
            newline: _insertNewLine,
            bold: _insertBold,
            italic: _insertItalic,
            quote: _insertQuote,
            link: _insertLink,
            image: _insertImage,
            hr: _insertHr,
            ul: _insertUl,
            ol: _insertOl,
            code: _insertCode
        }
    };
});