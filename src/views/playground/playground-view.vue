<template>
  <div class="container">
    <base-button @click="openSideSheet">Open Side Sheet</base-button>
    <modal-side-sheet
      v-model="sideSheetVisibility"
      :has-back-button="true"
      :has-inset="true"
      @action:back="sideSheetVisibility = false"
    >
      <div class="content">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          voluptas alias fugit assumenda omnis suscipit. Eaque voluptatum veniam
          suscipit magni earum, magnam nesciunt, fugit ex officia molestias quas
          molestiae sit. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Expedita voluptas alias fugit assumenda omnis suscipit. Eaque
          voluptatum veniam suscipit magni earum, magnam nesciunt, fugit ex
          officia molestias quas molestiae sit. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Expedita voluptas alias fugit assumenda
          omnis suscipit. Eaque voluptatum veniam suscipit magni earum, magnam
          nesciunt, fugit ex officia molestias quas molestiae sit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Expedita voluptas alias
          fugit assumenda omnis suscipit. Eaque voluptatum veniam suscipit magni
          earum, magnam nesciunt, fugit ex officia molestias quas molestiae sit.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          voluptas alias fugit assumenda omnis suscipit. Eaque voluptatum veniam
          suscipit magni earum, magnam nesciunt, fugit ex officia molestias quas
          molestiae sit. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Expedita voluptas alias fugit assumenda omnis suscipit. Eaque
          voluptatum veniam suscipit magni earum, magnam nesciunt, fugit ex
          officia molestias quas molestiae sit. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Expedita voluptas alias fugit assumenda
          omnis suscipit. Eaque voluptatum veniam suscipit magni earum, magnam
          nesciunt, fugit ex officia molestias quas molestiae sit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Expedita voluptas alias
          fugit assumenda omnis suscipit. Eaque voluptatum veniam suscipit magni
          earum, magnam nesciunt, fugit ex officia molestias quas molestiae sit.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          voluptas alias fugit assumenda omnis suscipit. Eaque voluptatum veniam
          suscipit magni earum, magnam nesciunt, fugit ex officia molestias quas
          molestiae sit. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Expedita voluptas alias fugit assumenda omnis suscipit. Eaque
          voluptatum veniam suscipit magni earum, magnam nesciunt, fugit ex
          officia molestias quas molestiae sit. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Expedita voluptas alias fugit assumenda
          omnis suscipit. Eaque voluptatum veniam suscipit magni earum, magnam
          nesciunt, fugit ex officia molestias quas molestiae sit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Expedita voluptas alias
          fugit assumenda omnis suscipit. Eaque voluptatum veniam suscipit magni
          earum, magnam nesciunt, fugit ex officia molestias quas molestiae sit.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          voluptas alias fugit assumenda omnis suscipit. Eaque voluptatum veniam
          suscipit magni earum, magnam nesciunt, fugit ex officia molestias quas
          molestiae sit. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Expedita voluptas alias fugit assumenda omnis suscipit. Eaque
          voluptatum veniam suscipit magni earum, magnam nesciunt, fugit ex
          officia molestias quas molestiae sit. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Expedita voluptas alias fugit assumenda
          omnis suscipit. Eaque voluptatum veniam suscipit magni earum, magnam
          nesciunt, fugit ex officia molestias quas molestiae sit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Expedita voluptas alias
          fugit assumenda omnis suscipit. Eaque voluptatum veniam suscipit magni
          earum, magnam nesciunt, fugit ex officia molestias quas molestiae sit.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          voluptas alias fugit assumenda omnis suscipit. Eaque voluptatum veniam
          suscipit magni earum, magnam nesciunt, fugit ex officia molestias quas
          molestiae sit. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Expedita voluptas alias fugit assumenda omnis suscipit. Eaque
          voluptatum veniam suscipit magni earum, magnam nesciunt, fugit ex
          officia molestias quas molestiae sit. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Expedita voluptas alias fugit assumenda
          omnis suscipit. Eaque voluptatum veniam suscipit magni earum, magnam
          nesciunt, fugit ex officia molestias quas molestiae sit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Expedita voluptas alias
          fugit assumenda omnis suscipit. Eaque voluptatum veniam suscipit magni
          earum, magnam nesciunt, fugit ex officia molestias quas molestiae sit.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          voluptas alias fugit assumenda omnis suscipit. Eaque voluptatum veniam
          suscipit magni earum, magnam nesciunt, fugit ex officia molestias quas
          molestiae sit. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Expedita voluptas alias fugit assumenda omnis suscipit. Eaque
          voluptatum veniam suscipit magni earum, magnam nesciunt, fugit ex
          officia molestias quas molestiae sit. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Expedita voluptas alias fugit assumenda
          omnis suscipit. Eaque voluptatum veniam suscipit magni earum, magnam
          nesciunt, fugit ex officia molestias quas molestiae sit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Expedita voluptas alias
          fugit assumenda omnis suscipit. Eaque voluptatum veniam suscipit magni
          earum, magnam nesciunt, fugit ex officia molestias quas molestiae sit.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          voluptas alias fugit assumenda omnis suscipit. Eaque voluptatum veniam
          suscipit magni earum, magnam nesciunt, fugit ex officia molestias quas
          molestiae sit. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Expedita voluptas alias fugit assumenda omnis suscipit. Eaque
          voluptatum veniam suscipit magni earum, magnam nesciunt, fugit ex
          officia molestias quas molestiae sit. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Expedita voluptas alias fugit assumenda
          omnis suscipit. Eaque voluptatum veniam suscipit magni earum, magnam
          nesciunt, fugit ex officia molestias quas molestiae sit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Expedita voluptas alias
          fugit assumenda omnis suscipit. Eaque voluptatum veniam suscipit magni
          earum, magnam nesciunt, fugit ex officia molestias quas molestiae sit.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          voluptas alias fugit assumenda omnis suscipit. Eaque voluptatum veniam
          suscipit magni earum, magnam nesciunt, fugit ex officia molestias quas
          molestiae sit. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Expedita voluptas alias fugit assumenda omnis suscipit. Eaque
          voluptatum veniam suscipit magni earum, magnam nesciunt, fugit ex
          officia molestias quas molestiae sit. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Expedita voluptas alias fugit assumenda
          omnis suscipit. Eaque voluptatum veniam suscipit magni earum, magnam
          nesciunt, fugit ex officia molestias quas molestiae sit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Expedita voluptas alias
          fugit assumenda omnis suscipit. Eaque voluptatum veniam suscipit magni
          earum, magnam nesciunt, fugit ex officia molestias quas molestiae sit.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          voluptas alias fugit assumenda omnis suscipit. Eaque voluptatum veniam
          suscipit magni earum, magnam nesciunt, fugit ex officia molestias quas
          molestiae sit. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Expedita voluptas alias fugit assumenda omnis suscipit. Eaque
          voluptatum veniam suscipit magni earum, magnam nesciunt, fugit ex
          officia molestias quas molestiae sit. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Expedita voluptas alias fugit assumenda
          omnis suscipit. Eaque voluptatum veniam suscipit magni earum, magnam
          nesciunt, fugit ex officia molestias quas molestiae sit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Expedita voluptas alias
          fugit assumenda omnis suscipit. Eaque voluptatum veniam suscipit magni
          earum, magnam nesciunt, fugit ex officia molestias quas molestiae sit.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          voluptas alias fugit assumenda omnis suscipit. Eaque voluptatum veniam
          suscipit magni earum, magnam nesciunt, fugit ex officia molestias quas
          molestiae sit. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Expedita voluptas alias fugit assumenda omnis suscipit. Eaque
          voluptatum veniam suscipit magni earum, magnam nesciunt, fugit ex
          officia molestias quas molestiae sit. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Expedita voluptas alias fugit assumenda
          omnis suscipit. Eaque voluptatum veniam suscipit magni earum, magnam
          nesciunt, fugit ex officia molestias quas molestiae sit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Expedita voluptas alias
          fugit assumenda omnis suscipit. Eaque voluptatum veniam suscipit magni
          earum, magnam nesciunt, fugit ex officia molestias quas molestiae sit.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          voluptas alias fugit assumenda omnis suscipit. Eaque voluptatum veniam
          suscipit magni earum, magnam nesciunt, fugit ex officia molestias quas
          molestiae sit. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Expedita voluptas alias fugit assumenda omnis suscipit. Eaque
          voluptatum veniam suscipit magni earum, magnam nesciunt, fugit ex
          officia molestias quas molestiae sit.
        </p>
      </div>
    </modal-side-sheet>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const sideSheetVisibility = ref(false);

  const openSideSheet = () => {
    sideSheetVisibility.value = true;
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

  .content {
    height: 100%;
    // background: coral;
    overflow: hidden auto;
    padding: 0 space(3);
  }
</style>
