<?php
	/**
	 * The base configurations for {package-name}
	 *
	 * @package {package-name}
	 */

	/* DB connection informations */
	/** - the hostname - */
	define('DB_HOST', 'localhost');
	//define('DB_HOST', 'rdbms.strato.de');

	/** - the username - user for the MySQL DB **/
	define('DB_USER', 'root');
	//define('DB_USER', 'U1121417');

	/** - the password - passwrd for the MySQL DB **/
	define('DB_PASSWORD', 'root');
	//define('DB_PASSWORD', 'bommel');

	/** - the database - the name of the DB for {package-name} **/
	define('DB_DATABASE', 'numb3rs');
	//define('DB_DATABASE', 'DB1121417');

	/* prefix for the DB */
	define('DB_PREFIX', 'n');

	/* default language */
	define('LANG', 'de');

	/* debug mode (sends error msg to js console) */
	define('DEBUG', true);
	
	// Stop editing here! //

	/* init all components */
	//include('loader.php');
	
?>