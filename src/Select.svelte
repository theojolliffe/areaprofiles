<script>
	export let options, selected, message;
</script>

{#if options[0]}
<p>
	<select bind:value={selected}>
		<option value={null}>
			{message}
		</option>
		{#each options as option}
			<option value={option.value}>
				{option.label}
			</option>
		{/each}
	</select>
</p>
{/if}