const getCastData = (cb) => {
	let castRequest= new XMLHttpRequest();
	castRequest.responseType = 'json';
	castRequest.open('GET', './cast.json');
	castRequest.onload = function(e) {
		if(castRequest.status === 200) {
			cb(undefined, castRequest.response);
		} else {
			cb('connection error');
		}
	}
	castRequest.send();
}


//get template text data
let characterTemplate = document.getElementById('character-template').innerHTML;

// registering expression helper {{formatName name house.seat}}
Handlebars.registerHelper("formatName", (property1, property2) => {
	if(property1 && property2) {
		return "Hello I am " + property1 + " and I live at " + property2; 
	} else {
		return new Handlebars.SafeString("<b>I have nothing to say</b>");
		// you need to use safe string so html is parsed otherwise it's just
		// goint to be a string
	}
});

// registering block helper
Handlebars.registerHelper("3timesExcl", function(options) {
	let result = '';
	for(let i = 0; i < 3; i++) {
		result += options.fn(this).toLowerCase() + ' ! ';
	}
	return result;
});

Handlebars.registerPartial('partialExample', document.getElementById('partial-example').innerHTML);

//compile handlebarse template based on text data above.
let compiledCharacterTemplate = Handlebars.compile(characterTemplate);

getCastData( (err, data) => {
	if(err) {
		console.log(err);
	} else {
		document.querySelector('.character-list-container').innerHTML = 
		compiledCharacterTemplate(data);

		document.querySelectorAll('.character-list-container>ul>li>h2').forEach(el => {
			el.style.color = 'blue';
		});


	}
});






// console.log(compiledCharacterTemplate(data));

//for using this in handlebars each it should itterate over an array not an object

//unless is like if with ! if(!value)
//you can use / instad of . in template house.name === house/name
// you can use with helper

// 				{{#with house}}
// 				<p>House: {{name}}</p>
// 				<p>Seat: {{seat}}</p>
// 				<p>Words: {{words}}</p>
// 				{{/with}}

// instead of 

// 				<p>House: {{house.name}}</p>
// 				<p>Seat: {{house.seat}}</p>
// 				<p>Words: {{house.words}}</p>
// 				<p>House: {{house.name}}</p>
// if you are inside with block you can use 
// ../name to access name of predecessor
