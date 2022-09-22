<template>
		<div v-if="posts.length > 0">
			<h3>Посты</h3>
			<transition-group name="post-list">	
				<post-item 
					v-for="post in posts"
					:post="post"
					:key="post.id"
					@remove="$emit('remove', post)"
				/>
			</transition-group>
		</div>
		<div v-else>
			<h3>Постов нет</h3>
		</div>
</template>

<script>
import PostItem from './PostItem.vue';
export default {
  components: { PostItem },
	props: {
		posts: {
			type: Array,
			required: true
		}
	}
}
</script>
<style scoped>
	.post-list-item {
		display: inline-block;
		margin: 0 10px 0 0;
	}
	.post-list-enter-active,
	.post-list-leave-active {
		transition: all 0.3s ease;
	}
	.post-list-enter-from,
	.post-list-leave-to {
		opacity: 0;
		transform: translateX(130px);
	}
	.post-list-move {
		transition: transform 0.5s ease;
	}
</style>