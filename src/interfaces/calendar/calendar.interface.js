class CalendarInterface {
  isLeapYear() {
    throw new Error('Must implement isLeapYear method');
  }

  getDaysInMonth() {
    throw new Error('Must implement getDaysInMonthBy method');
  }

  getFirstDayOfMonth() {
    throw new Error('Must implement getFirstDayOfMonth method');
  }
}

export default CalendarInterface;
