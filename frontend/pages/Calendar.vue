<template>
  <g-gantt-chart
    :chart-start="now"
    :chart-end="finalDate"
    precision="day"
    bar-start="myBeginDate"
    bar-end="myEndDate"
    class="h-[90vh]"
  >
    <g-gantt-row
      v-for="(rowList, index) in rowLists"
      :label="`My row${index}`"
      :bars="rowList"
    />
  </g-gantt-chart>
</template>

<script setup lang="ts">
const now = new Date();
const finalDate = new Date();
finalDate.setDate(finalDate.getDate() + 15);
const tasks = useAppStore().projects;

const rowLists = computed(() => {
  return tasks.map((task, index) => {
    return reactive([
      {
        myBeginDate: task.start,
        myEndDate: task.end,
        ganttBarConfig: {
          // each bar must have a nested ganttBarConfig object ...
          id: `unique-id-${index}`, // ... and a unique "id" property
          label: task.title,
          hasHandles: true,
          style: {
            background: getRandomColor(index),
            borderRadius: "20px",
            color: "black",
          },
        },
      },
    ]);
  });
});
function getRandomColor(index: number) {
  index = index + 1;
  if (index % 3 === 0) {
    return "green";
  } else if (index % 2 === 0) {
    return "orange";
  } else {
    return "pink";
  }
}
</script>
