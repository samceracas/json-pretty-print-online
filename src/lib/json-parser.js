var jsonlint = require("jsonlint-mod");
var beautify = require("json-beautify");
var jsonMarkup = require('json-markup')
var escape = require('escape-html');


var JSONParser = {
    parseAndBeautify: function(json) {
        try {
            let parsed = jsonlint.parse(json);
            return {
                success: true,
                rawOutput: beautify(parsed, null, 3),
                htmlOutput: jsonMarkup(parsed)
            }
        } catch(e) {
            return {
                success: false,
                rawOutput: e.message,
                htmlOutput: escape(e.message)
            }
        }
    },

    isValidJSON: function(json) {
        try {
            jsonlint.parse(json);
            return true;
        } catch(e) {
        }
        return false;
    }
};

export default JSONParser;