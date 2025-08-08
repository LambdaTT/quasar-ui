<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-vertical.svg" style="width: 200px; height: 200px">
    <InputField Label="Teste" Icon="fas fa-gear" v-model="test"></InputField>
  </q-page>
</template>

<script>
export const __PAGE_CONFIG = {
  route: ''
}

export default {
  name: 'IndexPage',

  data() {
    return {
      test: null
    }
  },
}
</script>
