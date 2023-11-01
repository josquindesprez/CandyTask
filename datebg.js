/*document.addEventListener("DOMContentLoaded", function() {
    const divElement = document.getElementById("date-bg");
    const currentDateTime = new Date();
    divElement.innerHTML = currentDateTime.toLocaleString();
});


document.addEventListener("DOMContentLoaded", function() {
    const divElement = document.getElementById("date-bg");

    function updateDateTime() {
        const currentDateTime = new Date();
        divElement.innerHTML = currentDateTime.toLocaleString();
    }

    // Call the function initially
    updateDateTime();

    // Update every second
    setInterval(updateDateTime, 1000);
});*/


document.addEventListener("DOMContentLoaded", function() {
    const divElement = document.getElementById("date-bg");
    divElement.innerHTML = `<div id="progressbar"></div>
		<div id="clock">
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
			<span class="word on">now</span>    ` 
});
