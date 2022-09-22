<template>
	<form @submit.prevent>
		<h4>Создать новый пост</h4>
		<my-input
			v-focus
			v-model="post.title"
			class="form__input"
			type="text"
			placeholder="Название поста"
		/>
		<my-input
			v-model="post.body"
			class="form__input"
			type="text"
			placeholder="Описание поста"
		/>
		<my-button
			class="form__btn"
			@click="createPost"
		>
			Создать
		</my-button>
	</form>
</template>

<script>
export default {
	data() {
		return {
			post: {
				title: '',
				body: ''
			}
		};
	},
	methods: {
		createPost() {
			this.post.id = Date.now();
			this.$emit('create', this.post);
			this.post = {
				title: '',
				body: ''
			}
		}
	},
}
</script>
 
<style scoped>
	h4 {
		font-size: 20px;
		font-weight: 600;
	}
	form {
		display: flex;
		flex-direction: column;
	}
	.form__input {
		margin: 10px 0 0 0;
	}
	.form__btn {
		align-self: flex-end;
		margin: 10px 0 0 0;
	}
</style>