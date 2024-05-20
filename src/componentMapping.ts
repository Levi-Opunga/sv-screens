import additionalRoutes from "./additionalRoutes.js";
import { route,stringParser ,intParser  } from "typesafe-routes";


   const _404 = route("404", { 
    
    }, {});
  
   const _Articles = route("articles", { 
    
    }, {});
  
   const _DashboardCards = route("dashboard/cards", { 
    
    }, {});
  
   const _Hello = route("hello", { 
    
    }, {});
  
   const _I = route("i", { 
    
    }, {});
  
   const _IAmNestedHere = route("i/am/nested/here", { 
    
    }, {});
  
   const _ = route("", { 
    
    }, {});
  
   const _Layout = route("layout", { 
    
    }, {});
  
   const _MatchIdNextName = route("match/:id/next/:name", { 
    "id": intParser,
"name": stringParser
    }, {});
  
   const _MatchIdTest = route("match/:id/test", { 
    "id": intParser
    }, {});
  
   const _MatchId = route("match/:id", { 
    "id": stringParser
    }, {});
  
   const _MatchLayout = route("match/layout", { 
    
    }, {});
  
   const _MatchThis = route("match/this", { 
    
    }, {});
  
   const _Tools = route("tools", { 
    
    }, {});
  

export const R ={
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
    _Tools
}

 let routeObject = [["404"],["articles"],["dashboard","cards"],["hello"],["i"],["i","am","nested","here"],[],["layout"],["match",":+id","next",":name"],["match",":+id","test"],["match",":id"],["match","layout"],["match","this"],["tools"]]

  // generated by generate-tree.js
export const componentMapping = {
'404': () => import('./screens/404.svelte'),
'articles': () => import('./screens/articles.svelte'),
'dashboard/cards': () => import('./screens/dashboard/cards.svelte'),
'hello/index': () => import('./screens/hello/index.svelte'),
'i/_': () => import('./screens/i/_.svelte'),
'i/am/nested/here': () => import('./screens/i/am/nested/here.svelte'),
'index': () => import('./screens/index.svelte'),
'': () => import('./screens/index.svelte'),
'/': () => import('./screens/index.svelte'),
'layout': () => import('./screens/layout.svelte'),
'match/[+id]/next/[name]': () => import('./screens/match/[+id]/next/[name].svelte'),
'match/[+id]/test': () => import('./screens/match/[+id]/test.svelte'),
'match/[id]': () => import('./screens/match/[id].svelte'),
'match/layout': () => import('./screens/match/layout.svelte'),
'match/this': () => import('./screens/match/this.svelte'),
'tools': () => import('./screens/tools.svelte'),
...additionalRoutes
};


  export type Route = "404"|"articles"|"dashboard/cards"|"hello"|"i"|"i/am/nested/here"|""|"layout"|"match/:+id/next/:name"|"match/:+id/test"|"match/:id"|"match/layout"|"match/this"|"tools";

type ExcludeWildcard<T> = T extends `${infer _Start}*${infer _End}` ? never : T;

type ValidRoute<T> = ExcludeWildcard<T> extends string ? T : never;

export type SafeRoute = ValidRoute<Route>;
export type _Route = {
    $: string;
} & {}