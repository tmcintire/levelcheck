<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firebase from '../firebase'
import * as firebaseui from 'firebaseui'

@Component({})
export default class Login extends Vue {
  private mounted() {
    // Initialize the FirebaseUI Widget using Firebase.
    const ui = new firebaseui.auth.AuthUI(firebase.auth())
    // The start method will wait until the DOM is loaded.

    ui.start('#firebaseui-auth-container', {
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      signInSuccessUrl: '/',
      // Other config options...
    })
  }
}
</script>
