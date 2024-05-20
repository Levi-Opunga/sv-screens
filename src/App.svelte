<script lang="ts">
  import { onMount } from "svelte";
  import { componentMapping } from "./componentMapping";
  import type { ModuleNamespace } from "vite/types/hot.js";
  import Index from "./screens/index.svelte";
  let screenComponent: any;
  let layoutComponent: any;
  let path = window.location.pathname.replace(/^\//, "").replace(/\/$/, "");
  let layoutPath = "";
  let possiblePaths = Object.keys(componentMapping);
  console.log("the node env is", import.meta.env.MODE);
  console.log(path);
  const PATTERNS = {
    id: /\[\w+\]/g,
    wildcard: /.*/,
  };
  if (path === "") {
    path = "index";
  }

  if (path in componentMapping) {
    path = path;
  } else if (`${path}/index` in componentMapping) {
    path = `${path}/index`;
  } else if (`${path}/_` in componentMapping) {
    path = `${path}/_`;
  } else if (possiblePaths.some((path) => path.match(PATTERNS.id))) {
    console.log("we have an id");
    let pathArray = path.split("/");
    let matchedPaths = possiblePaths
      .filter((path) => path.match(PATTERNS.id))
      .map((path) => path.split("/"))
      .map((path) => {
        return path;
      })
      .filter((path) => pathArray.length === path.length)
      .filter((path) => {
        console.log(path);
        return pathArray.every((value, index) => {
          let checkMatch = path[index].replaceAll("+", "");

          if (checkMatch.match(PATTERNS.id)) {
            console.log("matched ", value, path[index]);
            return true;
          } else {
            console.log("same ", value, path[index]);

            return value === path[index];
          }
        });
      });
    if (matchedPaths.length === 1) {
      path = matchedPaths[0].join("/");
    } else {
      path = "404";
    }
  } else if (possiblePaths.some((path) => path.match(PATTERNS.wildcard))) {
    let pathArray = path.split("/");
    let matchedPaths = possiblePaths
      .filter((path) => path.match(PATTERNS.wildcard))
      .map((path) => path.split("/"))
      .map((path) => {
        return path;
      })
      .filter((path) => pathArray.length === path.length)
      .filter((path) => {
        return pathArray.every((value, index) => {
          if (path[index].match(PATTERNS.wildcard)) {
            return true;
          } else {
            return value === path[index];
          }
        });
      });
    if (matchedPaths.length === 1) {
      path = matchedPaths[0].join("/");
    } else {
      path = "404";
    }
  } else {
    path = "404";
  }
  function findClosestLayoutPath(path: string) {
    if (path == "") {
      console.log("its empty");
      if ("layout" in componentMapping) {
        return "layout";
      } else {
        return "";
      }
    }
    let layoutDir = path.split("/").slice(0, -1).join("/");
    let fullPath = layoutDir + "/" + "layout";
    console.log("the layout path is", layoutDir);
    console.log("the full path is", fullPath);
    if (fullPath in componentMapping) {
      return fullPath;
    } else {
      return findClosestLayoutPath(layoutDir);
    }
  }
  layoutPath = findClosestLayoutPath(path);

  let importPath = path;
  console.log("the path :", path, "the layout path", layoutPath);
  onMount(async () => {
    if (import.meta.env.DEV) {
      let lPath = `./screens/${layoutPath}.svelte`;
      console.log("we are in dev");
      console.log(lPath);
      layoutComponent = await import(lPath).then((res) => res.default);

      importPath = `./screens/${path}.svelte`;
      console.log("we are in dev");
      console.log(importPath);
      screenComponent = await import(importPath).then((res) => res.default);
    } else {
      console.log("we are in prod");
      let lPath = layoutPath as keyof typeof componentMapping;
      layoutComponent = await componentMapping[lPath]()
        .then((res) => {
          console.log(res);
          return res.default;
        })
        .catch(async (err: Error) => {
          console.error("Error loading layout, redirecting to 404", err);
          return componentMapping["404"]().then((res) => res.default);
        });
      // Use the component mapping in production
      let path = importPath as keyof typeof componentMapping;
      screenComponent = await componentMapping[path]()
        .then((res) => {
          console.log(res);
          return res.default;
        })
        .catch(async (err: Error) => {
          console.error("Error loading screen, redirecting to 404", err);
          return componentMapping["404"]().then((res) => res.default);
        });
    }
  });
</script>

{#if layoutComponent && screenComponent}
  <svelte:component this={layoutComponent}>
    <svelte:component this={screenComponent} />
  </svelte:component>
{:else if screenComponent}
  <svelte:component this={screenComponent} />
{/if}
