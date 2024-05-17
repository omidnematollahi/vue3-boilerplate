<template>
  <div class="calendar" @click="selectDate">
    <span v-for="label in labelList" :key="label" class="calendar__weekday">
      {{ label }}
    </span>
    <div v-for="day in startDay" class="calendar__date" :key="day"></div>
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
  import { computed } from 'vue';

  const props = defineProps({
    dayCount: {
      type: Number,
      required: true,
      validator(dayCount) {
        return dayCount <= 31 && dayCount >= 28;
      },
    },
    startDay: {
      type: Number,
      required: true,
      validator(startDay) {
        return startDay > -1 && startDay < 7;
      },
    },
    weekDayLabels: {
      type: Array,
      default: () => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      validator(weekDayLabels) {
        return weekDayLabels.length === 7;
      },
    },
    weekDayType: {
      type: String,
      default: 'short',
      validator(weekDayType) {
        return ['short', 'full'].includes(weekDayType);
      },
    },
    todayDate: {
      type: Number,
      validator(todayDate) {
        return todayDate <= 31 && todayDate >= 1;
      },
    },
    selectedStartDate: {
      type: Number,
      validator(selectedStartDate) {
        return selectedStartDate <= 31 && selectedStartDate >= 1;
      },
    },
    selectedEndDate: {
      type: Number,
      validator(selectedEndDate) {
        return selectedEndDate <= 31 && selectedEndDate >= 1;
      },
    },
  });

  const emit = defineEmits(['click:date']);

  const selectDate = (event) => {
    const dateElement = event.target.closest('.calendar__date');
    if (!dateElement) return;

    const selectedDate = Number(dateElement.dataset.day);

    emit('click:date', selectedDate);
  };

  const days = computed(() => {
    const dayList = Array.from({ length: props.dayCount }, (_, index) => {
      const dayNumber = index + 1;
      const { selectedStartDate, selectedEndDate, todayDate } = props;

      const isSelected =
        selectedStartDate === dayNumber || selectedEndDate === dayNumber;

      const isHighlighted =
        dayNumber > selectedStartDate && dayNumber < selectedEndDate;

      return {
        label: dayNumber,
        extraClasses: {
          calendar__date_today: todayDate === dayNumber,
          calendar__date_selected: isSelected,
          calendar__date_highlighted: isHighlighted,
        },
      };
    });

    return dayList;
  });

  const labelList = computed(() => {
    if (props.weekDayType === 'full') {
      return props.weekDayLabels;
    }

    return props.weekDayLabels.map((label) => label[0]);
  });
</script>

<style lang="scss" scoped>
  @use 'sass:math';

  .calendar {
    $calendar: &;
    $cell-size: 48px;
    display: grid;
    width: 360px;
    background-color: var(--palette-surface-container-high);
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

      &_today {
        #{$calendar}__day {
          border-radius: $circle;
          color: var(--palette-primary);
          border-color: var(--palette-primary);
        }
      }

      &_selected {
        #{$calendar}__day {
          border-radius: $circle;
          background-color: var(--palette-primary);
          color: var(--palette-on-primary);
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
      user-select: none;
      width: 100%;
      height: 100%;
      border: 1px solid transparent;
      border-radius: $radius-2x;
      @include transition {
        transition-property: color, background-color, border-radius;
      }
    }
  }
</style>
