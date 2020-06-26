$(document).ready(function () {

  $('#do-slider').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    appendDots: $('.do-custom-dots'),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true

        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  });

  $('.do-menu-close').on('click', function () {
    $('.navbar-collapse').collapse('hide');
  });
  $("#do-filter-modal").modal({ show: true });

  function splitUppercase(string) {
    var result = string.replace(/([A-Z]+)/g, ",$1").replace(/^,/, "");
    return result.split(",");
}

  /**
   * Range Slider
   * change name value if id or name is changed!!!
   */

  let units={
    'distanceSlider' : 'km',
    'ageSlider' : '',
    'heightSlider' : 'cm',
    'weightSlider' : 'kg'
  }

  $('.range-slider').each(function (i, el) {
    let id = $(this).attr('id');
    let data = $(this).data();
    let splitedID= splitUppercase(id);
    var name = splitedID[0];
   
    $(`#${id}`).slider({
      range: true,
      min: data.min || 0,
      max: data.max || 300,
      values: data.values || [15, 200],
      slide: function (event, ui) {
      
        $('input[name ="'+name+'_from"]').val(ui.values[0]);
        $('input[name ="'+name+'_to"]').val(ui.values[1]);
        $(this).find(".custom-handle-from").html(`<div class="do-handle-value">${ui.values[0]} ${units[id]}</div>`);
        $(this).find(".custom-handle-to").html(`<div class="do-handle-value">${ui.values[1]}${units[id]}</div>`);
      },
      create: function () {
        
        var from = $(this).slider("values", 0);
        var to = $(this).slider("values", 1);
        $(this).find(".custom-handle-from").html(`<div class="do-handle-value">${from} ${units[id]}</div>`);
        $(this).find(".custom-handle-to").html(`<div class="do-handle-value">${to} ${units[id]}</div>`);
        $('input[name ="'+name+'_from"]').val(from);
        $('input[name ="'+name+'_to"]').val(to);
      }
    });
  });


});

