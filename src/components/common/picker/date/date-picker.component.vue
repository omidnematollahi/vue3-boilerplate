<template>
  <div class="date-picker">
    <control-menu
      :label-text="monthYearLabel"
      :button-icon="menuButtonIcon"
      @click:button="yearPickerVisibility = !yearPickerVisibility"
      @action:monthControl="moveViewDateByOneMonth"
    />
    <base-calendar
      class="date-picker__calendar"
      :today-date="todayDay"
      :day-count="monthDaysCount"
      :start-day="startDayOfMonth"
    />
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import BaseCalendar from '@/components/common/picker/date/base-calendar.vue';
  import ControlMenu from '@/components/common/picker/date/control-menu.vue';
  import CalendarInterface from '@/interfaces/calendar/calendar.interface';

  const props = defineProps({
    calendar: {
      type: CalendarInterface,
      required: true,
    },
  });

  const today = computed(() => props.calendar.todayAsObject);
  //TODO: Add default value from props
  const viewDate = ref({ ...today.value });

  const todayDay = computed(() => {
    const { year, month, day } = today.value;
    const { year: viewYear, month: viewMonth } = viewDate.value;

    if (year === viewYear && month === viewMonth) {
      return day;
    }

    return null;
  });

  const yearPickerVisibility = ref(false);
  const menuButtonIcon = computed(() =>
    yearPickerVisibility.value ? 'arrow-drop-up' : 'arrow-drop-down'
  );

  const monthYearLabel = computed(() => {
    const { month, year } = viewDate.value;

    const monthIndex = month - 1;
    const monthLabel = props.calendar.monthList[monthIndex];

    return `${monthLabel} ${year}`;
  });

  const monthDaysCount = computed(() => {
    const { year, month } = viewDate.value;
    return props.calendar.getDaysInMonth(year, month);
  });

  const startDayOfMonth = computed(() => {
    const { year, month } = viewDate.value;
    return props.calendar.getFirstDayOfMonth(year, month);
  });

  /**
   * @param {number} direction - (1) for forward and (-1) for previous month
   */
  const moveViewDateByOneMonth = (direction) => {
    const calculatedMonth = viewDate.value.month + direction;

    if (calculatedMonth > 0) {
      //NOTE: || 12 is used when last month is selected and calculateMonth % 12 is 0
      viewDate.value.month = calculatedMonth % 12 || 12;

      if (calculatedMonth > 12) {
        viewDate.value.year += 1;
      }

      return;
    }

    viewDate.value.month = 12;
    viewDate.value.year -= 1;
  };
</script>

<style lang="scss" scoped>
  .date-picker {
    width: 360px;

    &__calendar {
      padding: 0 space(3);
    }
  }
</style>
