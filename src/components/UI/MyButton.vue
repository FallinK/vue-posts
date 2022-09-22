<template>
	<button>
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: 'my-button'
}
</script>

<style scoped>
	button {
		font-size: 16px;
		color: teal;
		border: 1px solid teal;
		padding: 5px;
		border-radius: 5px;
		background: none;
	}
</style>