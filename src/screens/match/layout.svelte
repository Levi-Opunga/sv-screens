<script lang="ts">
  import Link from "../../components/Link.svelte";
  import NavComponent from "../../components/NavComponent.svelte";

  export let name = "layout";
</script>

<NavComponent />
<h1>match layout</h1>
<slot />
