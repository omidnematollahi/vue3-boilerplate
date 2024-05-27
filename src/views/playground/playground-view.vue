<template>
  <div class="container">
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
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const dialogVisibility = ref(false);

  const takeAction = (action) => {
    console.log(action);
  };

  const openDialog = () => {
    dialogVisibility.value = true;
  };
</script>

<style lang="scss" scoped>
  .container {
    margin: 64px auto;
    // border: 4px dashed var(--palette-primary);
    padding: 24px;
    border-radius: 24px;
    width: 600px;
  }
</style>
