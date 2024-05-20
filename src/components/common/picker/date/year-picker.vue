<template>
  <ul class="year-picker" ref="yearPickerElement" @click="selectYear">
    <li
      class="year-picker__item"
      v-for="(_, index) in rangeLength"
      :key="index"
    >
      <span
        :class="getYearClassesByIndex(index)"
        :data-year="yearRange[0] + index"
      >
        {{ yearRange[0] + index }}
      </span>
    </li>
  </ul>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue';

  const props = defineProps({
    yearRange: {
      type: Array,
      required: true,
      validator(yearRange) {
        const [start, end] = yearRange;
        return start < end;
      },
    },
    selectedYear: {
      type: Number,
      required: true,
    },
  });

  const emit = defineEmits(['select:year']);

  const selectYear = (event) => {
    const dateElement = event.target.closest('.year-picker__year');
    if (!dateElement) return;

    const year = Number(dateElement.dataset.year);

    emit('select:year', year);
  };

  const rangeLength = computed(() => {
    const [start, end] = props.yearRange;
    return end - start + 1;
  });

  const getYearClassesByIndex = (index) => {
    const startYear = props.yearRange[0];

    const year = startYear + index;
    const isSelected = year === props.selectedYear;

    return {
      'year-picker__year': true,
      'year-picker__year_selected': isSelected,
    };
  };

  const yearPickerElement = ref(null);

  const scrollToSelectedYear = () => {
    const [selectedYearElement] = document.getElementsByClassName(
      'year-picker__year_selected'
    );
    if (!selectedYearElement) return;

    const targetOffset = selectedYearElement.offsetTop - 60;
    yearPickerElement.value.scrollTop = targetOffset;
  };

  onMounted(scrollToSelectedYear);
</script>

<style lang="scss" scoped>
  .year-picker {
    padding: space(2) space(6);
    overflow: hidden auto;
    @extend %hide-scrollbar;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: space(2);

    &__item {
      padding: space(2) 0;
      margin: 0 auto;
    }

    &__year {
      position: relative;
      cursor: pointer;
      @include flex($justify: center, $align: center);
      @include typography(body-large);
      border-radius: $pill;
      overflow: hidden;
      width: 72px;
      height: 36px;

      &::before {
        z-index: -1;
      }

      @include state-layer(
        var(--palette-on-surface),
        $events: true,
        $element: true
      );

      &_selected {
        @include typography(title-medium);
        background-color: var(--palette-primary);
        color: var(--palette-on-primary);

        @include state-layer(var(--palette-on-primary), $events: true);
      }
    }
  }
</style>
