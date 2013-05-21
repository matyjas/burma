/**
 * Show functions to be exported from the design doc.
 */

var templates = require('duality/templates'),
	fields = require('couchtypes/fields'),
	Form = require('couchtypes/forms').Form;


exports.welcome = function (doc, req) {
    return {
        title: 'It worked!',
        content: templates.render('welcome.html', req, {})
    };
};

exports.not_found = function (doc, req) {
    return {
        title: '404 - Not Found',
        content: templates.render('404.html', req, {})
    };
};

exports.my_form = function (doc, req) {
	var myForm = new Form ({photo_url: fields.string()});
	return {
	  title : 'Submit a Photo',
	  content: templates.render('form.html', req, {
			form_title : 'Submit a Photo',
			method : 'POST',
			action : '../_update/update_my_form',
			form : myForm.toHTML(req),
			button: 'Submit'})
	}
};

exports.my_form_content = function(doc, req) {
	return {
		title: 'Content of my Form',
		content: templates.render('base.html', req, {content : 'Photo URL : ' +  doc.photo_url }) 
	};
};

exports.index = function(doc, req) {
    return {
        title: 'FCM Photo Contest',
        content: templates.render('index.html', req, {})
    }
};