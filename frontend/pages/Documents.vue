<template>
  <div class="flex py-2 px-2">
    <USelect v-model="currentProject" :options="projects" />
    <USelect
      v-model="currentDocumentKey"
      :options="projectDocuments"
      option-attribute="name"
      value-attribute="key"
      class="ml-2"
    />
    <div class="absolute right-0 w-[7%] flex justify-around">
      <UButton
        icon="i-material-symbols-history-rounded"
        square
        color="gray"
        @click="showHistory = true"
      />
      <UModal v-model="showHistory">
        <UCard>
          <template #header>
            <h2 class="font-bold">历史记录</h2>
          </template>
          <UTable :rows="historyRows" :columns="historyColumns">
            <template #actions-data="{ row }">
              <UButton
                icon="i-material-symbols-settings-backup-restore"
                :ui="{ rounded: 'rounded-full' }"
                color="gray"
                @click="() => restore(row.index)"
              />
              <UButton
                icon="i-material-symbols-visibility-outline"
                :ui="{ rounded: 'rounded-full' }"
                color="gray"
                class="ml-2"
                @click="() => showChangeFun(row.index)"
                v-if="currentDocument?.type === 'md'"
              />
            </template>
          </UTable>
          <UModal v-model="showChange">
            <UCard class="whitespace-pre-line"> {{ showPatch }}</UCard></UModal
          >
        </UCard>
      </UModal>
      <UButton
        icon="i-material-symbols-file-save"
        square
        color="yellow"
        @click="save"
      />
    </div>
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
import { createTwoFilesPatch, applyPatch } from "diff";
import { format } from "date-fns";

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
let spreadsheet: any;
watch(currentDocumentKey, async () => {
  if (currentDocument.value?.type === "spreadsheet") {
    const { default: Spreadsheet } = await import("x-data-spreadsheet");

    spreadsheet = new Spreadsheet("#x-spreadsheet-demo").loadData(
      currentDocument.value?.info.finalData as Record<string, any>
    ); // load data
  } else {
    currentData.value = currentDocument.value?.info.finalData;
  }
});

function save() {
  const date = new Date().toString();
  if (currentDocument.value?.type === "md") {
    const patch = createTwoFilesPatch(
      "oldFile",
      "newFile",
      currentDocument.value.info.finalData,
      currentData.value
    );
    currentDocument.value.info.history.push({
      date,
      author: useAppStore().userName,
      patch,
    });
    currentDocument.value.info.finalData = currentData.value;
  } else if (currentDocument.value?.type === "spreadsheet") {
    const data = JSON.parse(JSON.stringify(spreadsheet.getData()[0]));
    console.log(data);
    currentDocument.value?.info.history.push({
      data,
      date,
      author: useAppStore().userName,
    });
    currentDocument.value.info.finalData = data;
  }
  useToast().add({ title: "Save success!" });
}

const showHistory = ref(false);
const historyRows = computed(() => {
  return currentDocument.value?.info.history.map((historyNode, index) => {
    return {
      ...historyNode,
      date: format(historyNode.date, "yyyy/MM/dd HH:mm"),
      index,
    };
  });
});
const historyColumns = [
  { key: "author", label: "Author" },
  { key: "date", label: "Time" },
  { key: "actions", label: "Action" },
];
function restore(index: number) {
  if (currentDocument.value?.type === "md") {
    let history = currentDocument.value?.info.history;
    let result = currentDocument.value.info.startData;
    history = history.slice(0, index + 1);
    //apply all patches to get final text
    for (const historyNode of history) {
      let temp = applyPatch(result, historyNode.patch);
      if (temp !== false) {
        result = temp;
      }
    }
    currentDocument.value.info.history = history;
    currentDocument.value.info.finalData = result;
    currentData.value = result;
    useToast().add({ title: "Restore!" });
  } else if (currentDocument.value?.type === "spreadsheet") {
    const currentHistoryNode = currentDocument.value.info.history[index];
    spreadsheet.loadData(currentHistoryNode.data);
    currentDocument.value.info.history =
      currentDocument.value.info.history.slice(0, index + 1);
  }
}
const showChange = ref(false);
const showChangeIndex = ref(0);
const showPatch = computed(() => {
  const history = currentDocument.value?.info.history;
  if (history) {
    if (history.length > showChangeIndex.value) {
      return Reflect.get(history[showChangeIndex.value], "patch");
    }
  }
});
function showChangeFun(index: number) {
  console.log(index);
  showChangeIndex.value = index;
  showChange.value = true;
}
</script>
