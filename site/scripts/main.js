/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {


	// get values from local storage
var stored_name = localStorage.getItem('stored_name');
var stored_phone = localStorage.getItem('stored_phone');

// populate cached data
if (stored_name != null && stored_phone != null) {
    $('body h2').remove();
    $('h1').text(stored_name + ' מזמין אתכם לקבל הנחה, אנא מלאו את הטופס');
    $('input[name=stored_name]').val(stored_name);
    $('input[name=stored_phone]').val(stored_phone);

} else {
    // no data was found, on submit cache data
    $('form')
    .off('submit')
    .submit(function(event) {
        // prevent form submission
        event.preventDefault();

        // get form values to store
        var name = $('input[name="name"]').val();
        var phone = $('input[name="phone"]').val();

        // make sure we have something to cache
        if (name == "" || phone == "")
            return;

        localStorage.setItem('stored_name', name);
        localStorage.setItem('stored_phone', phone);

        // refresh the page after storing data
        window.location.reload();
    });
}


};


// connect document `load` event with handler function
$(Site.on_load);
