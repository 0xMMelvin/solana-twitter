<script setup>
import { ref, watchEffect } from 'vue'
import { fetchTweets, authorFilter } from '@/api'
import TweetForm from '@/components/TweetForm'
import TweetList from '@/components/TweetList'
import { useWorkspace } from '@/composables'

const tweets = ref([])
const loading = ref(true)
const workspace = useWorkspace()
const { wallet } = workspace

watchEffect(() => {
  if (!wallet.value) return
  fetchTweets(workspace, [authorFilter(wallet.value.publicKey.toBase58())])
    .then((fetchedTweets) => (tweets.value = fetchedTweets))
    .finally(() => (loading.value = false))
})

const addTweet = (tweet) => tweets.value.push(tweet)
</script>

<template>
  <div v-if="wallet" class="border-b px-8 py-4 bg-gray-50">
    {{ wallet.publicKey.toBase58() }}
  </div>
  <TweetForm @added="addTweet"></TweetForm>
  <TweetList :tweets="tweets" :loading="loading"></TweetList>
</template>
