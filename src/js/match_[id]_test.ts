import '../app.css'
import App from '../App.svelte';
const app = new App({
  target: document.getElementById('match_[id]_test')!,
  props: {
    screenName: 'match_[id]_test'
  }
});