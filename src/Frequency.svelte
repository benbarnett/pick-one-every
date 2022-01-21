<script>
    export let seconds;
</script>

<div>
    <input
        placeholder="What needs to be done?"
        bind:value={seconds}
    >
    seconds
</div>

<style>
    input { max-width: 100px; }
</style>
