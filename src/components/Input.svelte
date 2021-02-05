<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    export let value: number;
    const dispatch = createEventDispatcher();

    onMount(() => {
        // console.log("itt", input);
    });

    function onkeyup(e: KeyboardEvent) {
        console.log(e.key);
        if (e.key == "Backspace") {
            dispatch("prev", e.target);
        } else {
            dispatch("next", e.target);
        }
    }
</script>

<input
    bind:value
    on:keyup={(e) => onkeyup(e)}
    class="small-input"
    type="text"
    maxlength="1"
/>

<style scoped>
    .small-input {
        width: 30px !important;
        font-size: 1em;
    }
</style>
