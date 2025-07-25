const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
	// Order matters, put this at the top of your configuration file.
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("./public/en/blog/");
  eleventyConfig.addFilter("readableDate", (dateObj, format = "d LLLL, yyyy") => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(format);
  });
  eleventyConfig.addFilter("htmlDate", (dateObj, format = "dd-LL-yyyy") => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(format);
  });
};