<template>
	<div class="post">
		<div>
			<div><strong>Назвние:</strong> {{post.title}}</div>
			<div><strong>Описание:</strong> {{post.body}}</div>
		</div>
		<div class="post__buttons">
			<my-button @click="$router.push(`/posts/${post.id}`)">Открыть</my-button>
			<my-button @click="$emit('remove', post)">Удалить</my-button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		post: {
			type: Object,
			require: true
		}
	},
}
</script>

<style scoped>
	.post {
	 padding: 15px;
	 border: 2px solid teal;
	 display: flex;
	 align-items: center;
	 justify-content: space-between;
	}
	.post:not(:first-child) {
		margin: 15px 0 0 0;
	}
	.post__buttons {
		display: flex;
		gap: 5px;
	}
</style>