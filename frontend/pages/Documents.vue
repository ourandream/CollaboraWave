<template>
  <div class="flex py-2 px-2">
    <USelect v-model="currentProject" :options="projects" />
    <USelect
      v-model="currentDocument"
      :options="projectDocuments"
      class="ml-2"
    />
  </div>
  <MdEditor v-model="text" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const text = ref("# Hello Editor");

const projects = ref(["项目1", "项目2"]);
const projectDocumentMap = {
  项目1: ["概要设计", "详细设计"],
  项目2: ["文档1"],
};
const currentProject = ref<keyof typeof projectDocumentMap>("项目1");
const projectDocuments = computed(() => {
  return projectDocumentMap[currentProject.value];
});
const currentDocument = ref("");
</script>
