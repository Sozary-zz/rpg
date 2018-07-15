(($) => {
  var changingName = new TimelineLite()
  var shareAppearance = new TimelineLite()
  var shareCopy = new TimelineLite()
  var isEmpty = true
  var isBad = false

  changingName.from($('#save .save-btn'), .3, {
    opacity: 0,
    x: 50,
    borderTopLeftRadius: '100px',
    borderTopRightRadius: '100px',
    borderBottomLeftRadius: '100px',
    borderBottomRightRadius: '100px',

    ease: Power4.easeOut,
    width: 200,
  })
  changingName.from($('#save .save-btn .one'), .3, {
    opacity: 0,
    x: 50,
    y: 50
  }, "#validate")
  changingName.from($('#save .save-btn .two'), .3, {
    opacity: 0,
    x: -50,
    y: -50
  }, "#validate")
  changingName.stop()

  shareAppearance.to($('.share'), .01, {
    visibility: 'visible'
  })

  shareAppearance.from($('.share'), .4, {
    opacity: 0,
    top: '50%',
    left: '50%',
    width: $('#treeview').width(),
    height: $('#treeview').height(),
    x: '-50%',
    y: '-50%',
  })
  shareAppearance.stop()

  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }
  const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  $('.share-link').click(function(e) {
    copyToClipboard($('.share-link').text())
    setTimeout(() => {
      $(".share span").text('Copié!')
    }, 800)

    shareCopy.staggerTo(shuffle($('.link-elem')), 2, {
        rotation: "-=360",
        width: 20,
        height: 20,
        borderRadius: '50%',
        cycle: {
          x: function(i) {
            return Math.cos(i / $('.link-elem').length * Math.random() * 15.28) * 300 + 150
          },
        },
        y: -400,
        backgroundColor: function(index) {
          let r = Math.random() * 255
          let g = Math.random() * 255
          let b = Math.random() * 255

          return 'rgb(' + r + ',' + g + ',' + b + ')'
        },
        ease: Elastic.easeOut,
        scale: 1.5,
        position: "absolute",
      }, .01)
      .to($('.share'), .5, {
        width: 160,
        height: 160,
        left: '50%',
        x: '-50%',
        borderRadius: '50%',
        ease: Back.easeOut.config(1.7),
        backgroundImage: 'radial-gradient(circle at center, #2ecc71, #27ae60)',
      }, "-=2")
      .to($('.share span'), .3, {
        opacity: 0
      }, "-=2")
      .to($('.share .share-link'), .3, {
        borderWidth: 0,
        boxShadow: 0
      }, "-=2")
      .to($('.share span'), .3, {
        opacity: 1,
        top: '40%',
        color: 'rgba(255,255,255,1) !important'
      }, "-=2")
      .to($('.share'), .5, {
        width: 0,
        height: 0,
        left: '50%',
        x: '-50%',
        boxShadow: '0 0 0',
        ease: Circ.easeOut,
      }, "#bye")
      .to($('.share span'), .5, {
        opacity: 0,
        ease: Circ.easeOut,
      }, "#bye")


    setTimeout(() => {
      shareCopy.progress(0)
      shareCopy.clear()
      shareAppearance.progress(0)
      shareAppearance.stop()
      setTimeout(() => {
        $(".share span").text('Votre lien')
      }, 800)
      $('#share-btn').removeAttr('disabled')
    }, shareCopy.totalDuration() * 1000)

  })

  $('#share-btn').click(function(e) {

    if (documentContent.docHasBeenSave.ok) {
      $('#share-btn').attr('disabled', '')
      shareAppearance.play()
    }

    fillShareInput()
  })


  let isExisting = () => {
    let v = $('.custom-name').val()
    v = v.split(' ').join('_');
    let canInsert = true
    dirCtnt.files.forEach(item => {
      if (item === v)
        canInsert = false
    })
    return !canInsert
  }

  $('.custom-name').on('input', function() {
    if ($(this).val() != "") {
      if (isExisting()) {
        isBad = true
        changingName.reverse()
      } else {
        if (isBad) {
          isBad = false
          changingName.reversed() ? changingName.play() : changingName
        }
        if (isEmpty) {
          isEmpty = false
          changingName.play()
        }
      }
    } else {
      if (isBad) {
        isBad = false
      }
      if (!isEmpty) {
        isEmpty = true
        changingName.reverse()
      }
    }
  })

  $('.custom-name').keypress(function(e) {
    if (e.which == 13) {
      $('#save .save-btn').click()
    }
  });
  $('#save .save-btn').click(function(e) {
    let ctnt = $('.custom-name').val()
    if (ctnt === "" || isExisting())
      return

    ctnt = ctnt.split(' ').join('_');

    save(dirCtnt.usr, ctnt, () => {
      $('<li><img src="./images/book.svg" width="100">' + ctnt + '</li>').hide().prependTo($('#save .modal-body ul')).slideDown()
      $('.custom-name').val("")
      changingName.reverse()
      isEmpty = true
      setTimeout(() => {
        $('#save').modal('hide')
      }, 1000)

    })
  })

})(jQuery)