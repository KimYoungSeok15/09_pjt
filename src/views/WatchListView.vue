<template>
  <div>
    <h1 class="fw-bold">보고싶은 영화</h1>
    <WatchListForm/>
    <WatchListItem/>
  </div>
</template>

<script>
import WatchListForm from '@/components/WatchListForm.vue'
import WatchListItem from '@/components/WatchListItem.vue'


export default {
  name: 'WatchListView',
  components: {
    WatchListForm, 
    WatchListItem,
  }
}
</script>

<style>

</style>