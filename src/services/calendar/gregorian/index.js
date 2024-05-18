import GregorianCalendar from './gregorian-calendar.service';
import {
  WEEK_DAYS_LIST,
  MONTH_LIST,
} from '@/constants/calendar/gregorian.constant.js';

const gregorianCalendar = new GregorianCalendar({ monthList: MONTH_LIST });

export default gregorianCalendar;
