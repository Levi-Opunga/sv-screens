import '../app.css'
import App from '../App.svelte';
const app = new App({
  target: document.getElementById('hello_index')!,
  props: {
    screenName: 'hello_index'
  }
});