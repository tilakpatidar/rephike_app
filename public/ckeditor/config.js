/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config
	  /* Filebrowser routes */
	  // The location of an external file browser, that should be launched when "Browse Server" button is pressed.
	  //config.filebrowserBrowseUrl = "/ckeditor/attachment_files";

	  // The location of an external file browser, that should be launched when "Browse Server" button is pressed in the Flash dialog.
	  //config.filebrowserFlashBrowseUrl = "/ckeditor/attachment_files";

	  // The location of a script that handles file uploads in the Flash dialog.
	  config.filebrowserFlashUploadUrl = "/ckeditor/attachment_files";

	  // The location of an external file browser, that should be launched when "Browse Server" button is pressed in the Link tab of Image dialog.
	  //config.filebrowserImageBrowseLinkUrl = "/ckeditor/pictures";

	  // The location of an external file browser, that should be launched when "Browse Server" button is pressed in the Image dialog.
	  //config.filebrowserImageBrowseUrl = "/ckeditor/pictures";

	  // The location of a script that handles file uploads in the Image dialog.
	  config.filebrowserImageUploadUrl = "/ckeditor/pictures";

	  // The location of a script that handles file uploads.
	  config.filebrowserUploadUrl = "/ckeditor/attachment_files";

	  config.allowedContent = true;
	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'about' }
	];
	config.toolbar_mini = [
    ["Bold",  "Italic",  "Underline",  "Strike",  "-",  "Subscript",  "Superscript", "-", "NumberedList", "BulletedList", "-", 'Outdent', 'Indent',  "-", "Link", "Unlink", "-", "Spell Checker", "-","Maximize", "Source", "Youtube", "Image", "-", "Mathjax", "mathjax"],
  ];
	config.toolbar_mcq = [
    ["Bold",  "Italic",  "Underline",  "Strike",  "-",  "Subscript",  "Superscript", "-", 'Outdent', 'Indent',  "-", "Link", "Unlink", "-", "Spell Checker", "-","Maximize", "Source", "Image", "-", "Mathjax", "mathjax"],
  ];
	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';
	config.extraPlugins = 'youtube,uploadimage,image,mathjax';
	config.mathJaxLib =  'http://cdn.mathjax.org/mathjax/2.6-latest/MathJax.js?config=TeX-AMS_HTML';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';

	  config.toolbar = [{ name: 'insert', items: ['Image', 'Youtube', 'mathjax', "Mathjax", "Math"]}];
	  config.youtube_width = '100%';
	  config.youtube_height = '100%';
};
