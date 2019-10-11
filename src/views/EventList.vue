<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
    <template v-if="page != 1">
      <router-link 
        :to="{ name: 'event-list', query: { page: page - 1 } }" 
        rel="prev">Prev Page
      </router-link>
    </template>
    <router-link 
      v-if="hasNextPage"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      >Next page
    </router-link>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard
  },
  created() {
    this.$store.dispatch('fetchEvents', {
      perPage: 3, //# of items to display per page
      page: this.page  // page we're on
    })
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    hasNextPage() {
      return this.eventsTotal > (this.page * 3)
    },
    ...mapState(['events', 'eventsTotal'])
  }
}
</script>
