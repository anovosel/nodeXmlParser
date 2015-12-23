var fs = require('fs'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();

var arguments = process.argv;

function processObject(object) {
  var files = object.xliff.file;

  files.forEach(function(file){
    if (file.body !== undefined) {
      file.body.forEach(function(transUnit){
        if (Object.keys(transUnit) !== undefined) {
          translationUnits = transUnit[Object.keys(transUnit)[0]];
          if (translationUnits !== undefined) {
            translationUnits.forEach(function(translationUnit){
              var keys = Object.keys(translationUnit);
              // console.log(translationUnit);
              console.log(  translationUnit[keys[0]].id +
                            ', ' +
                            translationUnit[keys[1]] +
                            ', ' +
                            translationUnit[keys[2]]);
            });
          }
        }
      });
    }
  });
}

fs.readFile(__dirname + '/en.xliff', function(err, data) {
    parser.parseString(data, function (err, result) {
	processObject(result);
    });
});
