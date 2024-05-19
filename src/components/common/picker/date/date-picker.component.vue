<template>
  <div class="date-picker">
    <datepicker-header
      class="date-picker__header"
      :headline-text="headlineText"
      supporting-text="Select date"
    />
    <control-menu
      :label-text="monthYearLabel"
      :button-icon="menuButtonIcon"
      @click:button="yearPickerVisibility = !yearPickerVisibility"
      @action:monthControl="moveViewDateByOneMonth"
    />
    <div class="calendar-view">
      <transition
        :name="calendarTransitionName"
        @before-enter="toggleViewDateMoveBlock(true)"
        @after-leave="toggleViewDateMoveBlock(false)"
      >
        <base-calendar
          class="calendar-view__calendar"
          :current-date="viewDate"
          :calendar="calendar"
          :key="viewDate.month"
        />
      </transition>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import CalendarInterface from '@/interfaces/calendar/calendar.interface';
  import BaseCalendar from '@/components/common/picker/date/base-calendar.vue';
  import ControlMenu from '@/components/common/picker/date/control-menu.vue';
  import DatepickerHeader from '@/components/common/picker/date/header.vue';

  const props = defineProps({
    calendar: {
      type: CalendarInterface,
      required: true,
    },
  });

  //TODO: Add default value from props
  const viewDate = ref({ ...props.calendar.todayAsObject });

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
    return props.calendar.getDayOfWeek(year, month);
  });

  const calendarViewHeight = computed(() => {
    //NOTE: + 7 is for weekDays adding a row
    const calendarCellCount = monthDaysCount.value + startDayOfMonth.value + 7;

    return Math.ceil(calendarCellCount / 7) * 48;
  });

  const blockViewDateMove = ref(false);

  const toggleViewDateMoveBlock = (isBlock) => {
    blockViewDateMove.value = isBlock;
  };

  const calendarTransitionName = ref('calendar-forward');
  const updateCalendarTransitionName = (name) => {
    calendarTransitionName.value = name;
  };

  const headlineText = computed(() => {
    return 'Mon, Aug 17';
  });

  /**
   * @param {number} direction - (1) for forward and (-1) for previous month
   */
  const moveViewDateByOneMonth = (direction) => {
    if (blockViewDateMove.value) {
      return;
    }

    updateCalendarTransitionName(
      direction > 0 ? 'calendar-forward' : 'calendar-backward'
    );

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
    background-color: var(--palette-surface-container-high);
    border-radius: $radius-7x;

    &__header {
      border-bottom: 1px solid var(--palette-outline-variant);
    }
  }

  .calendar-view {
    position: relative;
    overflow: hidden;
    @include transition() {
      transition-property: height;
    }

    height: v-bind('`${calendarViewHeight}px`');
    @include flex;

    &__calendar {
      padding: 0 space(3);
    }
  }
</style>
