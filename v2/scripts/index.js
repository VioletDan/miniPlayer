new Vue({
  el: '#app',
  data() {
    return {
      allSongList : [],
      active: 0
    }
  },
  methods: {
    loaderImage() {
      var loader = new PxLoader()
      for (var index = 1; index < 10; index++) {
        var pxImage = new PxLoaderImage('img/' + index + '.jpg')
        loader.add(pxImage)
      }
      loader.addProgressListener(function(e) {
        // console.log(e.completedCount + ' / ' + e.totalCount)
      })
      loader.addCompletionListener(() => {
        this.init()
      })
      loader.start()
    },
    init(){
      // 请求最热门推荐歌单
      API.getSongList('/playlist/hot').then(res=>{
        this.allSongList = res.tags
      }).catch(err=>{
        console.log(err)
      })
    },
    // 点击歌单种类
    tabListClick(name,title){
      console.log(name,title)
    },
    rendered(title){
      console.log(title)
    }
  },
  created() {
    this.loaderImage()
  }
})
