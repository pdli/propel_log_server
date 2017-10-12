/**
 * Created by pengl on 6/26/2017.
 */


exports.display_logs = function (req, res) {

    var list =  getImagesList( './'+ req.images );

    res.render('propel_log_template', { 'path':  req.images , 'images': list});
}



var getImagesList = function( str ) {

    const dir = str;
    const fs = require('fs');

    var imagesList = [];

    fs.readdirSync( dir ).forEach(file => {

        var fileName = file.toLowerCase();

        if( fileName.endsWith('.png')) {
            imagesList.push( file );
        }
        //console.log(file);
    });

    imagesList.sort( function (a, b) {

        return fs.statSync( dir + b).mtime.getTime() - fs.statSync(dir + a).mtime.getTime();
    });

    return imagesList;
};
