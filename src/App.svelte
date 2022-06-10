<script lang="ts">
  import { onMount } from "svelte";
  import { createScene } from "./scene";
  import ARButtons from "./ARButtons.svelte";
  import TopNav from "./TopNav.svelte";
  import BottomNav from "./BottomNav.svelte";
  import Preloader from "./Preloader.svelte";
  import { preloading } from "./services/store";

  let el;
  let createdScene;
  let loading = true;
  onMount(() => {
    createScene(el).then((result) => {
      createdScene = result;
    });
  });
</script>

<TopNav />
<!-- <ARButtons scene={createdScene} /> -->
<canvas bind:this={el} />
<BottomNav />
