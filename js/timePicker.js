function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}


function buildTimePicker() {
    $('#timePicker').remove();
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


$(function(){
  
  $('body').click(function(){
    if (!$(event.target).closest('#timePicker, #profiles_toydetail_block_bottom_three_two, #profiles_toydetail_block_bottom_three_four').length) {
      $('#timePicker').remove();
    }
  });

  $('.timeChange').on('click', '.ampmswitch', function(){

    $(this).css('background','#f44');
    //change am or pm to display
    var switchId = $(this).attr('id');
    
    
    if(switchId == 'selectAM'){
      $(this).parents('.timeChange').find('.timeset2').html('AM');
    } else if (switchId == 'selectPM'){
      $(this).parents('.timeChange').find('.timeset2').html('PM');
    }
    
    $(this).parents('.timeChange').find('#timeBox').remove();
      $('#timePicker').remove();
  });
  
  
  $('.timeChange').click(function(){
     var currTime =$(this).find('.timeset1').text();
     currTime = currTime.split(":");

     var currAMPM =$(this).find('.timeset2').text();
    $(this).append(buildTimePicker());
    

    if(currAMPM == 'AM'){

      $('#selectAM').css('background','#f44');
    } else if (currAMPM == 'PM'){
      $('#selectPM').css('background','#f44');
      
    }
    
    
    
      $(this).find('#hour option[value="'+currTime[0]+'"]').attr("selected","selected");
      $(this).find('#minute option[value="'+currTime[1]+'"]').attr("selected","selected");
  });
  
  
  $('.timeChange').on( 'click', '#hour', function(){
    console.log('hour minute clicked');
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

