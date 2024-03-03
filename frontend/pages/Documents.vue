<template>
  <div class="flex py-2 px-2">
    <USelect v-model="currentProject" :options="projects" />
    <USelect
      v-model="currentDocumentType"
      :options="projectDocuments"
      option-attribute="name"
      value-attribute="type"
      class="ml-2"
    />
  </div>
  <MdEditor v-model="text" v-if="currentDocumentType === 'md'" />
  <div
    id="x-spreadsheet-demo"
    v-else-if="currentDocumentType === 'spreadsheet'"
  ></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
const text = ref("# Hello Editor");

const projects = ref(["项目1", "项目2"]);
const projectDocumentMap = {
  项目1: [
    { name: "概要设计", type: "md" },
    { name: "详细设计", type: "md" },
  ],
  项目2: [{ name: "文档1", type: "spreadsheet" }],
};
const currentProject = ref<keyof typeof projectDocumentMap>("项目1");
const projectDocuments = computed(() => {
  return projectDocumentMap[currentProject.value];
});
const currentDocumentType = ref("md");

watch(currentDocumentType, async (newType) => {
  if (newType === "spreadsheet") {
    const { default: Spreadsheet } = await import("x-data-spreadsheet");
    const s = new Spreadsheet("#x-spreadsheet-demo")
      .loadData({}) // load data
      .change((data) => {
        // save data to db
      });
  }
});
</script>
