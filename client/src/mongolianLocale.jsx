import moment from "moment";

const mongolianLocale = {
  months:
    "1-р сар_2-р сар_3-р сар_4-р сар_5-р сар_6-р сар_7-р сар_8-р сар_9-р сар_10-р сар_11-р сар_12-р сар".split(
      "_"
    ),
  monthsShort:
    "1-р сар_2-р сар_3-р сар_4-р сар_5-р сар_6-р сар_7-р сар_8-р сар_9-р сар_10-р сар_11-р сар_12-р сар".split(
      "_"
    ),
  weekdays: "Ням_Даваа_Мягмар_Лхагва_Пүрэв_Баасан_Бямба".split("_"),
  weekdaysShort: "Ням_Даваа_Мягмар_Лхагва_Пүрэв_Баасан_Бямба".split("_"),
  weekdaysMin: "Ня_Да_Мя_Лх_Пү_Ба_Бя".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "YYYY-MM-DD",
    LL: "YYYY оны MMMMын D",
    LLL: "YYYY оны MMMMын D HH:mm",
    LLLL: "dddd, YYYY оны MMMMын D HH:mm",
  },
  meridiemParse: /Нүүр/i,
  isPM: function (input) {
    return input.toLowerCase() === "нүүр";
  },
  meridiem: function (hour, minute, isLower) {
    if (hour < 12) {
      return "Өглөө";
    } else {
      return "Үдээ";
    }
  },
  calendar: {
    sameDay: "[Өнөө] LT",
    nextDay: "[Маргааш] LT",
    nextWeek: "[Ирэх] dddd LT",
    lastDay: "[Өчигдөр] LT",
    lastWeek: "[Өнгөрсөн] dddd LT",
    sameElse: "L",
  },
  relativeTime: {
    future: "%s-д",
    past: "%s өмнө",
    s: "хэдэн секунд",
    m: "минут",
    mm: "%d минут",
    h: "цаг",
    hh: "%d цаг",
    d: "өдөр",
    dd: "%d өдөр",
    M: "сар",
    MM: "%d сар",
    y: "жил",
    yy: "%d жил",
  },
  dayOfMonthOrdinalParse: /\d{1,2}-(рд|рд)/,
  ordinal: function (number, period) {
    switch (period) {
      case "d":
      case "D":
      case "DDD":
        return number + "-рд";
      default:
        return number;
    }
  },
  week: {
    dow: 1, // Ням дээр эхлэнэ
    doy: 7, // 7-р сар дээр эхлэнэ
  },
};

moment.locale("mn", mongolianLocale);

export default moment;
