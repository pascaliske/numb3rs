(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'hammerjs'], factory);
	} else if (typeof exports === 'object') {
		factory(require('jquery'), require('hammerjs'));
	} else {
		factory(jQuery, Hammer);
	}
}(function($, Hammer) {
	function hammerify(el, options) {
		var $el = $(el);
		if(!$el.data("hammer")) {
			$el.data("hammer", new Hammer($el[0], options));
		}
	}

	$.fn.hammer = function(options) {
		return this.each(function() {
			hammerify(this, options);
		});
	};

	// extend the emit method to also trigger jQuery events
	Hammer.Manager.prototype.emit = (function(originalEmit) {
		return function(type, data) {
			originalEmit.call(this, type, data);
			$(this.element).trigger({
				type: type,
				gesture: data
			});
		};
	})(Hammer.Manager.prototype.emit);
}));
(function ($, window, undefined) {
	$.fn.numb3rs = function(settings) {
		// global vars
		var startSquare = null;
		var number = 1;
		var lastSquare;
		var row = '';
		var square;
		var placeInRow;

		// click events
		/* $('.square', this).on('click', function() {
			triggerClick($(this));
		}); */

		$('#hint').on('click', function() {
			hint(square);
		});
		
		// touch events
		/*$('.square').hammer().bind('tap', function(event) {
			triggerClick($(this));
		});*/

		/*$('.square').on('touchstart', function(event) {
		   triggerClick($(this));
		});*/

		$('.square').click(function(){
			if(!isEvent){
			  isEvent = true;
			  triggerClick($(this));
			}
			setTimeout(function(){
				isEvent = false;
			}, 50); // time in ms should be set according to your needs
		});

		// main methods
		function triggerClick(el) {
			// DEBUG
			log('-------- debug --------');

			// reset all hints
			resetHints();

			// call position in grid
			row = el.parent('.row').attr('id');
			actualSquare = el.attr('id');
			actualRow = getRowOfSquare(actualSquare);
			actualPlace = getPlaceInRow(actualSquare);

			// DEBUG
			log('row: '+actualRow);
			log('place in row: '+actualPlace);

			// check if start square is set
			if(startSquare === null) {
				// set start square
				setStart(actualSquare);
				setSquare(actualSquare);

				// DEBUG
				log('actual square:');
				log('row: '+row+', square: '+actualSquare+' (start-square)');
			} else {
				// checks if clicked square is correct
				if(correctSquare(actualSquare)) {
					// sets clicked square
					setSquare(actualSquare);
					
					// DEBUG
					log('actual square:');
					log('row: '+row+', square: '+actualSquare+' (next-square)');
				} else {
					// set hints to last square
					hint(lastSquare);
					error('Error! This square is in the wrong place!');
				}
			}

			// DEBUG
			log('------ end debug ------');
		}

		function setStart(actualSquare) {
			startSquare = actualSquare;
			$('#grid #'+actualSquare).addClass('start');
		}

		function setSquare(actualSquare) {
			// check if already filled
			if(!$('#grid #'+actualSquare).hasClass('filled')) {
				// not filled
				hint(actualSquare);
				$('#grid #'+actualSquare).html(number);
				$('#grid #'+actualSquare).addClass('filled').attr('data-value', number);
				lastSquare = actualSquare;
				number++;
			} else {
				// filled
				hint(lastSquare);
				error("Sorry! Number can't be changed! ("+row+"s"+actualSquare+")");
			}
		}

		function correctSquare(square) {
			if(startSquare !== square) {
				var actualPlace = getPlaceInRow(square);
				var actualRow = getRowOfSquare(square);
				var lastPlace = getPlaceInRow(lastSquare);
				var lastRow = getRowOfSquare(lastSquare);


				if(actualRow === parseInt(lastRow - 3) && actualPlace === lastPlace) { // vertikal - oben
					return true;
				} else if(actualRow === parseInt(lastRow + 3) && actualPlace === lastPlace) { // vertikal - unten
					return true;
				} else if(actualRow === lastRow && actualPlace === parseInt(lastPlace - 3)) { // horizontal - oben
					return true;
				} else if(actualRow === lastRow && actualPlace === parseInt(lastPlace + 3)) { // horizontal - unten
					return true;
				} else if(actualRow === parseInt(lastRow - 2) && actualPlace === parseInt(lastPlace - 2)) { // diagonal - oben - links
					return true;
				} else if(actualRow === parseInt(lastRow - 2) && actualPlace === parseInt(lastPlace + 2)) { // diagonal - oben - links
					return true;
				} else if(actualRow === parseInt(lastRow + 2) && actualPlace === parseInt(lastPlace - 2)) { // diagonal - unten - links
					return true;
				} else if(actualRow === parseInt(lastRow + 2) && actualPlace === parseInt(lastPlace + 2)) { // diagonal - unten - links
					return true;
				} else {
					return false;
				}
			} else {
				return true;
			}
		}

		function hint(square) {
			if(startSquare !== null) {
				var actualPlace = getPlaceInRow(square);
				var actualRow = getRowOfSquare(square);
				var lastPlace = getPlaceInRow(lastSquare);
				var lastRow = getRowOfSquare(lastSquare);

				var correctSquares = new Array(
					parseInt(lastRow - 3),
					parseInt(lastRow + 3),
					
					actualRow === toString(lastRow + actualPlace === parseInt(lastPlace - 3)),
					actualRow === toString(lastRow + actualPlace === parseInt(lastPlace + 3)),
					actualRow === toString(parseInt(lastRow - 2) + actualPlace === parseInt(lastPlace - 2)),
					actualRow === toString(parseInt(lastRow - 2) + actualPlace === parseInt(lastPlace + 2)),
					actualRow === toString(parseInt(lastRow + 2) + actualPlace === parseInt(lastPlace - 2)),
					actualRow === toString(parseInt(lastRow + 2) + actualPlace === parseInt(lastPlace + 2))
				);
				log('correct squares:');
				for (var i = 0; i < correctSquares.length; i++) {
					if(!$(correctSquares[i]).hasClass('filled')) {
						log(i+' '+correctSquares[i]);
						$('#grid #'+correctSquares[i]).addClass('hint');
					}
				};
			} else {
				error('No square selected - Please select the start square!');
			}
		}

		function resetHints() {
			$('td').each(function() {
				if($(this).hasClass('hint')) {
					$(this).removeClass('hint');
				}
			});
		}

		function getRowOfSquare(inputSquare) {
			split = (inputSquare+'').split('');
			var output = parseInt(split[0]);
			return output;
		}

		function getPlaceInRow(inputSquare) {
			split = (inputSquare+'').split('');
			var output = parseInt(split[1]);
			return output;
		}

		function error(m) {
			if(settings.debug) {
				console.error(m);
			}
			alert(m);
		}

		// ------------------- MSG ------------------- //
		function log(m) {
			console.log(m);
		}
	};

	$.fn.numb3rs.defaults = {
		// debug methods
		debug: false,
		//play on startup
		autoplay: true,
		//continious play
		loop: true,
		//play backwards,
		backwards: false
	};
})(jQuery);
