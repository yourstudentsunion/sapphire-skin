/*
 * Core Sapphire Javascript File
 * 
 * @version		1
 * @description	Core Site JS file for UGSU		
 * @author 		James Williams (@James_RWilliams)
 * @copyright 	Copyright (c) 2016 UGSU
 *
 */
 
 
 
/**
 *	Basket Highlight Logic
 * 
 */
 
function basketCount(){
	
	var productcount = $('#ctl00_basket_pnlBasket dt').length;
	
	if( productcount > 0 ){
		
		$('.basket_dropdown > a, .mobile-only-basket-ui > a').append(" (" + productcount + ")");
		
	}
	
}

/**
 *	Handle The Visibility Change
 * 
 */		
 
var hidden, visibilityChange; 
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
  hidden = "mozHidden";
  visibilityChange = "mozvisibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

/**
 *	
 * 
 */		

function handleVisibilityChange() {
  if (document[hidden]) {
    Clock.pause();
  } else {
    Clock.resume();
  }
}

/**
 *	JS Clock Object
 *
 *	Controlls the sldier elements and pauses using the Page Visibility API
 *	when page is idle.
 * 
 */		

var slideSpeed = 8000;

var Clock = {
		
	totalSeconds: 0,

	start: function () {

		var self = this;

		this.interval = setInterval(function () {
		self.totalSeconds += 1;

		$('.main_news_slider .news_1col > div:first')
		    .fadeOut(1000)
		    .next()
		    .fadeIn(1000)
		    .end()
		    .appendTo('.main_news_slider .news_1col');
		
		
		
	}, slideSpeed);

	},

	pause: function () {

		clearInterval(this.interval);
		delete this.interval;

	},

	resume: function () {

		if (!this.interval) this.start();

	}

};

/**
 *	Konami Fun
 * 
 */
 
var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";

$(document).keydown(function(e) {

  kkeys.push( e.keyCode );

  if ( kkeys.toString().indexOf( konami ) >= 0 ) {

    $(document).unbind('keydown',arguments.callee);
    
    // do something awesome
    $("body").addClass("konami");
    
    $("body").prepend('<iframe id="somethingsomethingdarkside" width="420" height="315" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&autoplay=1&controls=0" frameborder="0" allowfullscreen></iframe>');
  
  }

});

/**
 *	Sort Sorts Clubs
 *
 *	Wraps each pair output from the MSL orginiaiton list 
 *	object in a parent <li> element for easy styling. Also
 *	adds Foundation 5 classes for the grid system.
 * 
 */		

function sortSportsClubs(){
	
	var divs = $(".club_list .msl_organisation_list li");
    	
    for(var i = 0; i < divs.length; i+=2) {
		
		divs.slice(i, i+2).wrapAll("<li class='club_listing large-3 medium-6 small-6 column'></li>");
    	
    }
	
}

/**
 *	
 * 
 */		

function isEmpty( el ){
	
	return !$.trim(el.html())

}
  

/**
 *	Rearrange Naviagation	
 *
 *	Following three lines reogansiae the account dropdown, 
 *	removing redundant plain text and separates options 
 *	into list elements
 * 
 */	

function sortNavigation(){
	
	$("sidepanel ul li:nth-child(1)").after("<li><a href='/profile/'>Profile</a></li>");
	$("sidepanel ul").prepend("<li><a href='/account/' class='msl_person'>Account</a></li>");
	$("#ctl00_usercontrolpanel_liAccount").remove();
	
	
}

/**
 *	Reorders the Skins CSS Imports in the <HEAD>
 *
 *	Moves the skin stylesheet to the bototm of the <HEAD> to allow easy 
 *	overrides of MSL defaults rather than using the css !important directive.
 * 
 */		

function reOrderCSSImports(){

	$("head").append($("link[href='/stylesheet/Sapphire/foundation-core.css']"));
	$("head").append($("link[href='/stylesheet/Sapphire/foundation.css']"));
	$("head").append($("link[href='/stylesheet/Sapphire/main.css']"));
	
}

