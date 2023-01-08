<template>
<div class="bg-black h-12 p-3 flex justify-between">
    <ul class="flex space-x-4">
        <li class="text-gray-50 float-left"><router-link :to="{ name: 'easy' }">Easy</router-link></li>
        <li class="text-gray-50 float-left"><router-link :to="{ name: 'medium' }">Medium</router-link></li>
        <li class="text-gray-50 float-left"><router-link :to="{ name: 'hard' }">Hard</router-link></li>
    </ul>
	<ul>
		<li class="text-gray-50 float-right"><router-link to="logout">Logout</router-link></li>
	</ul>
</div>
</template>

<script>
export default {
    name: "nav-menu"
}
</script>

<style scoped>

</style>