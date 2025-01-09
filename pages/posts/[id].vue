<template>
    <div class="w-full min-h-screen">
        <div class="mx-auto">
            <Suspense>
                <Post />
    
                <template #fallback>
                    <div class="w-full min-h-screen flex justify-center items-center">
                        <Spinner />
                    </div>
                </template>
            </Suspense>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>