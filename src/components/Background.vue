<template>
    <vue-particles
        id="tsparticles"
        :particlesInit="particlesInit"
        url="/particles.json"
    />
</template>

<script setup>
import { loadSlim } from 'tsparticles-slim'
const particlesInit = async engine => {
    await loadSlim(engine)
}
</script>