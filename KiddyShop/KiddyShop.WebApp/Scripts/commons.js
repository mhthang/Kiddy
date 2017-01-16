'use strict';

var Commons = (function () {
    var dateToString = function (date) {
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
        var dd = date.getDate().toString();
        return (dd[1] ? dd : "0" + dd[0]) + '/' + (mm[1] ? mm : "0" + mm[0]) + '/' + yyyy; // padding
    };

    var dateToMonthString = function (date) {
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
        return (mm[1] ? mm : "0" + mm[0]) + '/' + yyyy; // padding
    };

    var dateToYearString = function (date) {
        var yyyy = date.getFullYear().toString();
        return yyyy; // padding
    };

    var getDateBeforeOneWeek = function(date)
    {
        var beforeOneWeek = new Date(date.getTime() - 60 * 60 * 24 * 7 * 1000);
        var dayBeforeOneWeek = beforeOneWeek.getDay();
        return dayBeforeOneWeek;
    }

    var getPreviousMonday = function (date) {
        var beforeOneWeek = new Date(date.getTime() - 60 * 60 * 24 * 7 * 1000);
        var day = beforeOneWeek.getDay();
        var diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1);
        var lastMonday = new Date(beforeOneWeek.setDate(diffToMonday));
        return lastMonday;
    }

    var getPreviousSunday = function (date) {
        var beforeOneWeek = new Date(date.getTime() - 60 * 60 * 24 * 7 * 1000);
        var day = beforeOneWeek.getDay();
        var diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1);
        var lastSunday = new Date(beforeOneWeek.setDate(diffToMonday + 6));
        return lastSunday;
    }

    var getNextMonday = function (date) {
        var afterOneWeek = new Date(date.getTime() + 60 * 60 * 24 * 7 * 1000);
        var day = afterOneWeek.getDay();
        var diffToMonday = afterOneWeek.getDate() - day + (day === 0 ? -6 : 1);
        var nextMonday = new Date(afterOneWeek.setDate(diffToMonday));
        return nextMonday;
    }

    var getPreviousMonth = function (date) {
        var prev = new Date(date);
        prev.setDate(0);
        prev.setDate(1);
        return prev;
    }

    var getNextMonth = function (date) {
        var next = new Date(date);
        next.setDate(1);
        next.setMonth(next.getMonth() + 1);
        return next;
    }

    var getPreviousYear = function (date) {
        var prev = new Date(date.getFullYear() - 1, 1, 1);
        return prev;
    }

    var getNextYear = function (date) {
        var next = new Date(date.getFullYear() + 1, 1, 1);
        return next;
    }

    var hasError = function (form, field, validation) {
        if (validation) {
            return (form[field].$dirty && form[field].$error[validation]) || ($scope.submitted && form[field].$error[validation]);
        }
        return (form[field].$dirty && form[field].$invalid) || ($scope.submitted && form[field].$invalid);
    };

    return {
        DateToString: dateToString,
        DateToMonthString: dateToMonthString,
        DateToYearString: dateToYearString,
        GetDateBeforeOneWeek: getDateBeforeOneWeek,
        GetPreviousMonday: getPreviousMonday,
        GetPreviousSunday: getPreviousSunday,
        GetNextMonday: getNextMonday,
        GetPreviousMonth: getPreviousMonth,
        GetNextMonth: getNextMonth,
        GetPreviousYear: getPreviousYear,
        GetNextYear: getNextYear,
        HasError: hasError,
    };
})();