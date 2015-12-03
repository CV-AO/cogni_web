var clickoff = null;
var selectOpened = false;

function onoffToggle(id){
  curr = $('.'+id).attr('val')
  if (curr == 'off'){
    $( ".onoffcircle" ).animate({
    right: "44px",
    }, 300, function() {
      $('.offtext').show()
    });
    $('.'+id).css('background','gainsboro')
    $('.'+id).attr('val', 'on')
    
    $('.ontext').hide()
  }else{
    $( ".onoffcircle" ).animate({
    right: "4px",
    }, 300, function() {
      $('.ontext').show()
    });
    $('.'+id).css('background','#8cb75a')
    $('.'+id).attr('val', 'off')
    $('.offtext').hide()
    
  }
}

function clickoff(){
$('.timeChange').attr('val','contracted')
}

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}


function buildTimePicker() {
    var result = document.createElement('div');
    result.setAttribute('id','timePicker');
    var result2 = document.createElement('div');
    result2.setAttribute('id','timebox');
    var hours = document.createElement('select');
    hours.setAttribute('id', 'hour');
    for (var h=1; h<13; h++) {
        var option = document.createElement('option');
        option.setAttribute('value', h);
        option.appendChild(document.createTextNode(h ));
        hours.appendChild(option);
    }
    var minutes = document.createElement('select');
    minutes.setAttribute('id', 'minute');
    for (var m=0; m<60; m++) {
        var option = document.createElement('option');
        //console.log(m);
        var min = zeroPad(m, 2); // "05"
        option.setAttribute('value', min);
        option.appendChild(document.createTextNode(min ));
        minutes.appendChild(option);
    }
    
    var amorpm = document.createElement('div');
    amorpm.setAttribute('class', 'ampmpill');
    
    var chooseam = document.createElement('div');
    chooseam.setAttribute('id', 'selectAM');
    chooseam.setAttribute('class', 'ampmswitch');
    chooseam.appendChild(document.createTextNode('AM'));
    var choosepm = document.createElement('div');
    choosepm.setAttribute('id', 'selectPM');
    choosepm.setAttribute('class', 'ampmswitch');
    choosepm.appendChild(document.createTextNode('PM'));
   
    amorpm.appendChild(chooseam);
    amorpm.appendChild(choosepm);
    
    
    result.appendChild(hours);
    result.appendChild(document.createTextNode(" : "));
    result.appendChild(minutes);
    result.appendChild(amorpm);
    result2.appendChild(result);
    return result2;
}

//$('#timePicker').html(buildTimePicker());
//document.getElementById('timePicker').appendChild(buildTimePicker());

$(function(){
  $('.offtext').hide()
  $('body').click(function(){
    if (selectOpened) {
        selectOpened = false;
    }
    if (!$(event.target).closest('#timePicker, #profiles_toydetail_block_bottom_three_two, #profiles_toydetail_block_bottom_three_four').length) {
      $('#timePicker').remove();
      $('.timeChange').attr('val','contracted')
     }
  });

  $('.timeChange').on('click', '.ampmswitch', function(){
    //alert('clickActivated');
    
    //change background
    //$('.ampmswitch').css('background','#ccc');
    $(this).css('background','#f44');
    //change am or pm to display
    var switchId = $(this).attr('id');
    
    
    //alert(switchId);
    
    if(switchId == 'selectAM'){
      //alert('AM');
      $(this).parents('.timeChange').find('.timeset2').html('AM');

    } else if (switchId == 'selectPM'){
      //alert('PM');
      $(this).parents('.timeChange').find('.timeset2').html('PM');

    }
    
    $(this).parents('.timeChange').find('#timeBox').remove();
      //$('#timePicker').remove();
    $('.timeChange').attr('val','contracted')
    clickoff();
    
    
  });
  
  
  $('.timeChange').click(function(){

      //get current time
     var currTime =$(this).find('.timeset1').text();
     currTime = currTime.split(":");
     var currAMPM =$(this).find('.timeset2').text();
     //close out any other timepickers 
     id = $(this).attr('id')
     $( ".timeChange" ).each(function(index) {
        if($(this).attr('val') == 'expanded'){
          if($(this).attr('id') == id){
            return
          }
          a = $(this).find('#timePicker')
          console.log('found one')
          console.log(a.attr('id'))
          a.remove()
          $('.timeChange').attr('val','contracted')
        }
     });
     if($(this).attr('val') == 'contracted'){
        $(this).append(buildTimePicker());
        $(this).attr('val','expanded')
        if(currAMPM == 'AM'){
          //$('.ampmswitch').css('background','#ccc');

          $('#selectAM').css('background','#df5d59');
        } else if (currAMPM == 'PM'){
          // $('.ampmswitch').css('background','#ccc');

          $('#selectPM').css('background','#df5d59');
          
        }
        
        
        
          $(this).find('#hour option[value="'+currTime[0]+'"]').attr("selected","selected");
          $(this).find('#minute option[value="'+currTime[1]+'"]').attr("selected","selected");
        
        //clickoff = 1;
    }
  });
  
  
  $('.timeChange').on( 'click', '#hour', function(){
    console.log('hour minute clicked');
    selectOpened = 1;
  });
  
    
  
  $('.timeChange').on('change','#hour', function(){
    var hourvalue = $(this).val();
    var minutevalue = $(this).parent('div').find('#minute').val();
    var Newtime = hourvalue +':'+ minutevalue;
      $(this).parents('.timeChange').find('.timeset1').html(Newtime);
  });
  
  $('.timeChange').on('change','#minute', function(){
    var hourvalue = $(this).parent('div').find('#hour').val();
    var minutevalue = $(this).val();
    var Newtime = hourvalue +':'+ minutevalue;
      $(this).parents('.timeChange').find('.timeset1').html(Newtime);
  });  
  
  
  
});
