<script>
  import { options } from "./stores";

  function add() {
    options.update((o) => o.concat({ text: "" }));
  }

  function remove(i) {
    options.update((o) => o.filter((_, index) => i !== index));
  }
</script>

{#each $options as option, i}
  <div>
    <input placeholder="Option to be picked?" bind:value={option.text} />
    <button
      disabled={$options.length === 1}
      on:click={() => {
        remove(i);
      }}>Remove</button
    >
  </div>
{/each}

<button on:click={add}> Add new </button>

<style>
  button {
    font-size: 1em;
    margin: 0;
    padding: 7px;
  }
</style>
