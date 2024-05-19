class CalendarInterface {
  /**
   * Determine if a given year is a leap year.
   * @param {number} year - The year.
   * @returns {boolean} True if the year is a leap year, false otherwise.
   */
  isLeapYear(year) {
    throw new Error('Must implement isLeapYear method');
  }

  /**
   * Calculate the number of days in a given month and year.
   * @param {number} year - The year.
   * @param {number} month - The month (1-12).
   * @returns {number} The number of days in the month.
   * @throws {Error} If the month is not between 1 and 12.
   */
  getDaysInMonth(year, month) {
    throw new Error('Must implement getDaysInMonthBy method');
  }

  /**
   * Calculate the first day of the month for a given year and month using Zeller's Congruence.
   * @param {number} year - The year.
   * @param {number} month - The month (1-12).
   * @returns {number} The day of the week (0-6) where 0 is Sunday, 1 is Monday, etc.
   * @throws {Error} If the month is not between 1 and 12.
   */
  getFirstDayOfMonth(year, month) {
    throw new Error('Must implement getFirstDayOfMonth method');
  }

  /**
   * Get today's date in the Gregorian calendar.
   * @returns {Object} Today's date in the format '{year, month, date}'.
   */
  get todayAsObject() {
    throw new Error('Must implement getToday method');
  }

  /**
   * Get month list for gregorian calendar.
   * @returns {Array.<string>} Month list ['January', ... , 'December'].
   */
  get monthList() {
    throw new Error('Must monthList getter');
  }

  /**
   * Get week days list.
   * @returns {Array.<string>} Week days list ['Sunday', ... , 'Saturday'].
   */
  get weekDayList() {
    throw new Error('Must weekDayList getter');
  }
}

export default CalendarInterface;