/**
 *	Uitlity Function for easily setting back buttons
 * 
 */		

function goBack() {
	
    window.history.back();
}

 window.onload = function() { 
  
    // Delay to allow the async Google Ads to load
    setTimeout(function() { 
      
      // Get the first AdSense ad unit on the page
      var ad = document.querySelector("ins.adsbygoogle");
      
      // If the ads are not loaded, track the event
      if (ad && ad.innerHTML.replace(/\s/g, "").length === 0) {
 
        if (typeof ga !== 'undefined') {
 
            // Log an event in Universal Analytics
            // but without affecting overall bounce rate
            ga('send', 'event', 'Adblock', 'Yes', {'nonInteraction': 1});
            console.log("Adblock Is Active");
 
        } else if (typeof _gaq !== 'undefined') {
 
            // Log a non-interactive event in old Google Analytics
            _gaq.push(['_trackEvent', 'Adblock', 'Yes', undefined, undefined, true]);
             console.log("Adblock Is Active");
 
        }
      }
    }, 2000); // Run ad block detection 2 seconds after page load
  }; 

/**
 *	
 * 
 */		

function getTimeRemaining(endtime){
	  var t = Date.parse(endtime) - Date.parse(new Date());
	  var seconds = Math.floor( (t/1000) % 60 );
	  var minutes = Math.floor( (t/1000/60) % 60 );
	  var hours = Math.floor( (t/(1000*60*60)) % 24 );
	  var days = Math.floor( t/(1000*60*60*24) );
	  
	  var string = "Only " + days + " days to go until the new SU website is launched!";
	  
	  return string 
	
	}

/**
 *	Core Onload Function
 * 
 */		

