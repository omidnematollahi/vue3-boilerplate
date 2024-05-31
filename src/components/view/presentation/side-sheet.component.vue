<template>
  <div class="presenter">
    <h3 class="presenter__title">SideSheet Component Presentation</h3>
    <!-- SideSheet Component -->
    <div class="presenter__container">
      <base-button @click="openDialog">Open Dialog</base-button>
      <basic-dialog
        v-model="dialogVisibility"
        icon-name="favorite"
        icon-style-type="outlined"
        headline-text="Dialog with icon"
        primary-action-label="Confirm"
        secondary-action-label="Cancel"
        @action="takeAction"
      >
        <template #supporting-text>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium
          blanditiis, provident iste labore nobis, molestias cupiditate ad
          repellat est amet asperiores nihil. Nesciunt sed, ex a quaerat in nam
          inventore!
        </template>
      </basic-dialog>
      <base-button @click="openSideSheet">Open Side Sheet</base-button>
      <modal-side-sheet
        v-model="sideSheetVisibility"
        :has-back-button="true"
        :has-inset="false"
        :dismissible="true"
        :dismiss-by-escape="true"
      >
        <div class="presenter__content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            eveniet distinctio corporis animi quia mollitia, neque, vero
            repellendus, quo suscipit possimus? Corporis voluptas dolorum
            quaerat totam expedita, repellat architecto incidunt.Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Dolore eveniet
            distinctio corporis animi quia mollitia, neque, vero repellendus,
            quo suscipit possimus? Corporis voluptas dolorum quaerat totam
            expedita, repellat architecto incidunt. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Dolore eveniet distinctio corporis
            animi quia mollitia, neque, vero repellendus, quo suscipit possimus?
            Corporis voluptas dolorum quaerat totam expedita, repellat
            architecto incidunt. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Dolore eveniet distinctio corporis animi quia
            mollitia, neque, vero repellendus, quo suscipit possimus? Corporis
            voluptas dolorum quaerat totam expedita, repellat architecto
            incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dolore eveniet distinctio corporis animi quia mollitia, neque, vero
            repellendus, quo suscipit possimus? Corporis voluptas dolorum
            quaerat totam expedita, repellat architecto incidunt. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Dolore eveniet
            distinctio corporis animi quia mollitia, neque, vero repellendus,
            quo suscipit possimus? Corporis voluptas dolorum quaerat totam
            expedita, repellat architecto incidunt. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Dolore eveniet distinctio corporis
            animi quia mollitia, neque, vero repellendus, quo suscipit possimus?
            Corporis voluptas dolorum quaerat totam expedita, repellat
            architecto incidunt.Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Dolore eveniet distinctio corporis animi quia
            mollitia, neque, vero repellendus, quo suscipit possimus? Corporis
            voluptas dolorum quaerat totam expedita, repellat architecto
            incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dolore eveniet distinctio corporis animi quia mollitia, neque, vero
            repellendus, quo suscipit possimus? Corporis voluptas dolorum
            quaerat totam expedita, repellat architecto incidunt. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Dolore eveniet
            distinctio corporis animi quia mollitia, neque, vero repellendus,
            quo suscipit possimus? Corporis voluptas dolorum quaerat totam
            expedita, repellat architecto incidunt. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Dolore eveniet distinctio corporis
            animi quia mollitia, neque, vero repellendus, quo suscipit possimus?
            Corporis voluptas dolorum quaerat totam expedita, repellat
            architecto incidunt. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Dolore eveniet distinctio corporis animi quia
            mollitia, neque, vero repellendus, quo suscipit possimus? Corporis
            voluptas dolorum quaerat totam expedita, repellat architecto
            incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dolore eveniet distinctio corporis animi quia mollitia, neque, vero
            repellendus, quo suscipit possimus? Corporis voluptas dolorum
            quaerat totam expedita, repellat architecto incidunt.Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Dolore eveniet
            distinctio corporis animi quia mollitia, neque, vero repellendus,
            quo suscipit possimus? Corporis voluptas dolorum quaerat totam
            expedita, repellat architecto incidunt. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Dolore eveniet distinctio corporis
            animi quia mollitia, neque, vero repellendus, quo suscipit possimus?
            Corporis voluptas dolorum quaerat totam expedita, repellat
            architecto incidunt. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Dolore eveniet distinctio corporis animi quia
            mollitia, neque, vero repellendus, quo suscipit possimus? Corporis
            voluptas dolorum quaerat totam expedita, repellat architecto
            incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dolore eveniet distinctio corporis animi quia mollitia, neque, vero
            repellendus, quo suscipit possimus? Corporis voluptas dolorum
            quaerat totam expedita, repellat architecto incidunt. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Dolore eveniet
            distinctio corporis animi quia mollitia, neque, vero repellendus,
            quo suscipit possimus? Corporis voluptas dolorum quaerat totam
            expedita, repellat architecto incidunt.
          </p>
        </div>
      </modal-side-sheet>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const sideSheetVisibility = ref(false);
  const openSideSheet = () => {
    sideSheetVisibility.value = true;
  };

  const dialogVisibility = ref(false);
  const openDialog = () => {
    dialogVisibility.value = true;
  };

  const takeAction = () => {
    dialogVisibility.value = false;
  };
</script>

<style lang="scss" scoped>
  .presenter {
    &__title {
      @include typography(title-medium);
      color: var(--palette-on-surface);
    }

    &__container {
      @include flex();
      gap: space(4);
      margin-top: space(6);
    }

    &__content {
      overflow: hidden auto;
      height: 100%;
      padding: 0 space(6) space(6);
    }
  }
</style>
