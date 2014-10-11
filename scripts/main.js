(function ($, window, undefined) {
	$.fn.numb3rs = function(settings) {
		// global vars
		var isEvent = false;
		var startSquare = null;
		var number = 1;
		var highscore = 0;
		var squareHistory = new Array();
		var lastSquare;
		var row = '';
		var square;
		var placeInRow;
		var undoCount = 0;

		var timer = $('#timer').FlipClock({
			clockFace: 'MinuteCounter',
			autoStart: false
		});

		// click events
	/*	$('.square', this).on('click', function() {
			triggerClick($(this));
		}); 
		$('.square', this).hammer().on('tap', function(){
 			triggerClick($(this));
		});*/
		$('.square').click( function(){
			triggerClick($(this));
		});

		$('#hint').on('click', function() {
			hint(square);
		});

		$('#reset').on('click', function() {
			if(confirm('Do you really want to reset this game?')) {
				resetGame();	
			}
		});

		$('#undo').on('click', function() {
			undoAction();
		});

		$('#redo').on('click', function() {
			var actualIndex = squareHistory.indexOf(actualSquare);

			if(actualIndex === parseInt(squareHistory.length-1)) {
				error('nicht möglich!');
			} else {
				alert('redo active');
				//redoAction();
			}
		});

		// main methods
		function triggerClick(el) {
			// DEBUG
			if(settings.debug) {
				log('-------- debug --------');
				log('number: '+number);
			}

			// reset all hints
			resetHints();

			// call position in grid
			row = el.parent('.row').attr('id');
			actualSquare = el.attr('id');
			actualRow = getRowOfSquare(actualSquare);
			actualPlace = getPlaceInRow(actualSquare);

			// check if start square is set
			if(startSquare === null) {
				// DEBUG
				if(settings.debug) {
					log('actualSquare: '+actualSquare+' (actualRow: '+actualRow+', actualRow: '+actualRow+' (start-square))');
				}
				// set start square
				setStart(actualSquare);
				setSquare(actualSquare);
				timer.start();
			} else {
				// checks if clicked square is correct
				if(correctSquare(actualSquare)) {
					// DEBUG
					if(settings.debug) {
						log('actual square: '+actualSquare+' (row: '+actualRow+', place in row: '+actualRow+' (next-square))');
					}

					// sets clicked square
					setSquare(actualSquare);
				} else {
					// set hints to last square
					hint(lastSquare);
					error('Error! This square is in the wrong place!');
				}
			}

			// DEBUG
			if(settings.debug) {
				log('history:');
				for (var i = 0; i < squareHistory.length; i++) {
					log('-- '+squareHistory[i]);
				};
				log('number: '+number);
				log('------ end debug ------');
			}
		}

		function setStart(actualSquare) {
			startSquare = actualSquare;
			// fade in buttons
			$('#reset, #undo').removeClass('inactive');
			$('#grid #'+actualSquare).addClass('start');
		}

		function setSquare(actualSquare) {
			// check if already filled
			if(!$('#grid #'+actualSquare).hasClass('filled')) {
				// display hints for actual square
				hint(actualSquare);
				$('#grid #'+actualSquare).html(number);
				$('#grid #'+actualSquare).addClass('filled').attr('data-value', number);
				
				// write actual square to history and in a var
				squareHistory.push(actualSquare);
				lastSquare = actualSquare;
				
				// change counters
				changeCounter(number);
				changeHighscore(actualSquare);
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
					/*parseInt(actualRow - 3),
					parseInt(actualRow + 3),
					
					actualRow === toString(lastRow + actualPlace === parseInt(lastPlace - 3)),
					actualRow === toString(lastRow + actualPlace === parseInt(lastPlace + 3)),
					actualRow === toString(parseInt(lastRow - 2) + actualPlace === parseInt(lastPlace - 2)),
					actualRow === toString(parseInt(lastRow - 2) + actualPlace === parseInt(lastPlace + 2)),
					actualRow === toString(parseInt(lastRow + 2) + actualPlace === parseInt(lastPlace - 2)),
					actualRow === toString(parseInt(lastRow + 2) + actualPlace === parseInt(lastPlace + 2))*/
				);
				if(settings.debug) {
					log('correct squares:');
				}
				for (var i = 0; i < correctSquares.length; i++) {
					if(!$(correctSquares[i]).hasClass('filled')) {
						if(settings.debug) {
							log(i+' '+correctSquares[i]);
						}
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

		function undoAction() {
			var actualIndex = squareHistory.indexOf(actualSquare);
			if(undoCount < 2) {
				if(confirm('Do you really want to undo the last square?')) {
					// set counter
					number--;
					changeCounter(parseInt(number - 1));

					// set to last square
					$('#'+lastSquare).removeClass('filled').removeAttr('data-value').html('');
					lastSquare = squareHistory[parseInt(actualIndex - 1)];
					undoCount++;
				} else {
					// cancel undo action
					number++;
					log('(after) number: '+number);
				}
			} else {
				error("You have only two undo's per round!");
			}
		}

		//------- has errors!
		function redoAction() {
			var actualIndex = squareHistory.indexOf(actualSquare);

			// set counter
			number++;
			changeCounter(parseInt(number + 1));

			// set to last square
			$('#'+lastSquare).removeClass('filled').removeAttr('data-value').html('');
			lastSquare = squareHistory[parseInt(actualIndex - 1)];
		} //----- has errors!

		function resetGame() {
			// reset all vars
			startSquare = null;
			lastSquare = undefined;
			highscore = 0;
			undoCount = 0;
			number = 1;
			squareHistory = new Array();

			timer.stop();
			timer.setTime(0);

			// reset counter
			$('#header .display, #header .score').html('0');

			// reset grid
			$('td').each(function() {
				$(this).removeClass('filled');
				$(this).removeClass('hint');
				$(this).removeClass('start');
				$(this).removeAttr('data-value');
				$(this).html('');
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

		function changeCounter(n) {
			// change counter
			$('#header .display').html(n);
		}

		function changeHighscore(squareNumber) {
			if(parseInt(squareNumber % 2) === 0) {
				highscore = parseInt(highscore + 20);
			} else {
				highscore = parseInt(highscore + 15);
			}
			$('#header .score').html(highscore);
		}

		function error(m) {
			if(settings.debug) {
				console.error(m);
			}
			alert(m);
		}

		function log(m) {
			// push msg to console
			console.log(m);
		}
	};

	$.fn.numb3rs.defaults = {
		// debug methods
		debug: false
	};
})(jQuery);