$(document).ready(function(){
	
	console.time("JS"); // Start a Debug Timer for the execute time of all the JS.
	
	reOrderCSSImports();
	
	/*  Functions that apply to all site pages */
	
	
	$(document).foundation({
		"magellan-expedition": {
			active_class: 'active', // specify the class used for active sections
			threshold: 0, // how many pixels until the magellan bar sticks, 0 = auto
			destination_threshold: 125, // pixels from the top of destination for it to be considered active
			throttle_delay: 50, // calculation throttling to increase framerate
			fixed_top: 0, // top distance in pixels assigend to the fixed element on scroll
			offset_by_height: true // whether to offset the destination by the expedition height. Usually you want this to be true, unless your expedition is on the side.
		}
	}); // Init Foundation Components
	
	if($('.sidepanel.controlpanel').length > 0){
		
		$(".logged-out").hide();
	
	}else{
		
		$(".logged-in").hide();
	
	}
	
	sortNavigation();
	sortSportsClubs();
	
	if($("#skin_Sapphire").hasClass("page_feedback")){
		
		var element = $("msl-idea-status");
		var feedback_status = element.innerHTML;

		switch (feedback_status) {
		
			case "Current":
		        element.className += " alertbox";
					break;
		        
		    case "Passed":
		        
		      	element.className += " alertbox";
		        break;
		        
		   case "Rejected":
		       
		        element.className += " alertbox";
		        break;
		        
		   case "Locked":
		        
		        element.className += " alertbox";
		        break;
		
		}
		
	}

	basketCount();
	
	// Adds the Visibility Event Listener for the Orbit Slider
	document.addEventListener(visibilityChange, handleVisibilityChange, false); 
	
	$("iframe[src^='https://player.vimeo.com'], iframe[src^='https://www.youtube-nocookie.com'], iframe[src^='//www.youtube.com'], object, embed").wrap("<div class='flex-video'></div>");
	
	/* -----------------------------
	
			Page Conditional JS
	
	----------------------------- */
	
	/*
	
	if($('#skin_Sapphire.page_root').length > 0){
		
		$(".main_news_slider .news_1col > div:gt(0)").hide();
		$(".main_news_slider .news_1col .killfloat").remove();
		$(".main_news_slider .news_1col .news_all").remove();
		
		Clock.start();
		
	} */
	
	$(".main_news_slider .news_1col > div:gt(0)").hide();
	$(".main_news_slider .news_1col .killfloat").remove();
	$(".main_news_slider .news_1col .news_all").remove();
		
	Clock.start();
	
	if($('#skin_Sapphire.page_full-time-officers').length > 0){
		
		/* Find and Remove empty p.leaders in the news_list */
		
		$(".news_item").each(function(){
			
			if( $(this).find('p.leader').is(':empty') ) {
		
				$(this).find('p.leader').remove();
			
			}	
			
		});
		
		/* Add reveal interaction to items */
		
		$(".news_item").click(function(){
			
			$(this).find("p.leader").slideToggle();
			
		});
		
	}
	
	if($("#skin_Sapphire.page_jobs").length > 0){
	
		if ($('#job-signup input[checked=checked]').length) {
			$('.vacancy').show();
			$('#job-signup').hide();
		}
		else {
			$('.vacancy').remove();
		}
		
	}
	
	if($("#skin_Sapphire.page_student-reps.page_course").length > 0){
		
		$.getScript("https://cdn.datatables.net/1.10.10/js/jquery.dataTables.min.js", function(){
			
			$('.tableizer-table').DataTable();
			
		});
		
		
	}
	
	if ($('#skin_Sapphire').length > 0) {
		
		console.log("Product on Page");
        
    	$(".msl-product-image").each(function() {

            var oldURL = this.src; 
            
            var index = 0;
            var newURL = oldURL;
            index = oldURL.indexOf('?');
            
            if(index === -1){
	            
	            index = oldURL.indexOf('#');
	            
            }
            if(index !== -1){
	            
	            newURL = oldURL.substring(0, index);
	            
            }
                  
            $(this).attr("src", newURL);
            $(this).attr('style', '');

        });  
	}
	
	if($('#skin_Sapphire.page_whatson, #skin_Sapphire.page_events').length > 0){
		
		console.log("Whats on Page");
		
		var tags = [];
		var active_tags = [];
			
		$(".event_item").each(function(event_index){
			
			var tagString = "";
			
			$(this).find(".msl_event_types a").each(function(types_index){
				
				var value = $( this ).text();
				
				tagString = tagString + value + ", ";
				
				if($.inArray(value, tags) === -1){ tags.push(value); }
				
			});
			
		});
		
		// For each item in the Tag array add it as a searchable tag in the cloud.
		$.each(tags, function( index, value ) { $(".search_options ul").append("<li>" + value + "</li>"); });
		
		$(".search_options li").click(function(){
			
			if($(this).hasClass("active")){
				
				// Remove from Array
				
				var remove_value = $(this).text();
				
				$(this).removeClass("active");
				
				active_tags = $.grep(active_tags, function(value){
				
					return value !== remove_value;
					
				});
				
			}else{
				
				// Add to Array
				
				$(this).addClass("active");
				
				var add_value = $(this).text();
				
				if($.inArray(add_value, active_tags) === -1){ active_tags.push(add_value); }
				
			}
			
			if($(".search_options li").hasClass("active")){
				
				$(".event_item").hide();
				
				// Show events that match current_tags array
				
				$(".event_item").each(function(event_index){
					
					var tag_match = false;
					
					$(this).find(".msl_event_types a").each(function(){
				
						if($.inArray($( this ).text(), active_tags) > -1){ tag_match = true; }
				
					});
					
					// If there is a tag match show the event
					if(tag_match === true){ $(this).show(); }
					
				});
				
			} else{
				
				$(".event_item").show();
				
			}
			
		});
		
	}
	
	$(".small-toggle").click(function(){ $(".mobile_toggle").toggleClass("show-for-large-up"); });
	
	// DEBUG SCRIPTS
	
	//* Testing
	

	
	/* */
	
	// END DEBUG SCRIPTS
	
	/* ----------------------------- */
	
	console.timeEnd("JS");
	
});