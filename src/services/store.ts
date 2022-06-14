import {writable} from "svelte/store";

export const global_scene = writable({});
export const preloading = writable(true);
export const skyboxState = writable(false);
export const gridState = writable(true);
export const grassState = writable(false);