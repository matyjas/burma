/**
 * List functions to be exported from the design doc.
 */

var templates = require('duality/templates'),
	fields = require('couchtypes/fields'),
	Form = require('couchtypes/forms').Form;

exports.photos = function(head, req) {

    provides("html", function(){

        var row;

        while(row = getRow()){

            send('<p><img src="' + row.value + '"/></p>');
        }
       });
};