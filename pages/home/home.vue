<template>
  <view></view>
</template>

<script>
import { postIndex } from '@/config/api'
export default {
  data () {
    return {

    };
  },
  async onLoad (options) {
    console.log('onLoad');
    // const res = await getIndex({ custom: { auth: false } })
    try {
      // const res = await getIndex({ custom: { auth: false,catch: true } })
      const res = await postIndex({}, { custom: { auth: false, toast: false, catch: true } })
      console.log('res', res);
    } catch (error) {

    }


    console.log(1111);
  }
}
</script>

<style lang="scss" scoped>
</style>
