import '../app.css'
import App from '../App.svelte';
const app = new App({
  target: document.getElementById('index')!,
  props: {
    screenName: 'index'
  }
});