<template>
  <div class="message">
    <div class="message__header">
      <template v-if="headerMesengerShow">
        <div class="message__avatar"></div>
        <div class="message__name">
          <p>{{ message_contact.name }}</p>
        </div>
      </template>
    </div>
    <div
      class="message__field"
    >
     <message-content
       v-for="item in message_contact.chat"
       :key="item.id"
       :message_chat="item"
     />
    </div>
    <div class="message__send">
      <div class="message__input">
        <input
          type="text"
          placeholder="Type your message"
          v-model="textMesagge"
          class="message__input-textfild"
          @keypress.enter="sendMessage"
        >
        <i class="material-icons message__input-icon" @click="sendMessage">send</i>
      </div>
    </div>
  </div>
</template>

<script>
import MessageContent from './MessageContent'
import { mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'Message',
  components: {
    MessageContent
  },
  data () {
    return {
      textMesagge: ''
    }
  },
  props: {
    message_contact: {
      type: Object,
      default: () => {
      }
    },
    headerMesengerShow: {
      type: Boolean,
      default: () => {
      }
    }
  },
  computed: {
    classMessage () {
      return {
        'message-on': this.message_chat.type === 'own',
        'message-other': this.message_chat.type === 'other'
      }
    }
  },
  methods: {
    ...mapActions([
      'SET_MESSAGE_TO_CHAT'
    ]),
    sendMessage () {
      const user = { ...this.message_contact }
      const chatMsg = {
        id: this.message_contact.chat.length + 1,
        time: new Date().toLocaleTimeString('en-GB', {
          hour12: false,
          hour: 'numeric',
          minute: 'numeric'
        }),
        text: this.textMesagge,
        type: 'own'
      }
      user.chat.push(chatMsg)
      const userID = user.id
      this.SET_MESSAGE_TO_CHAT({ userID, user })
      this.textMesagge = ''
      setTimeout(() => {
        return axios.get('https://api.chucknorris.io/jokes/random')
          .then((response) => {
            const chackNorrisMsg = {
              id: this.message_contact.chat.length + 1,
              time: new Date().toLocaleTimeString('en-GB', {
                hour12: false,
                hour: 'numeric',
                minute: 'numeric'
              }),
              text: response.data.value,
              type: 'others'
            }
            user.chat.push(chackNorrisMsg)
            const userID = user.id
            this.SET_MESSAGE_TO_CHAT({ userID, user })
          })
      }, 6000)
    }
  }
}
</script>

<style scoped lang="scss">
.message{
  height: 100%;
  &__header{
    padding: 15px;
    background: #F5F5F5;
    display: flex;
    align-items: center;
    height: 50px;
  }
  &__avatar{
    width: 50px;
    height: 50px;
    background: #757575;
    border-radius: 50%;
    margin-bottom: auto;
    margin-top: auto;
    margin-right: 10px;
  }
  &__send{
    position: absolute;
    //width: 100%;
    padding: 15px;
    bottom: 0;
    left: 0;
    right: 0;
    background: #F5F5F5;
  }
  &__input{
    position: relative;
  }
  &__input-icon{
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    cursor: pointer;
  }
  &__input-textfild{
    position: relative;
    border: 1px solid #555;
    border-radius: 20px;
    width: 90%;
    padding: 9px 4px 9px 40px;
    height: 30px;
  }
  &__field{
    overflow-y: scroll;
    height: 80%;
  }
}
</style>
