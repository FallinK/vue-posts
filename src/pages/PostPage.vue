<template>
	<div class="container">
		<h1 class="post post__title">Страница с постами</h1>
		<my-input v-focus v-model="searchQuery" placeholder="Поиск..."/>
		<div class="app__btns">
			<my-button class="post__add" @click="showDialog">Создать пост</my-button>
			<my-select v-model="selectedSort" :options="sortOptions"></my-select>
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
		<!-- <div class="page__wrapper">
			<div
				class="page__item"
				v-for="pageNumber in totalPages"
				:key="pageNumber"
				:class="{
					'page__active': page === pageNumber
				}"
				@click="changePage(pageNumber)"
			>
				{{pageNumber}}
			</div>
		</div> -->
	</div>
</template>

<script>
import axios from 'axios';
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
	export default {
		components: {
			PostForm, PostList,
		},
		data() {
			return {
				posts: [],
				page: 1,
				limit: 10,
				totalPages: 0,
				dialogVisible: false,
				isPostLoading: false,
				selectedSort: '',
				searchQuery:'',
				sortOptions: [
					{value: 'title', name: 'По названию'},
					{value: 'body', name: 'По содержимому'},
				],
			}
		},
		methods: {
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
			async fetchPosts() {
				try {
					this.isPostLoading = true;
					const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
						params: {
							_page: this.page,
							_limit: this.limit,
						}
					});
					this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
					this.posts = response.data;
				}
				catch (e) {
					alert('Ошибка, посты не были получены');
				} finally {
					this.isPostLoading = false;
				}
			},
			async loadMorePosts() {
				try {
					const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
						params: {
							_page: this.page,
							_limit: this.limit,
						}
					});
					this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
					this.posts = [...this.posts, ...response.data];
					this.page += 1;
				}
				catch (e) {
					alert('Ошибка, посты не были получены');
				}
			},
			// changePage(pageNumber) {
			// 	this.page = pageNumber;
			// },
		},
		mounted() {
			this.fetchPosts();
			// const options = {
			// 	rootMargin: '0px',
			// 	threshold: 1.0
			// }
			// const callback = (entries, observer) => {
			// 		if(entries[0].isIntersecting === true && this.page < this.totalPages) {
			// 			this.loadMorePosts();
			// 		}
			// };
			// const observer = new IntersectionObserver(callback, options);
			// observer.observe(this.$refs.observer);
		},
		computed: {
			sortedPosts() {
				return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]));
			},
			sortedAdnsSearchedPosts() {
				return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
			}
		},
		watch: {
			// page() {
			// 	this.fetchPosts();
			// },
		},
	}
</script>

<style>
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