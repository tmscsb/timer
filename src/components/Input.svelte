<script lang="ts">
    import { createEventDispatcher } from "svelte";
    export let value: number;
    export let id: string;
    export let min: number;
    export let max: number;
    export let input: HTMLInputElement = undefined;
    const dispatch = createEventDispatcher();

    function onkeyup(e: KeyboardEvent) {
        switch (e.key) {
            case "ArrowLeft":
                dispatch("prev", e.target);
                break;
            case "Backspace":
                dispatch("next", e.target);
                break;
            default:
                dispatch("next", e.target);
        }
    }

    function onValueChange() {
        value = Math.min(max, Math.max(min, value));
        dispatch("change", value);
    }
</script>

<input
    {id}
    bind:this={input}
    bind:value
    on:keyup={(e) => onkeyup(e)}
    on:click={(event) => event.currentTarget.select()}
    on:change={() => onValueChange()}
    type="number"
    {min}
    {max}
/>

<style scoped>
    input {
        text-align: center;
        width: 50px !important;
        font-size: 30px;
        border-radius: 10px;
    }

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type="number"] {
        -moz-appearance: textfield;
    }
</style>
