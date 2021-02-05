<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    export let value: number;
    export let id: string;
    const dispatch = createEventDispatcher();

    onMount(() => {
        // console.log("itt", input);
    });

    function onkeyup(e: KeyboardEvent) {
        if (e.key == "ArrowLeft") {
            dispatch("prev", e.target);
        } else {
            if (e.key != "Backspace") {
                dispatch("next", e.target);
            }
        }
    }
</script>

<input
    {id}
    bind:value
    on:keyup={(e) => onkeyup(e)}
    on:click={(event) => event.currentTarget.select()}
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
