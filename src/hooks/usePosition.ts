// @ts-noCheck
// 是否滚动
export const hasScrollbar = () =>
  document.body.scrollHeight >
  (window.innerHeight || document.documentElement.clientHeight)
// 窗口宽高
export const winArea = (type?: any) =>
  document.documentElement[type ? 'clientWidth' : 'clientHeight']
//
export const scrollArea: any = (type: any) => {
  type = type ? 'scrollLeft' : 'scrollTop'
  return document.body[type] | document.documentElement[type]
}

export function usePosition(elem?: any, elemView?: any, obj?: any) {
  if (!elemView) return
  obj = obj || {}

  //如果绑定的是 document 或 body 元素，则直接获取鼠标坐标
  if (elem === document || elem.name === 'body') {
    obj.clickType = 'right'
  }

  //绑定绑定元素的坐标
  const rect =
    obj.clickType === 'right'
      ? (function () {
          const e = obj.e || window.event || {}
          return {
            left: e.clientX,
            top: e.clientY,
            right: e.clientX,
            bottom: e.clientY,
          }
        })()
      : elem.getBoundingClientRect()
  const elemWidth = elemView.offsetWidth //控件的宽度
  const elemHeight = elemView.offsetHeight //控件的高度

  const margin = 5
  let left = rect.left
  let top = rect.bottom

  //相对元素居中
  if (obj.align === 'center') {
    left = left - (elemWidth - elem.offsetWidth) / 2
  } else if (obj.align === 'right') {
    left = left - elemWidth + elem.offsetWidth
  }

  //判断右侧是否超出边界
  if (left + elemWidth + margin > winArea('width')) {
    left = winArea('width') - elemWidth - margin //如果超出右侧，则将面板向右靠齐
  }
  //左侧是否超出边界
  if (left < margin) left = margin

  //判断底部和顶部是否超出边界
  if (top + elemHeight + margin > winArea()) {
    //优先顶部是否有足够区域显示完全
    if (rect.top > elemHeight + margin) {
      top = rect.top - elemHeight - margin * 2 //顶部有足够的区域显示
    } else {
      //如果面板是鼠标右键弹出，且顶部没有足够区域显示，则将面板向底部靠齐
      if (obj.clickType === 'right') {
        top = winArea() - elemHeight - margin * 2
        if (top < 0) top = 0 //不能溢出窗口顶部
      }
    }
  }

  //定位类型
  const position = obj.position
  if (position) elemView.style.position = position

  //设置坐标
  elemView.style.left = left + (position === 'fixed' ? 0 : scrollArea(1)) + 'px'
  elemView.style.top = top + (position === 'fixed' ? 0 : scrollArea()) + 'px'

  //防止页面无滚动条时，又因为弹出面板而出现滚动条导致的坐标计算偏差
  if (!hasScrollbar()) {
    const rect1 = elemView.getBoundingClientRect()
    //如果弹出面板的溢出窗口底部，则表示将出现滚动条，此时需要重新计算坐标
    if (!obj.SYSTEM_RELOAD && rect1.bottom + margin > winArea()) {
      obj.SYSTEM_RELOAD = true
      setTimeout(function () {
        usePosition(elem, elemView, obj)
      }, 50)
    }
  }
}
