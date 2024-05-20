<script lang="ts">
  import type { RouteNode } from "typesafe-routes";
  import type { _Route } from "../componentMapping";

  export let href: _Route;
  export let name = "";
</script>

<a href={"/" + href.$}>{name}</a>
