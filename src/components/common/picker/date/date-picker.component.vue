<template>
  <div class="date-picker">
    <datepicker-header
      class="date-picker__header"
      :headline-text="headlineText"
      :supporting-text="supportingText"
    />
    <control-menu
      :label-text="monthYearLabel"
      :button-icon="menuButtonIcon"
      :show-month-controls="!yearPickerVisibility"
      @click:button="yearPickerVisibility = !yearPickerVisibility"
      @action:monthControl="moveViewDateByOneMonth"
    />
    <div class="date-picker__main">
      <transition name="year-picker">
        <year-picker
          v-if="yearPickerVisibility"
          class="date-picker__year-picker"
          :year-range="yearRange"
          :selected-year="viewDate.year"
          @select:year="selectYear"
        />
      </transition>
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
            :selected-start-date="modelValue"
            @click:date="selectDate"
          />
        </transition>
      </div>
    </div>
    <slot name="actions">
      <div class="date-picker__actions">
        <base-button variant="text" @click="$emit('action:cancel')">
          {{ cancelLabel }}
        </base-button>
        <base-button variant="text" @click="pickDate">
          {{ okLabel }}
        </base-button>
      </div>
    </slot>
  </div>
</template>

<script setup>
  import { computed, ref, toValue } from 'vue';
  import CalendarInterface from '@/interfaces/calendar/calendar.interface';
  import BaseCalendar from '@/components/common/picker/date/base-calendar.vue';
  import ControlMenu from '@/components/common/picker/date/control-menu.vue';
  import DatepickerHeader from '@/components/common/picker/date/header.vue';
  import YearPicker from '@/components/common/picker/date/year-picker.vue';

  const props = defineProps({
    calendar: {
      type: CalendarInterface,
      required: true,
    },
    yearRange: {
      type: Array,
      default: [1900, 2100],
    },
    placeholder: {
      type: String,
      default: 'Selected date',
    },
    supportingText: {
      type: String,
      default: 'Select date',
    },
    okLabel: {
      type: String,
      default: 'OK',
    },
    cancelLabel: {
      type: String,
      default: 'Cancel',
    },
  });

  const emit = defineEmits([
    'action:cancel',
    'action:ok',
    'change:selectedDate',
  ]);

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

  const modelValue = defineModel({
    type: Object,
    validator(date) {
      const { year, month, day } = date;
      return year && month && day;
    },
  });

  const selectDate = (dateObject) => {
    modelValue.value = dateObject;
    emit('change:selectedDate', modelValue.value);
  };

  const headlineText = computed(() => {
    if (!modelValue.value) return props.placeholder;

    const { year, month, day } = modelValue.value;

    const weekDayIndex = props.calendar.getDayOfWeek(year, month, day);
    const weekDay = props.calendar.weekDayList[weekDayIndex];

    const monthLabelShort = props.calendar.monthList[month - 1].slice(0, 3);

    return `${weekDay}, ${monthLabelShort} ${day}`;
  });

  const selectYear = (year) => {
    viewDate.value.year = year;
    yearPickerVisibility.value = false;
  };

  const pickDate = () => {
    //NOTE: for now only support Object format but here is where we convert formats later
    emit('action:pickDate', modelValue);
  };

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
    $background: var(--palette-surface-container-high);
    width: 360px;
    background-color: $background;
    border-radius: $radius-7x;

    &__header {
      border-bottom: 1px solid var(--palette-outline-variant);
    }

    &__main {
      position: relative;
      overflow: hidden;
      @include transition() {
        transition-property: height;
      }

      height: v-bind('`${calendarViewHeight}px`');
    }

    &__year-picker {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: $background;
      z-index: 1;
      border-bottom: 1px solid var(--palette-outline-variant);
    }

    &__actions {
      @include flex($align: center, $justify: flex-end);
      gap: space(2);
      padding: space(2) space(3) space(3);
      --base-button-min-width: auto;
    }
  }

  .calendar-view {
    @include flex;

    &__calendar {
      padding: 0 space(3);
    }
  }
</style>
