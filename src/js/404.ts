import '../app.css'
import App from '../App.svelte';
const app = new App({
  target: document.getElementById('404')!,
  props: {
    screenName: '404'
  }
});