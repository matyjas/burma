/**
 * Kanso document types to export
 */
var Type = require('couchtypes/types').Type,
    fields = require('couchtypes/fields'),
    widgets = require('couchtypes/widgets');


exports.photo_url = new Type('photo_url', {
    fields: {
        created: fields.createdTime(),
        url: fields.string({
            widget: widgets.textarea({cols: 40, rows: 10})
        })
    }
});