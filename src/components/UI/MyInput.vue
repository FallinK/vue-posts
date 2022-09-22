<template>
	<input type="text" :value="modelValue" @input="updateInput">
</template>

<script>
export default {
	name: 'my-input',
	props: {
		modelValue: [String, Number],
	},
	methods: {
		updateInput(event) {
			this.$emit('update:modelValue', event.target.value);
		}
	}
}
</script>

<style scoped>
	input {
		width: 100%;
		font-size: 16px;
		border: 1px solid teal;
		padding: 10px 15px;
	}
</style>