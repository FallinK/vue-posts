<template>
	<section class="navbar">
		<div class="container">
			<div class="navbar__body">
				<div class="navbar__logo" @click="$router.push('/')">Vue 3</div>
				<div class="navbar__btns">
					<my-button @click="$router.push('/posts')">Посты</my-button>
					<my-button @click="$router.push('/about')">О сайте</my-button>
					<my-button @click="$router.push('/store')">Vuex</my-button>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'navbar',
}
</script>

<style scoped>
	.navbar {
		background: lightgrey;
		box-shadow: 2px 2px 4px gray;
	}
	.navbar__body {
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.navbar__logo {
		cursor: pointer;
		color: teal;
		font-size: 18px;
	}
	.navbar__btns {
		display: flex;
		gap: 15px;
	}
</style>