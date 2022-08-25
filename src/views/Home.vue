<template>
  <div class="wrapper">
    <div class="chat">
      <div class="users">
        <div class=users__header>
          <i class="material-icons users__avatar">account_circle</i>
          <div class="users__input-search">
            <i class="material-icons users__input-icon">search</i>
            <input
              type="text"
              class="users__input-textfild"
              placeholder="Search or start new chat"
              v-model="searchText"
              >
          </div>
        </div>
        <div class=users__chats>
          <p class="title">Chats</p>
          <div class="users__chats-lists"
               v-for="contact in filterContact"
               :key="contact.id"
               @click="toChatMesenger(contact)"
          >
            <div class="users__chats-inner">
              <div class="users__chats-avatar"></div>
              <div class="users__chats-name">
                <p>{{ contact.name }}</p>
                <p>{{contact.chat[contact.chat.length-1].text}}</p>
              </div>
            </div>
            <div class="users__chats-date">
              <p>{{contact.chat[contact.chat.length-1].time}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <message
          :message_contact='mesengerContact'
          :headerMesengerShow='headerMesengerShow'
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Message from '@/components/Chat/Message.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    Message
  },
  data () {
    return {
      mesengerContact: {},
      mesengerContactChat: {},
      headerMesengerShow: false,
      searchText: ''
    }
  },
  computed: {
    ...mapState([
      'contacts'
    ]),
    filterContact () {
      return this.contacts.filter(item => {
        return item.name.toLowerCase().includes(this.searchText.toLowerCase())
      })
    }
  },
  methods: {
    ...mapActions([
      'GET_CONTACTS_FROM_API'
    ]),
    toChatMesenger (contact) {
      this.mesengerContact = contact
      this.mesengerContactChat = contact.chat
      this.headerMesengerShow = true
    }
  },
  mounted () {
    this.GET_CONTACTS_FROM_API()
  }
}
</script>

<style scoped lang="scss">
.wrapper{
  width: 1200px;
  height: 650px;
  margin-left: auto;
  margin-right: auto;
}
.chat{
  display: flex;
  min-height: 100%;
}

.users{
  width: 40%;
  height: 100%;
  &__header{
    padding: 15px;
    background: #F5F5F5;
    text-align: left;
    border-bottom: 1px solid grey;
  }
  &__avatar{
    font-size: 40px;
    margin-bottom: 15px;
  }
  &__input-search{
    position: relative;
  }
  &__input-textfild{
    position: relative;
    border: 1px solid #555;
    border-radius: 20px;
    width: 90%;
    padding: 9px 4px 9px 40px;
  }
  &__input-icon{
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }
  &__chats{
    text-align: left;
    padding: 15px;
    border-bottom: .5px solid grey;
    height: 514px;
    overflow-y: scroll;
    .title{
      font-size: 28px;
    }
  }
  &__chats-lists{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #F5F5F5;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover{
      background: #f2f2f2;
    }
  }
  &__chats-inner{
    display: flex;
  }
  &__chats-avatar{
    width: 50px;
    height: 50px;
    background: #757575;
    border-radius: 50%;
    margin-bottom: auto;
    margin-top: auto;
    margin-right: 10px;
  }
}
.content{
  width: 60%;
  border-left: 1px solid yellow;
  position: relative;
}
</style>
