<template>
  <div class="chat__content" :class="classMessage">
    <div class="chat__content-msg">
      <p class="content__text">{{message_chat.text}}</p>
      <p class="content__time">{{message_chat.time}} </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Message',
  components: {
  },
  props: {
    message_chat: {
      type: Object,
      default: () => {
      }
    }
  },
  computed: {
    classMessage () {
      return {
        'chat-on': this.message_chat.type === 'own',
        'chat-other': this.message_chat.type === 'others'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.chat{
  &__content{
  }
  &__content-msg{
  }
  &-on {
    display: flex;
    justify-content: flex-end;
    text-align: end;
  }
  &-other {
    display: flex;
    justify-content: flex-start;
    text-align: start;
    .content__text{
      background: #4d4d4d;
      border-radius: 20px;
      padding: 7px;
      margin-bottom: 5px;
      color: white;
    }
  }
}
.content {
  &__text{
    background: #f2f2f2;
    border-radius: 20px;
    padding: 7px;
    margin-bottom: 5px;
  }
  &__time{
    margin-top: 5px;
  }
}
</style>
