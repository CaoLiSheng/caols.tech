const opentype = require('opentype.js');

export default function(fileInput, callback) {
  return function(e) {
    [].forEach.call(fileInput.files, function(file) {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        function(event) {
          callback(opentype.parse(event.target.result));
        },
        false
      );
      reader.readAsArrayBuffer(file);
    });
  };
}
