var ibase = importBase()
function importBase () {
  var base = {}
  // 获得http url参数
  base.getQueryString = function (name) {
    if (name && name != '') {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return decodeURIComponent(r[2])
      return null
    } // end if
    else return null
  } // end func

  base.load = function (f, shell, callback, nocache) {
    nocache = nocache != null ? nocache : true
    var file = get_filetype(f, nocache)
    if (file.type == 'css')  this.loadCss(file.src, shell, callback)
    else if (file.type == 'js') this.loadJs(file.src, shell, callback)
  } // end func

  base.loadCss = function (src, shell, callback) {
    shell = shell || 'head'
    var fileref = document.createElement('link')
    fileref.setAttribute('rel', 'stylesheet')
    fileref.setAttribute('type', 'text/css')
    fileref.setAttribute('href', src)
    document.querySelector(shell).appendChild(fileref)
    if (callback) fileref.onload = callback
  } // edn func

  base.loadJs = function (src, shell, callback) {
    shell = shell || 'body'
    var fileref = document.createElement('script')
    fileref.setAttribute('type', 'text/javascript')
    fileref.setAttribute('src', src)
    document.querySelector(shell).appendChild(fileref)
    if (callback) fileref.onload = callback
  } // edn func

  function get_filetype(f, nocache) {
		nocache = nocache != null ? nocache : true;
		var tmp = f.split('.');
		var type = tmp[tmp.length - 1];
    var src = f + (nocache ? '?v=' + Math.random() : '');
		return {
			type: type,
			src: src
    };
	} //end func
  base.debug = parseInt(base.getQueryString('debug')) || 0
  return base
}
// -----------------------------------debug
if (ibase.debug) {
  ibase.load('scripts/vConsole.min.js')
} // end if