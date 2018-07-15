(function($) {
  let sum = 0
  var deployAnim = new TimelineLite()


  $('nav ol').children().each((i, item) => {
    let add = $(item).width()
    sum += add
  })

  sum += 10 * ($('nav li').children().length + 1)

  deployAnim.to($('nav .toggle .scnd'), .3, {
    y: -55,
    height: 30,
    rotation: 180,
    zIndex: -1
  })
  deployAnim.to($('nav .toggle .scnd'), .3, {
    width: sum - 30,
    x: -sum / 2
  }, "#extend")
  deployAnim.to($('nav ol'), .3, {
    visibility: 'visible',
    opacity: 1
  }, "#extend")
  deployAnim.stop()

  $('nav .toggle').click(function(e) {

    $(this).toggleClass('deployed')
    if ($(this).hasClass('deployed'))
      deployAnim.play()
    else
      deployAnim.reverse()
  })
})(jQuery)