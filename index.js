var fs = require('fs'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();

var arguments = process.argv;

var lineReader = require('readline').createInterface({
  input: fs.createReadStream('en.txt')
});

var lines = [];

lineReader.on('line', function (line) {
  lines.push(line);
  console.log(lines.length);
});


lineReader.on('close', function() {
  console.log('procitao sve!')
})



function jsToXml(jsObject) {
  var builder = new xml2js.Builder();
  var xml = builder.buildObject(jsObject);
  fs.writeFile(__dirname + '/en-updated.xliff', xml, function(err, result) {
    if (err) {
      console.log('nisi pazio :D');
      console.log(err);
    } else {
      console.log('checkout your file');
    }      
  });
}

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
              // make this more modular
              console.log(  translationUnit[keys[0]].id +
                            '| ' +
                            translationUnit[keys[1]] +
                            '| ' +
                            translationUnit[keys[2]]);
              translationUnit[keys[1]] = "Prevod";
              translationUnit[keys[2]] = "Description";

            });
          }
        }
      });
    }
  })
  console.log("____________====================____________");
  jsToXml(object);
}
// fs.readFile(__dirname + '/en.xliff', function(err, data) {  
//     parser.parseString(data, function (err, xmlObject) {
//       processObject(xmlObject);
//     });
// });
