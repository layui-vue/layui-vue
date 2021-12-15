<template>
    <div id="comment"></div>
</template>
<script>
export default {
  name: 'Utterances',
  props: {
    id: {
        type: Number,
        default: 6
    }
  },
  methods: {
    initValine () {
        const utterances = document.createElement('script');
        utterances.type = 'text/javascript';
        utterances.async = true;
        utterances.setAttribute('issue-number', this.id)
        utterances.setAttribute('theme','github-light')
        utterances.setAttribute('repo',`layui-vue/layui-vue`)
        utterances.crossorigin = 'anonymous';
        utterances.src = 'https://utteranc.es/client.js';
        window.document.getElementById('comment').appendChild(utterances);

    }
  },
  mounted: function(){
    this.initValine()
  }
}
</script>