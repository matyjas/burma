/**
 * Update functions to be exported from the design doc.
 */


var templates = require('duality/templates'),
	fields = require('couchtypes/fields'),
	Form = require('couchtypes/forms').Form;

exports.update_my_form = function (doc, req) {
    var form = new Form({photo_url: fields.string()});
    form.validate(req);

    /**
     * We do that because we are not using CouchType
     * CouchType takes care of generating a uuid
     */
    form.values._id = req.uuid;

    if (form.isValid()) {
        return [form.values, {content: '<img src="' + form.values.photo_url + '"/>', title: 'Result'}];
    }
    else {
	// code duplication, just sent them back to the original form
        var content = templates.render('form.html', req, {
            form_title: 'My Form',
	    method: 'POST',
	    action: '../_update/update_my_form',
            form: form.toHTML(req),
	    input: 'Submit'
        });
        return [null, {content: content, title: 'My First Form'}];
    }
};
