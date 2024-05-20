import '../app.css'
import App from '../App.svelte';
const app = new App({
  target: document.getElementById('dashboard_cards')!,
  props: {
    screenName: 'dashboard_cards'
  }
});