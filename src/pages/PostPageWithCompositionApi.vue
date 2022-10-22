<template>
	<div class="container">
		<h1 class="post post__title">Страница с постами</h1>
		<my-input v-focus v-model="searchQuery" placeholder="Поиск..."/>
		<div class="app__btns">
			<my-select v-model="selectedSort" :options="sortOptions"></my-select>
		</div>
		<my-dialog  v-model:show="dialogVisible">
			<post-form
			/>
		</my-dialog>
		<post-list
			class="post__list"
			:posts="sortedAndSearchedPosts"
			v-if="!isPostLoading"
		/>
		<div v-else>Идет загрузка...</div>
	</div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import {usePosts} from '@/hooks/usePosts';
import useSortedPosts from '@/hooks/useSortedPosts.js';
import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts';
	export default {
		components: {
			PostForm, PostList,
		},
		data() {
			return {
				dialogVisible: false,
				sortOptions: [
					{value: 'title', name: 'По названию'},
					{value: 'body', name: 'По содержимому'},
				],
			}
		},
		setup(props) {
			const {posts, totalPages, isPostsLoading} = usePosts(10, 1);
			const {sortedPosts, selectedSort} = useSortedPosts(posts);
			const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts);
			console.log(sortedAndSearchedPosts);
			return {
				posts,
				totalPages,
				isPostsLoading,
				sortedPosts,
				selectedSort,
				searchQuery,
				sortedAndSearchedPosts
			}
		},
		
	}
</script>

<style>
.post__title {
	margin: 20px 0 0 0;
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