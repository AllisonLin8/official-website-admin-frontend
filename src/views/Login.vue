<template>
    <div>
        login
    </div>
    <button @click="login">login</button>
</template>
<script setup>
const login = () => {
    localStorage.setItem('token','Ali')
}
</script>