<script>
    import { onDestroy } from 'svelte';

    export let options = [];
    export let interval = 1000;

    let elapsed = 0;

    let last_time = window.performance.now();
	let frame;

    let pickedItem = newBallsPlease();

    function newBallsPlease() {
        return options[Math.floor(Math.random()*options.length)];
    }

	(function update() {
		frame = requestAnimationFrame(update);

		const time = window.performance.now();

		elapsed += Math.min(
			time - last_time,
			interval - elapsed
		);

        if (elapsed >= interval) {
            pickedItem = newBallsPlease();
            elapsed = 0;
        }

		last_time = time;
	}());

	onDestroy(() => {
		cancelAnimationFrame(frame);
	});
</script>

<article>
    <label>
        <progress value="{elapsed / interval}" class="html5"></progress>
    </label>

    <h3>{pickedItem}</h3>
</article>

<style>
    article {
        display: grid;
        height: 80vh;
        grid-template-rows: auto 100%;
        max-width: 90%;
        margin: 0 auto;
    }

    h3 {
		color: #FCF0CC;
		text-transform: uppercase;
		font-size: 10vh;
		font-weight: 100;
        align-self: center;
        overflow-wrap: break-word;
        width: 100%;
        word-break: break-all;
    }

    progress {
        appearance: none;
        width: 100%;
        /* background-color: orange; */
        border-radius: 3px;
        box-shadow: 0 2px 3px rgba(0,0,0,.5) inset;
        /* color: blue; */
    }

    progress[value]::-webkit-progress-bar {
        background-color: whiteSmoke;
        border-radius: 3px;
        box-shadow: 0 2px 3px rgba(0,0,0,.5) inset;
    }

    progress[value]::-webkit-progress-value {
    position: relative;
    
    background-size: 35px 20px, 100% 100%, 100% 100%;
    border-radius:3px;
    
    /* Let's animate this */
    animation: animate-stripes 5s linear infinite;
    }

    @keyframes animate-stripes { 100% { background-position: -100px 0; } }

    ::-webkit-progress-value {
    /* Gradient background with Stripes */
    background-image:
    -webkit-linear-gradient( 135deg,
                            transparent,
                            transparent 33%,
                            rgba(0,0,0,.1) 33%,
                            rgba(0,0,0,.1) 66%,
                            transparent 66%),
        -webkit-linear-gradient( top,
                                rgba(255, 255, 255, .25),
                                rgba(0,0,0,.2)),
        -webkit-linear-gradient( left, #D56AA0, #A64253);
    }

</style>
