# SV-Screens

An attempt at using vite as a file based router for a project using Svelte.

## Routing

The ideal routing structure would be something like this:

```
 sv-screens
    README.md
    package.json
    vite.config.ts
    src
        App.svelte
        screens   # folder for your screens
            index.svelte    # maps to /
            nest1
                index.svelte # maps to /nest1
                [+id].svelte # maps to /nest1/:id `id:number`
            nest1
                layout.svelte # act as a layout screens for nest1
                _.svelte      # maps to /nest1
                [name].svelte # maps to /nest1/:name `name:string`
            books.svelte    # maps to /books
            layout.svelte   # acts as a layout for all screens
```

### TypeSafe Routes

TLDR : work in progress
Current Implemetation uses `typesafe-routes v 10.0.6` to generate an Object `R` that provides functions with typesafe params for the given routes.

```ts
export const R = {
  _404,
  _Articles,
  _DashboardCards,
  _Hello,
  _I,
  _IAmNestedHere,
  _,
  _Layout,
  _MatchIdNextName,
  _MatchIdTest,
  _MatchId,
  _MatchLayout,
  _MatchThis,
  _Tools,
};
```

The `Link` takes the functions provided by `R` with the params passed and generate the correct url.

```svelte
<Link href={R._Articles({})} name="Hello" /> <!-- links to /articles-->
<Link href={R._MatchId({  id: 3,})} name="World" /> <!-- file /articles/[+id].svelte links to /articles/3 -->
<Link href={R._Tools({ category: "wooden" })} name="Wooden Tools" /> <!-- file /tools/[category].svelte  links to /tools/wooden -->

```

## Future Work

- Route Prefetching
- Allow Prefetching data from the server (like `load` function in SvelteKit)
- Add support for Loader page and Error page on route basis
- Search Param validation
