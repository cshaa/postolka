<script lang="ts">
	import type { ActionData } from './$types';

	import BxsUser from '~icons/bxs/user';
	import BxsKey from '~icons/bxs/key';
	import SubwayError from '~icons/subway/error';

	export let form: ActionData;
</script>

<main class="flex flex-col items-center p-16">
	<div class="card card-bordered bg-base-300">
		<form method="post" class="card-body flex flex-col gap-2 max-w-screen-md">
			<h1 class="size-8 font-semibold">Přihlášení</h1>
			{#if form?.error}
				<div class="alert alert-error flex items-center">
					<SubwayError class="w-5 h-5" />
					<span class="pt-1">{form.error}</span>
				</div>
			{/if}
			<label class="input input-bordered flex items-center gap-2">
				<BxsUser class="w-5 h-5 opacity-70" />
				<input
					name="username"
					type="text"
					class="grow"
					placeholder="Uživatelské jméno do e-Quip"
					value={form?.username}
				/>
			</label>
			<label class="input input-bordered flex items-center gap-2">
				<BxsKey class="w-5 h-5 opacity-70" />
				<input name="password" type="password" class="grow" placeholder="Heslo do e-Quip" />
			</label>
			<button class="btn btn-primary">Přihlásit</button>
		</form>
	</div>
</main>
