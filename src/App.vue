<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Rapid</span>
        <span class="font-weight-light">Statistics</span>
      </v-toolbar-title>
      <v-spacer />

      <v-btn
        href="https://danielheppner.com"
        target="_blank"
      >
        <span class="mr-2">Daniel Heppner</span>
        <v-icon>open_in_new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>
