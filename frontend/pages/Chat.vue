<template>
  <div>
    <vue-advanced-chat
      height="90vh"
      :current-user-id="currentUserId"
      :rooms="JSON.stringify(rooms)"
      :rooms-loaded="true"
      :messages="JSON.stringify(messages)"
      :messages-loaded="messagesLoaded"
      @send-message="sendMessage($event.detail[0])"
      @fetch-messages="fetchMessages($event.detail[0])"
    />
  </div>
</template>

<script lang="ts" setup>
const currentUserId = ref("1234");
const rooms1 = computed(() => {
  useAppStore().projects.map((task, index) => {
    return {
      roomId: index,
      roomName: task.title,
      avatar: "https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj",
      users: task.people.map((people, peopleIndex) => {
        return { _id: peopleIndex, username: people };
      }),
    };
  });
});
const rooms = ref([
  {
    roomId: "1",
    roomName: "项目1",
    avatar: "https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj",
    users: [
      { _id: "1234", username: "John Doe" },
      { _id: "4321", username: "John Snow" },
    ],
  },
]);
const messages = ref<any[]>([]);
const messagesLoaded = ref(false);

function fetchMessages({ options = { reset: false } }) {
  setTimeout(() => {
    if (options.reset) {
      messages.value = addMessages(true);
    } else {
      messages.value = [...addMessages(), ...messages.value];
      messagesLoaded.value = true;
    }
    // addNewMessage()
  });
}

function addMessages(reset: boolean = false) {
  const messages = [];

  for (let i = 0; i < 30; i++) {
    messages.push({
      _id: reset ? i : messages.length + i,
      content: `${reset ? "" : "paginated"} message ${i + 1}`,
      senderId: "4321",
      username: "John Doe",
      date: "13 November",
      timestamp: "10:20",
    });
  }
  return messages;
}

function sendMessage(message: { content: string }) {
  console.log(message);
  messages.value = [
    ...messages.value,
    {
      _id: messages.value.length,
      content: message.content,
      senderId: currentUserId,
      timestamp: new Date().toString().substring(16, 21),
      date: new Date().toDateString(),
    },
  ];
}

function addNewMessage() {
  setTimeout(() => {
    messages.value = [
      ...messages.value,
      {
        _id: messages.value.length,
        content: "NEW MESSAGE",
        senderId: "1234",
        timestamp: new Date().toString().substring(16, 21),
        date: new Date().toDateString(),
      },
    ];
  }, 2000);
}

if (process.client) {
  await import("vue-advanced-chat").then(({ register }) => {
    register();
  });
}
</script>
