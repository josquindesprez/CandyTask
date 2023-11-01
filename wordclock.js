



function makeClockHorizontal (){
    
  /* const clock = document.getElementById('clock')
   clock.remove(); 
   document.body.appendChild(horizontalClock);*/ 
}





document.addEventListener("DOMContentLoaded", function() {
    const clock = document.createElement("div");
    clock.id="clock";
    clock.innerHTML = `
		
			<span class="word on">It</span>
			<span class="word nbsp"></span>
			<span class="word on">is</span>
			<span class="word nbsp"></span>
			<span class="word" id="m_20">twenty</span>
			<br />
			<span class="word" id="m_15">quarter</span>
			<span class="word nbsp"></span>
			<span class="word" id="m_30">half</span>
			<br />
			<span class="word" id="m_10">ten</span>
			<span class="word" id="m_5">five</span>
			<span class="word nbsp"></span>
			<span class="word" id="past">past</span>
			<br />
			<span class="word" id="to">to</span>
			<span class="word nbsp"></span>
			<span class="word" id="h_0">twelve</span>
			<span class="word" id="h_1">one</span>
			<br />
			<span class="word" id="h_2">two</span>
			<span class="word" id="h_3">three</span>
			<span class="word" id="h_4">four</span>
			<br />
			<span class="word" id="h_5">five</span>
			<span class="word" id="h_6">six</span>
			<span class="word" id="h_7">seven</span>
			<br />
			<span class="word" id="h_8">eight</span>
			<span class="word" id="h_9">nine</span>
			<span class="word" id="h_10">ten</span>
			<br />
			<span class="word nbsp"></span>
			<span class="word nbsp"></span>
			<span class="word nbsp"></span>
			<span class="word" id="h_11">eleven</span>
			<span class="word nbsp"></span>
			<span class="word nbsp"></span>
			<span class="word nbsp"></span>
			<br />
			<span class="word nbsp"></span>
			<span class="word" id="m_0">O'Clock</span>
			<span class="word nbsp"></span>
			<span class="word on">now</span>    `;
            //document.getElementById('popup').appendChild(clock);
            document.body.appendChild(clock);
    /*const horizontalClock = document.createElement('div');
    horizontalClock.id = "horizontalClock";
    horizontalClock.innerHTML =`<span class="word on">It</span>
        <span class="word nbsp"></span>
        <span class="word on">is</span>
        <br />
        <span class="word" id="m_5">five</span>
        <span class="word" id="m_10">ten</span>
        <span class="word" id="m_15">quarter</span>
        <span class="word" id="m_20">twenty</span>
        <span class="word" id="m_30">half</span>
        <span class="word nbsp"></span>
        <span class="word" id="past">past</span>
        <span class="word" id="to">to</span>
        <br />
        <span class="word" id="h_0">twelve</span>
        <span class="word" id="h_1">one</span>
        <span class="word" id="h_2">two</span>
        <span class="word" id="h_3">three</span>
        <span class="word" id="h_4">four</span>
        <span class="word" id="h_5">five</span>
        <span class="word" id="h_6">six</span>
        <span class="word" id="h_7">seven</span>
        <span class="word" id="h_8">eight</span>
        <span class="word" id="h_9">nine</span>
        <span class="word" id="h_10">ten</span>
        <span class="word" id="h_11">eleven</span>
        <span class="word nbsp"></span>
        <span class="word nbsp"></span>
        <span class="word" id="m_0">O'Clock</span>
        <span class="word nbsp"></span>
        <span class="word on">now</span>
    `;
       document.body.appendChild(horizontalClock)*/
});







var hours;
var minutes; 
var to; 
var past; 
var nbsps;
var progress;
var chars = 'abcdefghijklmnopqrstuvwxyz';

var changed = function() {
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var offset;
	var next;

	hour = hour % 12;
	minute = minute - minute % 5;

	for (var i in minutes) {
		minutes[i].removeClass('on');
	}
	for (var i in hours) {
		hours[i].removeClass('on');
	}

	to.removeClass('on');
	past.removeClass('on');


	if (minute > 30) {
		hours[(hour + 1) % 12].addClass('on');
		to.addClass('on');

	} else {
		hours[hour].addClass('on');
		if (minute !== 0) {
			past.addClass('on');
		}
	}

	offset = (minute > 30)?(60-minute):minute;

	if (offset in minutes) {
		minutes[offset].addClass('on');
	} else if (offset === 25) {
		minutes[20].addClass('on');
		minutes[5].addClass('on');
	}

	now.setTime(Date.now());
	next = new Date(now.getTime());
	next.setMinutes(minute + 5);
	next.setSeconds(0);
	next.setMilliseconds(0);
	console.log((next - now) / 1000);
	setTimeout(changed, next - now);

}

var adjustProgress = function() {
	var now = new Date();
	var passed = (now.getMinutes() % 5) * 60 + now.getSeconds();
	var percent = passed / (5 * 60) * 100;

	progress.width(percent+'%')
		.css('transition', 'width 1s linear');

	if (percent < .5) {
		progress.hide();
		setTimeout(function() {
			progress.fadeIn();
		}, 500);
	}

	setTimeout(adjustProgress, 1000);
};

var first = function() {
	nbsps.each(function() {
		var c = chars.charAt(Math.floor(Math.random() * chars.length));
		$(this).text(c);
	});

	setTimeout(function() {
		progress.fadeIn();
	}, 1000);
};

$(function() {
	minutes = {
		0: $('#clock #m_0'),
		5: $('#clock #m_5'),
		10: $('#clock #m_10'),
		15: $('#clock #m_15'),
		20: $('#clock #m_20'),
		30: $('#clock #m_30'),
	};

	hours = {
		0: $('#clock #h_0'),
		1: $('#clock #h_1'),
		2: $('#clock #h_2'),
		3: $('#clock #h_3'),
		4: $('#clock #h_4'),
		5: $('#clock #h_5'),
		6: $('#clock #h_6'),
		7: $('#clock #h_7'),
		8: $('#clock #h_8'),
		9: $('#clock #h_9'),
		10: $('#clock #h_10'),
		11: $('#clock #h_11'),
	}

	to = $('#clock #to');
	past = $('#clock #past');

	nbsps = $('#clock .nbsp');

	progress = $('#progressbar');


	changed();
	adjustProgress();

	first();
});

