<?php
	class core {
		// properties
		protected $connection;
		public $grid;
		public $error;
		
		function __construct() {
			// database connection
			$this -> connection = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE);

			if($this -> connection -> connect_errno > 0) {
				$this -> message('error', '10', 'Connect failed: '.$this -> connection -> connect_error);
				die();
			}

			$this -> grid = new grid();


			// get version of {package-name} (from DB)
			/*if($result = $this -> connection -> query("SELECT * FROM ".DB_PREFIX."_credits WHERE name = 'version'")) {
				while ($output = $result->fetch_assoc()) {
					$this -> version = $output['value'];
				}
			}*/

			// set language
			/*if($this -> backend) {
				$this -> lang = "TEST";
			} else {
				if(is_null($_GET['lang'])) {
					$this -> lang = LANG;
				} else {
					$this -> lang = $_GET['lang'];
				}
			}*/

			// credits
			echo $this->console('info', 'Copyright 2014 Pascal Iske');
			//echo $this->console('info', 'Version: '.$this -> version);

		}

		// feedback message
		function message($type='info', $code='-', $msg='') {
			switch ($type) {
				case 'info':
					$this -> error = $msg;
					echo (DEBUG) ? $this->console('info', $msg) : '';
				break;
				case 'success':
					$this -> error = $msg;
					echo (DEBUG) ? $this->console('info', $msg) : '';
				break;

				case 'error':
					$this -> error = $msg;
					echo (DEBUG) ? $this->console('error', '(ERROR '.$code.') '.$msg) : '';
				break;
				
				default:
					$this -> error = $msg;
					echo (DEBUG) ? $this->console('info', $msg) : '';
				break;
			}
		}
		
		// debug function
		function console($type, $msg) {
			switch ($type) {
				case 'error':
					return '<script>console.error("'.$msg.'");</script>'; // red error msg
				break;
				case 'default':
					return '<script>console.log("'.$msg.'");</script>'; // default msg
				break;
				case 'warn':
					return '<script>console.warn("'.$msg.'");</script>'; // yellow warn msg
				break;
				case 'info':
					return '<script>console.info("'.$msg.'");</script>'; // yellow warn msg
				break;
				default:
					return '<script>console.log("'.$msg.'");</script>'; // default msg
				break;
			}
		}
	}
?>