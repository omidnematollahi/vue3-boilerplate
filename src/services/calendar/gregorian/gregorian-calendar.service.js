import CalendarInterface from '@/interfaces/calendar/calendar.interface.js';

class GregorianCalendar extends CalendarInterface {
  #todayDate;
  #monthList;
  #weekDayList;

  constructor({ monthList, weekDayList }) {
    super();

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    this.#todayDate = { year, month, day };
    this.#monthList = monthList;
    this.#weekDayList = weekDayList;
  }

  /**
   * Determine if a given year is a leap year.
   * @param {number} year - The year.
   * @returns {boolean} True if the year is a leap year, false otherwise.
   */
  isLeapYear(year) {
    if (year % 4 === 0) {
      if (year % 100 === 0) {
        return year % 400 === 0;
      }

      return true;
    }

    return false;
  }

  /**
   * Calculate the number of days in a given month and year.
   * @param {number} year - The year.
   * @param {number} month - The month (1-12).
   * @returns {number} The number of days in the month.
   * @throws {Error} If the month is not between 1 and 12.
   */
  getDaysInMonth(year, month) {
    if (month < 1 || month > 12) {
      throw new Error('Month must be between 1 and 12.');
    }

    const daysInMonthMap = [31, -1, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
      return this.isLeapYear(year) ? 29 : 28;
    }

    return daysInMonthMap[month - 1];
  }

  /**
   * Calculate the first day of the month for a given year and month using Zeller's Congruence.
   * @param {number} year - The year.
   * @param {number} month - The month (1-12).
   * @returns {number} The day of the week (0-6) where 0 is Sunday, 1 is Monday, etc.
   * @throws {Error} If the month is not between 1 and 12.
   */
  getFirstDayOfMonth(year, month) {
    if (month < 1 || month > 12) {
      throw new Error('Month must be between 1 and 12.');
    }

    if (month < 3) {
      month += 12;
      year -= 1;
    }

    const dayOfMonth = 1;
    const adjustedMonth = month;
    const yearOfCentury = year % 100;
    const zeroBasedCentury = Math.floor(year / 100);

    const dayOfWeekIndex =
      (dayOfMonth +
        Math.floor((13 * (adjustedMonth + 1)) / 5) +
        yearOfCentury +
        Math.floor(yearOfCentury / 4) +
        Math.floor(zeroBasedCentury / 4) +
        5 * zeroBasedCentury) %
      7;

    const dayOfWeek = (dayOfWeekIndex + 6) % 7;

    return dayOfWeek;
  }

  /**
   * Get today's date in the Gregorian calendar.
   * @returns {Object} Today's date in the format '{year, month, date}'.
   */
  get todayAsObject() {
    return this.#todayDate;
  }

  /**
   * Get month list for gregorian calendar.
   * @returns {Array.<string>} Month list ['January', ... , 'December'].
   */
  get monthList() {
    return this.#monthList;
  }

  /**
   * Get week days list.
   * @returns {Array.<string>} Week days list ['Sunday', ... , 'Saturday'].
   */
  get weekDayList() {
    return this.#weekDayList;
  }
}

export default GregorianCalendar;
