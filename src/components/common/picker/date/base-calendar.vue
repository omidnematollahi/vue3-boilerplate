<template>
  <div class="calendar" @click="selectDate">
    <span v-for="label in labelList" :key="label" class="calendar__weekday">
      {{ label }}
    </span>
    <div
      v-for="day in startDay"
      class="calendar__outside-date"
      :key="day"
    ></div>
    <div
      v-for="day in days"
      :key="day.label"
      class="calendar__date"
      :class="day.extraClasses"
      :data-day="day.label"
    >
      <span class="calendar__day">{{ day.label }}</span>
    </div>
  </div>
</template>

<script setup>
  import { computed, toValue } from 'vue';
  import CalendarInterface from '@/interfaces/calendar/calendar.interface';

  const props = defineProps({
    calendar: {
      type: CalendarInterface,
      required: true,
    },
    currentDate: {
      type: Object,
      required: true,
      validator(currentDate) {
        const { year, month, day } = currentDate;
        return year && month && day;
      },
    },
    weekDayType: {
      type: String,
      default: 'short',
      validator(weekDayType) {
        return ['short', 'full'].includes(weekDayType);
      },
    },
    selectedStartDate: {
      type: Object,
      validator(selectedStartDate) {
        const { year, month, day } = selectedStartDate;
        return year && month && day;
      },
    },
    //NOTE: Do not use, not implemented the styling yet!
    selectedEndDate: {
      type: Object,
      validator(selectedEndDate) {
        const { year, month, day } = selectedEndDate;
        return year && month && day;
      },
    },
  });

  const emit = defineEmits(['click:date']);

  const dayCount = computed(() => {
    const { year, month } = props.currentDate;
    return props.calendar.getDaysInMonth(year, month);
  });

  const startDay = computed(() => {
    const { year, month } = props.currentDate;
    return props.calendar.getDayOfWeek(year, month);
  });

  const selectDate = (event) => {
    const dateElement = event.target.closest('.calendar__date');
    if (!dateElement) return;

    const day = Number(dateElement.dataset.day);
    const { year, month } = props.currentDate;

    emit('click:date', { year, month, day });
  };

  const hasTodayInMonth = computed(() => {
    const { month, year } = props.currentDate;
    const { month: todayMonth, year: todayYear } = props.calendar.todayAsObject;

    return month === todayMonth && year === todayYear;
  });

  const isDaySelected = (dayNumber) => {
    if (!props.selectedStartDate) return false;

    const { year, month, day } = props.selectedStartDate;

    return (
      props.currentDate.year === year &&
      props.currentDate.month === month &&
      day === dayNumber
    );
  };

  const days = computed(() => {
    const dayList = Array.from({ length: dayCount.value }, (_, index) => {
      const dayNumber = index + 1;
      const { day } = props.currentDate;

      // const isHighlighted =
      //   dayNumber > selectedStartDate && dayNumber < selectedEndDate;

      return {
        label: dayNumber,
        extraClasses: {
          calendar__date_today: hasTodayInMonth.value && day === dayNumber,
          calendar__date_selected: isDaySelected(dayNumber),
          // calendar__date_highlighted: isHighlighted,
        },
      };
    });

    return dayList;
  });

  const labelList = computed(() => {
    const { weekDayList } = props.calendar;

    if (props.weekDayType === 'full') {
      return weekDayList;
    }

    return weekDayList.map((label) => label[0]);
  });
</script>

<style lang="scss" scoped>
  @use 'sass:math';

  .calendar {
    $calendar: &;
    $cell-size: 48px;
    display: grid;
    grid-template-columns: repeat(7, $cell-size);
    grid-template-rows: repeat(5, $cell-size);
    grid-auto-rows: $cell-size;
    color: var(--palette-on-surface);
    @include typography(body-large);

    &__weekday {
      @include flex($align: center, $justify: center);
    }

    &__date {
      cursor: pointer;
      padding: space(1);

      &:hover {
        #{$calendar}__day::before {
          background-color: var(--palette-on-surface-variant);
          transform: scale(1);
          opacity: 0.08;
        }
      }

      &:active {
        #{$calendar}__day::before {
          background-color: var(--palette-on-surface-variant);
          transform: scale(1);
          opacity: 0.1;
        }
      }

      &_today {
        #{$calendar}__day {
          color: var(--palette-primary);
          border-color: var(--palette-primary);
        }

        &:hover {
          #{$calendar}__day::before {
            background-color: var(--palette-primary);
          }
        }
      }

      &_selected {
        #{$calendar}__day {
          background-color: var(--palette-primary);
          color: var(--palette-on-primary);
        }

        &:hover {
          #{$calendar}__day::before {
            background-color: var(--palette-on-primary);
          }
        }
      }

      &_highlighted {
        #{$calendar}__day {
          position: relative;
          border-radius: 0;
          color: var(--palette-on-primary-container);
          background-color: var(--palette-primary-container);
        }
      }
    }

    &__day {
      @include flex($align: center, $justify: center);
      position: relative;
      user-select: none;
      width: 100%;
      height: 100%;
      border: 1px solid transparent;
      overflow: hidden;
      border-radius: $circle;

      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        transform: scale(0.5);
        border-radius: $circle;
        @include transition {
          transition-property: background-color, opacity, transform;
        }
      }
    }
  }
</style>
