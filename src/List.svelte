<script>
	export let options;

	function add() {
		options = options.concat({ text: '' });
	}

    function remove(i) {
        options = options.filter((_, index) => i !== index)
    }
</script>

{#each options as option, i}
	<div>
		<input
			placeholder="What needs to be done?"
			bind:value={option.text}
		>
        <button on:click={() => {remove(i)}}>Remove</button>
	</div>
{/each}

<button on:click={add}>
	Add new
</button>

<style>
    button {
        font-size: 1em;
        margin: 0;
        padding: 7px;
    }
</style>
