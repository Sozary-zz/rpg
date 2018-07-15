$.fn.topBottom = function(container) {
  this.find('div[data-autoscroll="top"]').append('<img src="./images/arrow-down-sign-to-navigate.svg" width="30px">').css({
    'right': '-90%',
    'width': '30px',
    'position': 'relative'
  })
  console.log($(container));

  console.log(container);
  $(container).on('scroll', function() {
    console.log($(this).innerHeight(), $(this)[0].innerHeight)
    // if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
    //   $("span").show();
    // } else {
    //   $("span").hide();
    // }
  });

  return this
};