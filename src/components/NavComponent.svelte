<script lang="ts">
  import Link from "../components/Link.svelte";
  import { R } from "../componentMapping";
  let hh = R._404({});
</script>

<nav class="flex justify-between items-center p-4 text-white bg-gray-800">
  <a href="/">Home</a>
  <div class="flex gap-4">
    <Link
      href={R._MatchIdTest({
        id: 66,
      })}
      name="Match">Match</Link
    >
    <a href="/articles">Articles</a>

    <a href="/about">About</a>
    <Link href={R._Articles({})} name="Hello" />
    <Link
      href={R._MatchId({
        id: "3",
      })}
      name="World"
    />
  </div>
</nav>
