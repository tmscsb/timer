<script>
    import { getContext } from "svelte";
    import Dialog from "../components/Dialog.svelte";

    const { open } = getContext("simple-modal");

    const showSurprise = () => {
        open(Dialog);
    };
</script>

<p>
    <button class="btn btn-primary ml-2 mr-2" on:click={showSurprise}> Adjust work time</button>
</p>
