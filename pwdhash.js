/*
 * Remote PwdHash
 * A JavaScript implementation of the PwdHash hashing algorithm.
 * Version 1.0 Copyright (C) Stanford University 2004-2006
 * Author: Collin Jackson
 * Other Contributors: Dan Boneh, John Mitchell, Nick Miyake, and Blake Ross
 * Bcrypt & jQuery adaptation: Daniel Hjort
 * Distributed under the BSD License
 * See http://crypto.stanford.edu/PwdHash for more info.
 * Requires the Javascript bCrypt implementation from https://code.google.com/p/javascript-bcrypt/
 */


var SPH_kPasswordPrefix = "##";

/*
 * Initialize page with default hashing parameters.
 */
function initPage() {
	$j("#domain").val("http://www.example.com/");
	$j("#rounds").val(12);
	$j("#hash").val("Waiting for Bcrypt");
}

/*
 * Obtain the conforming hashed password and put it in the hashed password field
 */
function generateCallback(hash, salt)
{
	$j("#hash").val(hash);
	$j("#salt").val(salt);
	$j("#hash").removeAttr("disabled");
	$j("#submit").removeAttr("disabled");
}

/*
 * Call for a conforming hashed password generated from the form's field values.
 */
function generate()
{
	$j("#submit").attr("true", "disabled");
	var uri = $j("#domain").val();
	var rounds = $j("#rounds").val();
	var salt = $j("#salt").val();
	var domain = (new SPH_DomainExtractor()).extractDomain(uri);
	var size = SPH_kPasswordPrefix.length;
	var password = $j("#password").val();
	if (password.substring(0, size) == SPH_kPasswordPrefix)
		password = password.substring(size);
	SPH_HashedPassword(password, domain, salt, rounds, bcrypt, generateCallback);
}

/*
 * Enable generate button when Bcrypt is available.
 */
var interval;
var bcrypt;
function enable(){
	if(bcrypt.ready()){
		$j("#submit").removeAttr("disabled");
		$j("#submit").attr("value","Generate");
		$j("#hash").val("Press Generate");
		clearInterval(interval);
	}
}
