<template>
	<div class="container">
		<h1 class="post post__title">Страница с постами</h1>
		<my-input v-focus :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Поиск..."/>
		<div class="app__btns">
			<my-button class="post__add" @click="showDialog">Создать пост</my-button>
			<my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions"></my-select>
		</div>
		<my-dialog  v-model:show="dialogVisible">
			<post-form
				@create="createPost"
			/>
		</my-dialog>
		<post-list
			class="post__list"
			:posts="sortedAdnsSearchedPosts"
			@remove="removePost"
			v-if="!isPostLoading"
		/>
		<div v-else>Идет загрузка...</div>
		<div v-intersection="loadMorePosts" class="observer"></div>
	</div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
	export default {
		components: {
			PostForm, PostList,
		},
		data() {
			return {
				dialogVisible: false,
			}
		},
		methods: {
			...mapMutations({
				setPage: 'post/setPage',
				setSearchQuery: 'post/setSearchQuery',
				setSelectedSort: 'post/setSelectedSort',
			}),
			...mapActions({
				loadMorePosts: 'post/loadMorePosts',
				fetchPosts: 'post/fetchPosts',
			}),
			createPost(post) {
				this.posts.push(post);
				this.dialogVisible = false;
			},
			removePost(post) {
				this.posts = this.posts.filter(p => p.id != post.id);
			},
			showDialog() {
				this.dialogVisible = true;
			},
		},
		mounted() {
			this.fetchPosts();
		},
		computed: {
			...mapState({
				posts: state => state.post.posts,
				page: state => state.post.page,
				limit: state => state.post.limit,
				totalPages: state => state.post.totalPages,
				isPostLoading: state => state.post.isPostLoading,
				selectedSort: state => state.post.selectedSort,
				searchQuery: state => state.post.searchQuery,
				sortOptions: state => state.post.sortOptions,
			}),
			...mapGetters({
				sortedPosts: 'post/sortedPosts',
				sortedAdnsSearchedPosts: 'post/sortedAdnsSearchedPosts',
			}),
		},
		watch: {
		},
	}
</script>

<style scoped>
h2 {
	font-size: 20px;
	font-weight: 600;
}
.post__title {
	margin: 20px 0 0 0;
}
.post__add {
	
}
.post__list {
	margin: 20px 0 0 0;
}
.app__btns {
	display: flex;
	justify-content: space-between;
	margin: 10px 0 0 0;
}
.page__wrapper {
	margin: 10px 0 0 0;
	display: flex;
	justify-content: center;
	gap: 5px;
}
.page__item {
	padding: 5px;
	font-size: 16px;
	border: 1px solid black;
	cursor: pointer;
}
.page__active {
	border: 2px solid teal;
}
</style>