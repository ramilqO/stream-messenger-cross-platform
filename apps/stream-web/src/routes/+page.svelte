<script lang="ts">
	import { authStore, login, logout } from '$lib/features/auth'

	let email = $state('demo@stream.app')
	let password = $state('password')
</script>

<main>
	<h1>Stream Messenger</h1>
	<p class="hint">Эталонный модуль auth: UI → facade → use case → event bus → projection → store</p>

	{#if $authStore.user}
		<section class="card">
			<p class="label">Вы вошли как</p>
			<p class="email">{$authStore.user.email}</p>
			<p class="meta">id: {$authStore.user.id}</p>
			<button type="button" onclick={() => logout()} disabled={$authStore.loading}>
				{$authStore.loading ? 'Выход…' : 'Выйти'}
			</button>
		</section>
	{:else}
		<form
			class="card"
			onsubmit={(event) => {
				event.preventDefault()
				login(email, password)
			}}
		>
			<label>
				Email
				<input type="email" bind:value={email} autocomplete="username" required />
			</label>

			<label>
				Пароль
				<input type="password" bind:value={password} autocomplete="current-password" required />
			</label>

			{#if $authStore.error}
				<p class="error">{$authStore.error}</p>
			{/if}

			<button type="submit" disabled={$authStore.loading}>
				{$authStore.loading ? 'Вход…' : 'Войти'}
			</button>
		</form>
	{/if}
</main>

<style>
	main {
		max-width: 24rem;
		margin: 3rem auto;
		padding: 0 1rem;
		font-family: system-ui, sans-serif;
	}

	h1 {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.hint {
		color: #666;
		font-size: 0.875rem;
		margin-bottom: 1.5rem;
	}

	.card {
		display: grid;
		gap: 0.75rem;
		padding: 1rem;
		border: 1px solid #ddd;
		border-radius: 0.5rem;
	}

	label {
		display: grid;
		gap: 0.25rem;
		font-size: 0.875rem;
	}

	input {
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
	}

	button {
		padding: 0.5rem 0.75rem;
		border: none;
		border-radius: 0.25rem;
		background: #111;
		color: #fff;
		cursor: pointer;
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.error {
		color: #b00020;
		font-size: 0.875rem;
		margin: 0;
	}

	.label {
		margin: 0;
		color: #666;
		font-size: 0.875rem;
	}

	.email {
		margin: 0;
		font-weight: 600;
	}

	.meta {
		margin: 0;
		color: #666;
		font-size: 0.875rem;
	}
</style>
