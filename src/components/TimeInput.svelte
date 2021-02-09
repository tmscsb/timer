<script lang="ts">
    import { onMount, createEventDispatcher } from "svelte";

    import Input from "./Input.svelte";
    export let value: number;
    export let id: string;
    let h1: number = 0;
    let h2: number = 0;
    let m1: number = 0;
    let m2: number = 0;
    let input: Array<HTMLInputElement> = [];
    const dispatch = createEventDispatcher();

    onMount(() => {
        const y = 60 * 60 * 1000;
        const h = Math.floor(value / y);
        const m = Math.floor((value - h * y) / (y / 60));
        h1 = Math.floor(h / 10);
        h2 = h % 10;

        m1 = Math.floor(m / 10);
        m2 = m % 10;
    });

    function next(current: CustomEvent) {
        const currentIndex = input.findIndex(
            (input) => input.id == current.detail.id
        );
        const nextIndex = (+currentIndex + 1) % 4;
        const next = input[nextIndex];
        next.focus();
        next.select();
    }

    function prev(current: CustomEvent) {
        const currentIndex = input.findIndex(
            (input) => input.id == current.detail.id
        );
        const prevIndex = +currentIndex - 1 < 0 ? 3 : +currentIndex - 1;
        const prev = input[prevIndex];
        prev.focus();
        prev.select();
    }

    function calculateTime() {
        value = ((+h1 * 10 + +h2) * 60 + m1 * 10 + +m2) * 60 * 1000;
        dispatch("change", value);
    }
</script>

<div class="pl-1 pr-1">
    <Input
        id="{id}0"
        bind:input={input[0]}
        bind:value={h1}
        on:next={(e) => next(e)}
        on:prev={(e) => prev(e)}
        on:change={() => calculateTime()}
        min={0}
        max={2}
    />
</div>
<div class="pl-1 pr-1">
    <Input
        id="{id}1"
        bind:input={input[1]}
        bind:value={h2}
        on:next={(e) => next(e)}
        on:prev={(e) => prev(e)}
        on:change={() => calculateTime()}
        min={0}
        max={9}
    />
</div>
<div class="d-flex align-items-center pl-1 pr-1">:</div>
<div class="pl-1 pr-1">
    <Input
        id="{id}2"
        bind:input={input[2]}
        bind:value={m1}
        on:next={(e) => next(e)}
        on:prev={(e) => prev(e)}
        on:change={() => calculateTime()}
        min={0}
        max={5}
    />
</div>
<div class="pl-1 pr-1">
    <Input
        id="{id}3"
        bind:input={input[3]}
        bind:value={m2}
        on:next={(e) => next(e)}
        on:prev={(e) => prev(e)}
        on:change={() => calculateTime()}
        min={0}
        max={9}
    />
</div>

<style scoped>
</style>
