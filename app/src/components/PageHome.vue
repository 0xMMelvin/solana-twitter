<script setup>
import { ref } from 'vue'
import { fetchTweets } from '@/api'
import TweetForm from '@/components/TweetForm'
import TweetList from '@/components/TweetList'
import { useWorkspace } from '@/composables'

const tweets = ref([])
const loading = ref(true)
fetchTweets(useWorkspace())
  .then((fetchedTweets) => (tweets.value = fetchedTweets))
  .finally(() => (loading.value = false))

const addTweet = (tweet) => tweets.value.push(tweet)
</script>

<template>
  <TweetForm @added="addTweet"></TweetForm>
  <TweetList :tweets="tweets" :loading="loading"></TweetList>
</template>
