import '../app.css'
import App from '../App.svelte';
const app = new App({
  target: document.getElementById('i_am_nested_here')!,
  props: {
    screenName: 'i_am_nested_here'
  }
});