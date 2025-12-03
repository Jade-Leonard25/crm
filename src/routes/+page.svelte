<script lang='ts'>
	const content = [
		{name:'hero',content:'Welcome to'}
	]
</script>



<div class="bg-linear-to-br from-slate-200 to-zinc-200 flex flex-col min-h-screen">
	<div class="relative items-center text-center py-10 px-14">
			<div>
				{#each content as item}
					<p>{item.content}</p>
				{/each}
			</div>
	</div>
</div>