<script lang="ts">
    import { onMount } from "svelte";
    import Input from "./Input.svelte";
    export let inputNumber: number;
    export let punchInTime: number;
    let h1: number = 0;
    let h2: number = 0;
    let m1: number = 0;
    let m2: number = 0;
    let currentInput: number = 0;

    onMount(() => {});

    function next(current: CustomEvent) {
        if (currentInput + 1 < inputNumber) {
            currentInput = currentInput + 1;
            const next = current.detail.nextElementSibling;
            next.focus();
            punchInTime = calculateTime();
            console.log(punchInTime);
        }
    }

    function prev(current: CustomEvent) {
        if (currentInput - 1 > 0) {
            currentInput = currentInput - 1;
            const prev = current.detail.previousElementSibling;
            prev.focus();
            punchInTime = calculateTime();
            console.log(punchInTime);
        }
    }

    function calculateTime(): number {
        return (h1 * 10 + h2) * 60 * 60 * 1000 + (m1 * 10 + m2) * 60 * 1000;
    }
</script>

<Input bind:value={h1} on:next={(e) => next(e)} on:prev={(e) => prev(e)} />
<Input bind:value={h2} on:next={(e) => next(e)} on:prev={(e) => prev(e)} />
:
<Input bind:value={m1} on:next={(e) => next(e)} on:prev={(e) => prev(e)} />
<Input bind:value={m2} on:next={(e) => next(e)} on:prev={(e) => prev(e)} />

<style scoped>
</style>
