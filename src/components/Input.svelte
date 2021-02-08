<script lang="ts">
    import { createEventDispatcher } from "svelte";
    export let value: number;
    export let id: string;
    export let min: number;
    export let max: number;
    export let input: HTMLInputElement;
    const dispatch = createEventDispatcher();

    function onkeyup(e: KeyboardEvent) {
        console.log(e);
        if (e.key == "ArrowLeft") {
            dispatch("prev", e.target);
        } else {
            if (e.key != "Backspace") {
                dispatch("next", e.target);
            }
        }
        onchangeV();
    }

    function onchangeV() {
        if (value == null) {
            value = 0;
        }
        dispatch("change", value);
    }
</script>

<input
    {id}
    bind:this={input}
    bind:value
    on:keyup={(e) => onkeyup(e)}
    on:click={(event) => event.currentTarget.select()}
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
