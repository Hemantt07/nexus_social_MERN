
  // Baner animation
  var banner_array = $('.hero .content .text-rotater .inner-content'), i = 1, top = 0, rotate = '';  
  var a;


  loop();

  function loop() {

    if ( a == true ) {
      $('#inner-content'+banner_array.length).css( 'top', '-400px' );
    }
    
    for (let x = 0; x <= banner_array.length; x++) {
      
      if ( i == 1 ) {
          $('#inner-content'+banner_array.length).css( 'top', '-400px' );
      } else {
        if ( x < i-1 || x > i+1 ) {
            $('#inner-content'+x).remove;
            $('.hero .content .text-rotater').append( $('#inner-content'+x) );
            $('#inner-content'+x).css( 'top', '400px' );
        } 
      }

    }

    $('#inner-content'+(i-1)).css( 'top', '-400px' );

    for (let y = 0; y > i + 1; y++) {
      
      $('#inner-content'+y).css( 'visibility', 'visible' );

    }

    var current_element = $('#inner-content'+i); // Current Element

    current_element.css( 'top', 0 );

      if ( ++i <= banner_array.length  ) {
        a = false;
        rotate = setTimeout(loop, 4000);

      } else {
        i = 1;
        a = true;
        rotate = setTimeout(loop, 4000);

      }
  }