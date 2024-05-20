import '../app.css'
import App from '../App.svelte';
const app = new App({
  target: document.getElementById('match_[id]')!,
  props: {
    screenName: 'match_[id]'
  }
});