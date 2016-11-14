/**
 * Created by LucasLiu on 2016/11/14.
 */

requirejs.config({
    baseUrl: "static/js",
    //By default load any module IDs from js/lib
    paths: {
        "jquery": "../js-lib/jquery.min",
        "uikit": "../js-lib/uikit-2.25.0/js/uikit.min"
        // ,"showdown": "../js-lib/showdown.min"
    }
    // , packages: [{
    //     name: "codemirror",
    //     location: "../js-lib/codemirror-5.20.2",
    //     main: "lib/codemirror"
    // }]

});

// Start the main app logic.
requirejs(['jquery',
        'uikit',
        'utils',
        '../js-lib/showdown.min',
        '../js-lib/codemirror-5.20.2/lib/codemirror',
        '../js-lib/codemirror-5.20.2/mode/markdown/markdown'],
    function ($, UI, utils, showdown, CodeMirror, md) {
        // myTextarea = $("#editor")[0];
        var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
            mode: "markdown",
            lineNumbers: true,
            //fixedGutter: false,
            viewportMargin: 100
        });

        //注册 change 事件
        CodeMirror.on(editor, "changes", function (instance, changeObject) {
            var converter = new showdown.Converter(),
                text = instance.getDoc().getValue(),
                html = converter.makeHtml(text);
            $(".markdown-output").html(html);
            console.log(utils.count(editor.getDoc()));
        });

        //设置键盘映射
        editor.setOption("extraKeys", {
            Enter: function (cm) {
                var doc = cm.getDoc();
                var cursorPos = doc.getCursor();
                var currentLine = doc.getLine(cursorPos.line);
                console.log(currentLine);

                // 标题标记
                var headerRegExp = new RegExp("^#+ ");

                // 引用标记
                var quoteRegExp = new RegExp("^> ");

                // 无序列表
                var ulRegExp = new RegExp("^\\* ");

                // 有序列表
                var olRegExp = new RegExp("^\\d+\. ");

                if (headerRegExp.test(currentLine)) {
                    // 在标题输入完毕之后 向后插入一个段落
                    doc.replaceSelection(doc.lineSeparator());
                    doc.replaceSelection(doc.lineSeparator());
                } else if (quoteRegExp.test(currentLine)) {
                    doc.replaceSelection(doc.lineSeparator());
                    doc.replaceSelection("> ");
                    console.log(doc.getCursor());
                } else if (ulRegExp.test(currentLine)) {
                    doc.replaceSelection(doc.lineSeparator());
                    doc.replaceSelection("* ");
                } else if (olRegExp.test(currentLine)) {
                    var nextOrderNumber = eval(olRegExp.exec(currentLine)[0].trim().slice(0, -1)) + 1;
                    doc.replaceSelection(doc.lineSeparator());
                    doc.replaceSelection(nextOrderNumber + ". ");
                } else {
                    //如果全部都不匹配 则直接输出换行符
                    doc.replaceSelection(doc.lineSeparator());
                }
                // 拦截 Enter 键之后向文档中输出一个换行符
                // doc.replaceSelection(doc.lineSeparator());
            },
            "Cmd-1": function (cm) {
                console.log("cmd-1");
            }
            //todo 实现其他快捷键
        });


        //创建文档
        // $(document).on("click", "#new-file", function (e) {
        //     var doc = editor.getDoc();
        //     if (!doc.isClean()) {
        //         UIkit.modal.confirm("当前文档尚未保存，确定清空么？", function () {
        //             doc.markClean();
        //         });
        //     }
        //
        // });

        //文字加粗
        $(document).on("click", "#text-bolder", function (e) {
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
        });


        //字体倾斜
        $(document).on("click", "#text-italic", function (e) {
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
        });

        //引用
        $(document).on("click", "#text-quote", function (e) {
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
        });

        //下划线
        $(document).on("click", "#text-underline", function (e) {
            var doc = editor.getDoc();
            if (doc.somethingSelected()) {
                var selectionText = doc.getSelection();
                var replacement = "_" + selectionText + "_";
                doc.replaceSelection(replacement);
            } else {
                var cursorPos = doc.getCursor();
                doc.replaceSelection("__");
                doc.setCursor({line: cursorPos.line, ch: cursorPos.ch + 1});
            }
            editor.focus();
        });

        //链接
        $(document).on("click", "#text-link", function (e) {
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
        });

        //无序列表
        $(document).on("click", "#text-ul", function (e) {
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
        });

        //有序列表
        $(document).on("click", "#text-ol", function (e) {
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
        });

        //标题
        $(document).on("click", ".text-heahder-level", function (e) {
            var doc = editor.getDoc();
            var headerLevel = $(this).data("header-level");
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
        });

        //段落
        $(document).on("click", "#text-paragraph", function (e) {
            var doc = editor.getDoc();
            var cursorPos = doc.getCursor();
            if (doc.somethingSelected()) {
            }
        });

        //代码
        $(document).on("click", "#text-code", function (e) {
            var doc = editor.getDoc();
            if (doc.somethingSelected()) {
                var selectionText = doc.getSelection();
                var replacement = "```" + selectionText + "```";
                doc.replaceSelection(replacement);
            }
        });

        //撤销
        $(document).on("click", "#text-undo", function (e) {
            editor.getDoc().undo();
        });

        //重做
        $(document).on("click", '#text-redo', function (e) {
            editor.getDoc().redo();
        })
    });