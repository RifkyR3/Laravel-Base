<template>
    <div>
        <Navbar/>
        <Sidebar/>
        <slot />
    </div>
</template>
<script setup lang='ts'>
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'
</script>
