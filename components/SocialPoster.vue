<script setup lang="ts">
import type { Payload } from "@/types";

function createPost(e: Payload) {
    console.log(e)
}

</script>

<template>
  <div>
    <UrlForm @create-post="createPost"/>
    <TwitterBox />
    </div>
</template>
