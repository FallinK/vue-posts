import axios from "axios";
export const postModule = {
	state: () => ({
		posts: [],
		page: 1,
		limit: 10,
		totalPages: 0,
		isPostLoading: false,
		selectedSort: '',
		searchQuery:'',
		sortOptions: [
			{value: 'title', name: 'По названию'},
			{value: 'body', name: 'По содержимому'},
		],
	}),
	getters: {
		sortedPosts(state) {
			return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]));
		},
		sortedAdnsSearchedPosts(state, getters) {
			return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
		}
	},
	mutations: {
		setPosts (state, posts) {
			state.posts = posts;
		},
		setPage (state, page) {
			state.page = page;
		},
		setTotalPages (state, totalPages) {
			state.totalPages = totalPages;
		},
		setPostLoading (state, isPostLoading) {
			state.isPostLoading = isPostLoading;
		},
		setSelectedSort (state, selectedSort) {
			state.selectedSort = selectedSort;
		},
		setSearchQuery (state, searchQuery) {
			state.searchQuery = searchQuery;
		},
	},
	actions: {
		async fetchPosts({state, commit}) {
			try {
				commit('setPostLoading', true);
				const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
					params: {
						_page: state.page,
						_limit: state.limit,
					}
				});
				commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
				commit('setPosts', response.data);
			}
			catch (e) {
				alert('Ошибка, посты не были получены');
			} finally {
				commit('setPostLoading', false);
			}
		},
		async loadMorePosts({state, commit}) {
			try {
				const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
					params: {
						_page: state.page,
						_limit: state.limit,
					}
				});
				commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
				commit('setPosts', [...state.posts, ...response.data]);
				commit('setPage', state.page + 1);
			}
			catch (e) {
				console.log(e);
				alert('Ошибка, посты не были получены');
			}
		},
	},
	namespaced: true,
}