/**
 * Created by LucasLiu on 2016/11/15.
 */

define(['../js-lib/codemirror-5.20.2/lib/codemirror'], function (CodeMirror) {

    var _insertParagraph = function (editor) {
        var doc = editor.getDoc();
        doc.replaceSelection(doc.lineSeparator());
        doc.replaceSelection(doc.lineSeparator());
        console.log("insert a paragraph");
    };


    var me = {
        insert: {
            paragraph: _insertParagraph
        }
    };
    return me;
});