<template>
    <vue-particles
        id="tsparticles"
        url="/particles.json"
        :particlesInit="particlesInit"
    />
</template>

<script setup>
import { loadSlim } from 'tsparticles-slim'
const particlesInit = async engine => {
    await loadSlim(engine)
}
</script>