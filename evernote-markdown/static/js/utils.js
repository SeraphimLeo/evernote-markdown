/**
 * Created by LucasLiu on 2016/11/14.
 */

define(function () {

    //统计行数
    var _count = function (doc) {
        var lineCount = doc.lineCount();
        return {lineCount: lineCount};
    };

    var utils = {
        count: _count
    };
    return utils;
});