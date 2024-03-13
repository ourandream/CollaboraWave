<template>
  <div class="flex py-2 px-2 justify-between w-[35%]">
    <USelect v-model="currentProject" :options="projects" />
    <USelect
      v-model="currentDocumentKey"
      :options="projectDocuments"
      option-attribute="name"
      value-attribute="key"
    />
    <UButton icon="i-material-symbols-history-rounded" square color="gray" />
    <UButton
      icon="i-material-symbols-file-save"
      square
      color="yellow"
      @click="save"
    />
    <UButton icon="i-material-symbols-add" square />
  </div>
  <MdEditor v-model="currentData" v-if="currentDocument?.type === 'md'" />
  <div
    id="x-spreadsheet-demo"
    v-else-if="currentDocument?.type === 'spreadsheet'"
  ></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { createTwoFilesPatch } from "diff";

const projectDocumentMap = useAppStore().documentInfos;
const projects = computed(() => {
  return Object.keys(projectDocumentMap);
});
const currentProject = ref<keyof typeof projectDocumentMap>("project1");
const projectDocuments = computed(() => {
  return projectDocumentMap[currentProject.value];
});
const currentDocumentKey = ref("1");
const currentDocument = computed(() => {
  if (currentProject.value in projectDocumentMap) {
    return projectDocumentMap[currentProject.value].find((document) => {
      return document.key === currentDocumentKey.value;
    });
  }
});

const currentData = ref();
currentData.value = currentDocument.value?.info.finalData;
watch(currentDocument, async (newDocument) => {
  if (newDocument?.type === "spreadsheet") {
    const { default: Spreadsheet } = await import("x-data-spreadsheet");
    const s = new Spreadsheet("#x-spreadsheet-demo")
      .loadData({}) // load data
      .change((data) => {
        // save data to db
      });
  } else {
    currentData.value = newDocument?.info.finalData;
  }
});
function save() {
  if (currentDocument.value?.type === "md") {
    const patch = createTwoFilesPatch(
      "oldFile",
      "newFile",
      currentDocument.value.info.finalData,
      currentData.value
    );
    currentDocument.value.info.history.push({
      date: new Date().toString(),
      author: useAppStore().userName,
      patch,
    });
    currentDocument.value.info.finalData = currentData.value;
    useToast().add({ title: "Save success!" });
  }
}
</script>
