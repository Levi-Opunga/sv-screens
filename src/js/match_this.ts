import '../app.css'
import App from '../App.svelte';
const app = new App({
  target: document.getElementById('match_this')!,
  props: {
    screenName: 'match_this'
  }
});