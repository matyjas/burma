/**
 * Rewrite settings to be exported from the design doc
 */

module.exports = [
    {from: '/static/*', to: 'static/*'},
    {from: '/', to: '_show/my_form'},
    {from: '*', to: '_show/not_found'},
    {from: '/photos', to:'_list/photos/photos'},
    {from: '/submit', to:'_show/my_form'}
];
