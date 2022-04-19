<script lang="ts">
    import {onMount} from 'svelte';
    import {createScene} from "./scene";
    import ARButtons from "./ARButtons.svelte";
    import Preloader from "./Preloader.svelte"
    import {preloading} from "./services/store";

    let el;
    let createdScene;
    let loading = true
    onMount(() => {
        createScene(el).then((result) => {
            createdScene = result;
        });
    });
</script>
{#if $preloading}
    <Preloader/>
{:else}
    <ARButtons scene={createdScene}/>
{/if}

<canvas bind:this={el}></canvas>

