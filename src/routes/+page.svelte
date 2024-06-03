<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.session}
	<a class="btn" href="/logout">Odhlásit</a>
{:else}
	<a class="btn" href="/login">Přihlásit</a>
{/if}

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<p>Your session is: {JSON.stringify(data)}</p>
