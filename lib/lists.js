/**
 * List functions to be exported from the design doc.
 */

var templates = require('duality/templates'),
	fields = require('couchtypes/fields'),
	Form = require('couchtypes/forms').Form;

exports.photos = function(head, req) {

    start({code: 200, headers: {'Content-Type': 'text/html'}});

    var photos = [];
    var row;

    while(row = getRow()){

        photos.push({"url": row.value});

    }
    return {
        title: 'Photo Contest for Friends of the Children of Myanmar',
        content: templates.render('photos.html', req, 
                                  {"photos": photos})
    };
};