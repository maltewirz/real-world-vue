<template>
  <div>
    <h1>Create Event, {{ user.name }}</h1>
    <p>This Event is created by {{ user.name }}</p>
    <p>There are {{ catLength }} categories</p>
    <p> Active todos count: {{ activeTodosCount }}</p>
    <p> Get Event by Id: {{ getEventById(1) }}</p>
  </div>
 
</template>

<script>
import { mapState, mapGetters } from 'vuex'


export default {
  computed: {
    ...mapState(['categories', 'user']),
    ...mapGetters(['catLength', 'doneTodos', 'activeTodosCount', 'getEventById'])
    }
}
</script>