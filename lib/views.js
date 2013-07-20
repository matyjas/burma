/**
 * Views to be exported from the design doc.
 */

exports.photos = {
    map: function (doc) {
        emit(doc.photo_url, doc.photo_url);
    }
};

/**
exports.photos_by_created = {
    
    map: function (doc) {
        
        if (doc.type === 'photo_url') {
            
            emit(doc.created, doc.url);
        }
    }
};
*/
