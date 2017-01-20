var trustHtml = function ($sce) {
    return function (input) {
        if (!input) {
            return "";
        }

        return $sce.trustAsHtml(input);
    };
}

trustHtml.$inject = ["$sce"];

var dateFormat = function ($filter) {
    return function (input) {
        if (!input) {
            return "";
        }

        var resultDate;

        if (input instanceof Date) {
            resultDate = input;
        } else {
            var temp = input.replace(/\//g, "").replace("(", "").replace(")", "").replace("Date", "").replace("+0700", "");

            if (input.indexOf("Date") > -1) {
                resultDate = new Date(+temp);
            } else {
                resultDate = new Date(temp);
            }

            var utc = resultDate.getTime() + (resultDate.getTimezoneOffset() * 60000);

            // create new Date object for different city
            // using supplied offset
            resultDate = new Date(utc + (3600000 * 7));
        }

        return $filter("date")(resultDate, "dd/MM/yyyy");
    };
}

dateFormat.$inject = ["$filter"];

var dateTimeFormat = function ($filter) {
    function getCurrentDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = "0" + dd;
        }

        if (mm < 10) {
            mm = "0" + mm;
        }

        today = dd + "/" + mm + "/" + yyyy;
        return today;
    };

    return function (input) {
        if (!input) { return ""; }
        var temp = input.replace(/\//g, "").replace("(", "").replace(")", "").replace("Date", "").replace("+0700", "");

        var date;
        var resultDate;

        if (input.indexOf("Date") > -1) {
            resultDate = new Date(+temp);
            date = $filter("date")(resultDate, "dd/MM/yyyy");
            var utc = resultDate.getTime() + (resultDate.getTimezoneOffset() * 60000);

            // create new Date object for different city
            // using supplied offset
            resultDate = new Date(utc + (3600000 * 7));

            if (getCurrentDate() === date) {
                return " Hôm nay " + $filter("date")(resultDate, "HH:mm");
            } else {
                return $filter("date")(resultDate, "dd/MM/yyyy") + " " + $filter("date")(resultDate, "HH:mm ");
            }
        } else {
            date = $filter("date")(new Date(temp), "dd/MM/yyyy");

            if (getCurrentDate() === date) {
                return "Hôm nay";
            } else {
                var utc = date.getTime() + (date.getTimezoneOffset() * 60000);

                // create new Date object for different city
                // using supplied offset
                resultDate = new Date(utc + (3600000 * 7));
                return $filter("date")(resultDate, "dd/MM/yyyy");
            }
        }
    };
}

dateTimeFormat.$inject = ["$filter"];

var shortenedName = function () {
    var processName;

    processName = function (name) {
        var result = "";

        if (name) {
            var preHyphen = "";
            var hyphenIndex = name.indexOf("-");

            if (hyphenIndex > 0) {
                var postHyphenIndex = hyphenIndex;

                if (name.charAt(postHyphenIndex + 1) == " ") {
                    ++postHyphenIndex;
                }

                preHyphen = name.substring(0, postHyphenIndex + 1);
                name = name.substring(postHyphenIndex + 1, name.length);
                result = preHyphen;
            }

            var arrNames = name.split(" ");

            for (var i = 0; i < arrNames.length - 1; ++i) {
                var temp = arrNames[i];

                if (!isNaN(temp)) {
                    result += temp + " ";
                } else {
                    result += temp.charAt(0) + ".";
                }
            }

            result += arrNames[arrNames.length - 1];
        }

        return result;
    }

    return function (name) {
        var result = "";

        if (name) {
            var lstString;

            if (name.indexOf("(") > -1) {
                lstString = name.split("(");
            } else {
                lstString = [];
                lstString.push(name);
            }

            var trimedList = [];

            lstString.forEach(function (current) {
                current = current.trim();

                if (current.length > 0) {
                    trimedList.push(current);
                }
            });

            lstString = trimedList;

            lstString.forEach(function (current) {
                var temp = ""

                if (current.indexOf(")") > -1) {
                    temp = "(" + processName(current.substring(0, current.length - 1)) + ")";
                } else {
                    temp = processName(current);
                }

                result += temp + " ";
            });

            result = result.substring(0, result.length);
        }

        return result;
    }
}

shortenedName.$inject = [];

var filterByAllProperty = function () {
    function change_alias(alias) {
        var str = alias;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ  |ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ  |ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\"| |\"|\&|\#|\[|\]|~|$|_/g, "-");
        /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
        str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
        str = str.replace(/^\-+|\-+$/g, "");
        //cắt bỏ ký tự - ở đầu và cuối chuỗi
        return str;
    }

    return function (items, props) {
        var out = [];
        if (angular.isArray(items)) {
            items.forEach(function (item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    if (item[prop]) {
                        var text = props[prop].toLowerCase();
                        if (change_alias(item[prop].toString().toLowerCase()).indexOf(change_alias(text)) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }
                }
                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            out = items;
        }
        return out;
    };
};

filterByAllProperty.$inject = [];