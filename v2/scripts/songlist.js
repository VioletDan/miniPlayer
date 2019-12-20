new Vue({
  el: '#app',
  data() {
    return {
      currentListIndex: 0,
      duration: '00:00', // 音乐时长
      currentTime: '00:00', // 当前播放时间
      barWidth: 0,
      currentMusicList: {
        index: 0,
        name: 'Mekanın Sahibi',
        artist: 'Norm Ender',
        cover: 'img/1.jpg',
        source: 'http://t.viola.be-xx.com/music/mp3/1.mp3',
        url: 'https://www.youtube.com/watch?v=z3wAjJXbYzA',
        favorited: false
      },
      audio: null,
      isTimePlaying: false,
      coverImage: '', // 动画类名
      musicList: [
        {
          index: 0,
          name: 'Mekanın Sahibi',
          artist: 'Norm Ender',
          cover: 'img/1.jpg',
          source: 'http://t.viola.be-xx.com/music/mp3/1.mp3',
          url: 'https://www.youtube.com/watch?v=z3wAjJXbYzA',
          favorited: false
        },
        {
          index: 1,
          name: 'Everybody Knows',
          artist: 'Leonard Cohen',
          cover: 'img/2.jpg',
          source: 'http://t.viola.be-xx.com/music/mp3/2.mp3',
          url: 'https://www.youtube.com/watch?v=Lin-a2lTelg',
          favorited: true
        },
        {
          index: 2,
          name: 'Extreme Ways',
          artist: 'Moby',
          cover: 'img/3.jpg',
          source: 'http://t.viola.be-xx.com/music/mp3/3.mp3',
          url: 'https://www.youtube.com/watch?v=ICjyAe9S54c',
          favorited: false
        },
        {
          index: 3,
          name: 'Butterflies',
          artist: 'Sia',
          cover: 'img/4.jpg',
          source: 'http://t.viola.be-xx.com/music/mp3/4.mp3',
          url: 'https://www.youtube.com/watch?v=kYgGwWYOd9Y',
          favorited: false
        },
        {
          index: 4,
          name: 'The Final Victory',
          artist: 'Haggard',
          cover: 'img/5.jpg',
          source: 'http://t.viola.be-xx.com/music/mp3/5.mp3',
          url: 'https://www.youtube.com/watch?v=0WlpALnQdN8',
          favorited: true
        },
        {
          index: 5,
          name: 'Genius ft. Sia, Diplo, Labrinth',
          artist: 'LSD',
          cover: 'img/6.jpg',
          source: 'http://t.viola.be-xx.com/music/mp3/6.mp3',
          url: 'https://www.youtube.com/watch?v=HhoATZ1Imtw',
          favorited: false
        },
        {
          index: 6,
          name: 'The Comeback Kid',
          artist: 'Lindi Ortega',
          cover: 'img/7.jpg',
          source: 'http://t.viola.be-xx.com/music/mp3/7.mp3',
          url: 'https://www.youtube.com/watch?v=me6aoX0wCV8',
          favorited: true
        },
        {
          index: 7,
          name: 'Overdose',
          artist: 'Grandson',
          cover: 'img/8.jpg',
          source: 'http://t.viola.be-xx.com/music/mp3/8.mp3',
          url: 'https://www.youtube.com/watch?v=00-Rl3Jlx-o',
          favorited: false
        },
        {
          index: 8,
          name: "Rag'n'Bone Man",
          artist: 'Human',
          cover: 'img/9.jpg',
          source: 'http://t.viola.be-xx.com/music/mp3/9.mp3',
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
      document.body.addEventListener('focusin', function() {
        clearTimeout(itimer)
      })
      document.body.addEventListener('focusout', function() {
        itimer = setTimeout(function() {
          var scrollHeight =
            document.documentElement.scrollTop || document.body.scrollTop || 0
          window.scrollTo(0, Math.max(scrollHeight - 1, 0))
        }, 100)
      })
    },
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
    init() {
      var vm = this
      this.currentMusicList = this.musicList[0]
      this.audio = new Audio()
      this.audio.src = this.currentMusicList.source
      this.audio.ontimeupdate = function(e) {
        vm.generateTime()
      }
      this.audio.onloadedmetadata = function(e) {
        vm.generateTime()
      }
      this.audio.onended = function(e) {
        vm.isTimePlaying = true
        vm.nextTrack()
      }
    },
    generateTime() {
      var width = (this.audio.currentTime / this.audio.duration) * 100
      this.barWidth = width + '%'
      var durationMin = Math.floor(this.audio.duration / 60)
      var durationSec = Math.floor(this.audio.duration - durationMin * 60)
      var currentTimeMin = Math.floor(this.audio.currentTime / 60)
      var currentTimeSec = Math.floor(
        this.audio.currentTime - currentTimeMin * 60
      )

      if (durationMin < 10) {
        durationMin = '0' + durationMin
      }
      if (durationSec < 10) {
        durationSec = '0' + durationSec
      }
      if (currentTimeMin < 10) {
        currentTimeMin = '0' + currentTimeMin
      }
      if (currentTimeSec < 10) {
        currentTimeSec = '0' + currentTimeSec
      }

      this.duration = durationMin + ':' + durationSec
      this.currentTime = currentTimeMin + ':' + currentTimeSec
    },

    // 播放
    playClick() {
      if (this.audio.paused) {
        this.audio.play()
        this.isTimePlaying = true
      } else {
        this.audio.pause()
        this.isTimePlaying = false
      }
    },
    // 标注是否喜爱
    favorite() {
      this.musicList[this.currentListIndex].favorited = !this.musicList[
        this.currentListIndex
      ].favorited
    },
    // 切换上下首
    prevTrack() {
      if (this.currentListIndex > 0) {
        this.currentListIndex--
      } else {
        this.currentListIndex = this.musicList.length - 1
      }
      this.currentMusicList = this.musicList[this.currentListIndex]
      this.coverImage = 'scale-in'
      this.resetPlayer()
    },
    nextTrack() {
      if (this.currentListIndex < this.musicList.length - 1) {
        this.currentListIndex++
      } else {
        this.currentListIndex = 0
      }
      this.currentMusicList = this.musicList[this.currentListIndex]
      this.coverImage = 'scale-out'
      this.resetPlayer()
    },
    //重置一些信息
    resetPlayer() {
      this.barWidth = 0
      this.audio.currentTime = 0
      this.audio.src = this.currentMusicList.source
      setTimeout(() => {
        if (this.isTimePlaying) {
          this.audio.play()
        } else {
          this.audio.pause()
        }
      }, 300)
    },
    // 快进
    progressbarClick(e) {
      this.isTimePlaying = true
      this.audio.pause()
      this.updatebar(e.pageX)
    },
    //更新进度条
    updatebar(x) {
      var progressbar = this.$refs.bar
      var currentPageX = x - progressbar.offsetLeft
      var precent = (currentPageX / progressbar.offsetWidth) * 100
      if(precent > 100) precent = 100
      if(precent < 0) precent = 0
      this.barWidth = precent + '%'
      this.audio.currentTime = (this.audio.duration*precent)/100
      this.audio.play()
    }
  },
  created() {
    this.loaderImage()
  }
})
