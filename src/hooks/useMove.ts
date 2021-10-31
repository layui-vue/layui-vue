function useMove(el: any) {
  el.style.position = 'fixed'
  let offsetX: number,
    offsetY: number,
    oL: number,
    oT: number,
    oLeft: number,
    oTop: number
  const browser = {
    versions: (function () {
      const u = navigator.userAgent
      return {
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //判断设备
        //  ..... 其他设备信息
      }
    })(),
  }
  if (!browser.versions.mobile) {
    //Pc
    if (el != null) {
      el.addEventListener('mousedown', function (event: any) {
        if (event.button == 0 && el != null) {
          const lexObj: any = getComputedStyle(el)
          offsetX =
            event.pageX - el.offsetLeft + parseInt(lexObj['margin-left'])
          offsetY =
            event.pageY - el.offsetTop + parseInt(lexObj['margin-right'])
          const move = function (event: any) {
            if (el != null) {
              let x = event.pageX - offsetX
              let y = event.pageY - offsetY
              if (x < 0) {
                x = 0
              } else if (
                x >
                document.documentElement.clientWidth - el.offsetWidth
              ) {
                x = document.documentElement.clientWidth - el.offsetWidth
              }
              if (y < 0) {
                y = 0
              } else if (
                y >
                document.documentElement.clientHeight - el.offsetHeight
              ) {
                y = document.documentElement.clientHeight - el.offsetHeight
              }
              el.style.left = x + 'px'
              el.style.top = y + 'px'
            }
            return false
          }
          document.addEventListener('mousemove', move)
          const stop = function () {
            document.removeEventListener('mousemove', move)
            document.removeEventListener('mouseup', stop)
          }
          document.addEventListener('mouseup', stop)
        }
        return false
      })
    }
  } else {
    //Mobile
    if (el != null) {
      const maxW = document.body.clientWidth - el.offsetWidth
      const maxH = document.body.clientHeight - el.offsetHeight
      const defaultEvent = function (e: any) {
        e.preventDefault()
      }
      el.addEventListener('touchstart', function (e: any) {
        const ev = e || window.event
        const touch = ev.targetTouches[0]
        oL = touch.clientX - el.offsetLeft
        oT = touch.clientY - el.offsetTop
        document.addEventListener('touchmove', defaultEvent, false)
        el.addEventListener('touchmove', function (e: any) {
          const ev = e || window.event
          const touch = ev.targetTouches[0]
          oLeft = touch.clientX - oL
          oTop = touch.clientY - oT
          if (oLeft < 0) {
            oLeft = 0
          } else if (oLeft >= maxW) {
            oLeft = maxW
          }
          if (oTop < 0) {
            oTop = 0
          } else if (oTop >= maxH) {
            oTop = maxH
          }
          el.style.left = oLeft + 'px'
          el.style.top = oTop + 'px'
        })
        el.addEventListener('touchend', function () {
          document.removeEventListener('touchmove', defaultEvent)
        })
      })
    }
  }
}

export default useMove
