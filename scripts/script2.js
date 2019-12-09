new Vue({
  el: '#app',
  data() {
    return {
      currentListIndex: 0,
      coverImage: '', // 动画类名
      musicList: [
        {
          index: 0,
          name: 'Mekanın Sahibi',
          artist: 'Norm Ender',
          cover: 'img/1.jpg',
          source: 'mp3/1.mp3',
          url: 'https://www.youtube.com/watch?v=z3wAjJXbYzA',
          favorited: false
        },
        {
          index: 1,
          name: 'Everybody Knows',
          artist: 'Leonard Cohen',
          cover: 'img/2.jpg',
          source: 'mp3/2.mp3',
          url: 'https://www.youtube.com/watch?v=Lin-a2lTelg',
          favorited: true
        },
        {
          index: 2,
          name: 'Extreme Ways',
          artist: 'Moby',
          cover: 'img/3.jpg',
          source: 'mp3/3.mp3',
          url: 'https://www.youtube.com/watch?v=ICjyAe9S54c',
          favorited: false
        },
        {
          index: 3,
          name: 'Butterflies',
          artist: 'Sia',
          cover: 'img/4.jpg',
          source: 'mp3/4.mp3',
          url: 'https://www.youtube.com/watch?v=kYgGwWYOd9Y',
          favorited: false
        },
        {
          index: 4,
          name: 'The Final Victory',
          artist: 'Haggard',
          cover: 'img/5.jpg',
          source: 'mp3/5.mp3',
          url: 'https://www.youtube.com/watch?v=0WlpALnQdN8',
          favorited: true
        },
        {
          index: 5,
          name: 'Genius ft. Sia, Diplo, Labrinth',
          artist: 'LSD',
          cover: 'img/6.jpg',
          source: 'mp3/6.mp3',
          url: 'https://www.youtube.com/watch?v=HhoATZ1Imtw',
          favorited: false
        },
        {
          index: 6,
          name: 'The Comeback Kid',
          artist: 'Lindi Ortega',
          cover: 'img/7.jpg',
          source: 'mp3/7.mp3',
          url: 'https://www.youtube.com/watch?v=me6aoX0wCV8',
          favorited: true
        },
        {
          index: 7,
          name: 'Overdose',
          artist: 'Grandson',
          cover: 'img/8.jpg',
          source: 'mp3/8.mp3',
          url: 'https://www.youtube.com/watch?v=00-Rl3Jlx-o',
          favorited: false
        },
        {
          index: 8,
          name: "Rag'n'Bone Man",
          artist: 'Human',
          cover: 'img/9.jpg',
          source: 'mp3/9.mp3',
          url: 'https://www.youtube.com/watch?v=L3wKzyIN1yk',
          favorited: false
        }
      ]
    }
  },
  methods: {
    isWeixin() {
      var ua = navigator.userAgent.toLowerCase()
      return ua.match(/MicroMessenger/i) == 'micromessenger'
    },
    /**
   * 苹果输入框
   */
    IOSinput() {
      var itimer
      document.body.addEventListener('focusin', function () {
        clearTimeout(itimer)
      })
      document.body.addEventListener('focusout', function () {
        itimer = setTimeout(function () {
          var scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0
          window.scrollTo(0, Math.max(scrollHeight - 1, 0))
        }, 100)
      })
    },
    loaderImage() {
      var loader = new PxLoader()
      for (var index = 1; index < 22; index++) {
        var pxImage = new PxLoaderImage('img/' + index + '.jpg')
        loader.add(pxImage)
      }
      loader.addProgressListener(function (e) {
        // console.log(e.completedCount + ' / ' + e.totalCount)
      })
      loader.addCompletionListener(() => {
        this.init()
      })
      loader.start()
    },
    init() {
      var vm = this
    }
  },
  created() {
    this.loaderImage()
  }
})
