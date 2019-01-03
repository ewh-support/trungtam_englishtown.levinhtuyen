function em_load_jquery_css(){if(EM.ui_css&&0==jQuery("link#jquery-ui-css").length){var e=document.createElement("link");e.id="jquery-ui-css",e.rel="stylesheet",e.href=EM.ui_css,document.body.appendChild(e)}}function em_setup_datepicker(e){e=jQuery(e);var t={altFormat:"yy-mm-dd",changeMonth:!0,changeYear:!0,firstDay:EM.firstDay,yearRange:"-100:+10"};EM.dateFormat&&(t.dateFormat=EM.dateFormat),EM.yearRange&&(t.yearRange=EM.yearRange),jQuery(document).triggerHandler("em_datepicker",t),dateDivs=e.find(".em-date-single, .em-date-range"),dateDivs.length>0&&(dateDivs.find("input.em-date-input-loc").each(function(e,a){var n=(a=jQuery(a)).nextAll("input.em-date-input").first(),o=n.val();if(a.datepicker(t),a.datepicker("option","altField",n),o){var i=jQuery.datepicker.formatDate(EM.dateFormat,jQuery.datepicker.parseDate("yy-mm-dd",o));a.val(i),n.val(o)}a.change(function(){""==jQuery(this).val()&&jQuery(this).nextAll(".em-date-input").first().val("")})}),dateDivs.filter(".em-date-range").find("input.em-date-input-loc").each(function(e,t){if((t=jQuery(t)).hasClass("em-date-start"))t.datepicker("option","onSelect",function(e){var t=jQuery(this),a=t.parents(".em-date-range").find(".em-date-end").first(),n=t.nextAll("input.em-date-input").first().val(),o=a.nextAll("input.em-date-input").first().val();n>o&&""!=o&&(a.datepicker("setDate",e),a.trigger("change")),a.datepicker("option","minDate",e)});else if(t.hasClass("em-date-end")){var a=t.parents(".em-date-range").find(".em-date-start").first();""!=a.val()&&t.datepicker("option","minDate",a.val())}}))}function em_setup_timepicker(e){e=jQuery(e);var t={show24Hours:1==EM.show24hours,step:15};jQuery(document).triggerHandler("em_timepicker_options",t),e.find(".em-time-input").timePicker(t),e.find(".em-time-range input.em-time-start").each(function(e,t){jQuery(t).data("oldTime",jQuery.timePicker(t).getTime())}).change(function(){var e=jQuery(this),t=e.nextAll(".em-time-end");if(t.val()){var a=e.data("oldTime"),n=jQuery.timePicker(t).getTime()-a,o=jQuery.timePicker(e).getTime();jQuery.timePicker(t).getTime()>=a&&jQuery.timePicker(t).setTime(new Date(new Date(o.getTime()+n))),e.data("oldTime",o)}}),e.find(".em-time-range input.em-time-end").change(function(){var e=jQuery(this),t=e.prevAll(".em-time-start");t.val()&&(jQuery.timePicker(t).getTime()>jQuery.timePicker(this).getTime()&&(0==jQuery(".em-date-end").val().length||jQuery(".em-date-start").val()==jQuery(".em-date-end").val())?e.addClass("error"):e.removeClass("error"))}),e.find(".em-time-range input.em-time-all-day").change(function(){var e=jQuery(this);e.is(":checked")?e.siblings(".em-time-input").css("background-color","#ccc"):e.siblings(".em-time-input").css("background-color","#fff")}).trigger("change")}jQuery(document).ready(function(e){var t=!1;if(e("#start-time").each(function(t,a){e(a).addClass("em-time-input em-time-start").next("#end-time").addClass("em-time-input em-time-end").parent().addClass("em-time-range")}),e(".em-time-input").length>0&&em_setup_timepicker("body"),e(".em-calendar-wrapper a").unbind("click"),e(".em-calendar-wrapper a").undelegate("click"),e(".em-calendar-wrapper").delegate("a.em-calnav, a.em-calnav","click",function(t){t.preventDefault(),e(this).closest(".em-calendar-wrapper").prepend('<div class="loading" id="em-loading"></div>');var a=em_ajaxify(e(this).attr("href"));e(this).closest(".em-calendar-wrapper").load(a,function(){e(this).trigger("em_calendar_load")})}),e(document).delegate(".em-toggle","click change",function(t){t.preventDefault();var a=e(this),n=a.attr("rel").split(":");a.hasClass("show-search")?(n.length>1?a.closest(n[1]).find(n[0]).slideUp():e(n[0]).slideUp(),a.find(".show, .show-advanced").show(),a.find(".hide, .hide-advanced").hide(),a.removeClass("show-search")):(n.length>1?a.closest(n[1]).find(n[0]).slideDown():e(n[0]).slideDown(),a.find(".show, .show-advanced").hide(),a.find(".hide, .hide-advanced").show(),a.addClass("show-search"))}),EM.search_term_placeholder&&("placeholder"in document.createElement("input")?e("input.em-events-search-text, input.em-search-text").attr("placeholder",EM.search_term_placeholder):e("input.em-events-search-text, input.em-search-text").blur(function(){""==this.value&&(this.value=EM.search_term_placeholder)}).focus(function(){this.value==EM.search_term_placeholder&&(this.value="")}).trigger("blur")),e(".em-search-form select[name=country]").change(function(){var t=e(this);if(e(".em-search select[name=state]").html('<option value="">'+EM.txt_loading+"</option>"),e(".em-search select[name=region]").html('<option value="">'+EM.txt_loading+"</option>"),e(".em-search select[name=town]").html('<option value="">'+EM.txt_loading+"</option>"),""!=t.val()){t.closest(".em-search-location").find(".em-search-location-meta").slideDown();var a={action:"search_states",country:t.val(),return_html:!0};e(".em-search select[name=state]").load(EM.ajaxurl,a),a.action="search_regions",e(".em-search select[name=region]").load(EM.ajaxurl,a),a.action="search_towns",e(".em-search select[name=town]").load(EM.ajaxurl,a)}else t.closest(".em-search-location").find(".em-search-location-meta").slideUp()}),e(".em-search-form select[name=region]").change(function(){e(".em-search select[name=state]").html('<option value="">'+EM.txt_loading+"</option>"),e(".em-search select[name=town]").html('<option value="">'+EM.txt_loading+"</option>");var t={action:"search_states",region:e(this).val(),country:e(".em-search-form select[name=country]").val(),return_html:!0};e(".em-search select[name=state]").load(EM.ajaxurl,t),t.action="search_towns",e(".em-search select[name=town]").load(EM.ajaxurl,t)}),e(".em-search-form select[name=state]").change(function(){e(".em-search select[name=town]").html('<option value="">'+EM.txt_loading+"</option>");var t={action:"search_towns",state:e(this).val(),region:e(".em-search-form select[name=region]").val(),country:e(".em-search-form select[name=country]").val(),return_html:!0};e(".em-search select[name=town]").load(EM.ajaxurl,t)}),e(document).delegate(".em-search-form, .em-events-search-form","submit",function(t){var a=e(this);this.em_search&&this.em_search.value==EM.txt_search&&(this.em_search.value="");var n=a.closest(".em-search-wrapper").find(".em-search-ajax");if(0==n.length&&(n=e(".em-search-ajax")),n.length>0){n.append('<div class="loading" id="em-loading"></div>');var o=a.find(".em-search-submit");o.data("buttonText",o.val()).val(EM.txt_searching);var i=o.children("img");i.length>0&&i.attr("src",i.attr("src").replace("search-mag.png","search-loading.gif"));var r=a.serialize();return e.ajax(EM.ajaxurl,{type:"POST",dataType:"html",data:r,success:function(s){o.val(o.data("buttonText")),i.length>0&&i.attr("src",i.attr("src").replace("search-loading.gif","search-mag.png")),n.replaceWith(s),""==a.find("input[name=em_search]").val()&&a.find("input[name=em_search]").val(EM.txt_search),0==(n=a.closest(".em-search-wrapper").find(".em-search-ajax")).length&&(n=e(".em-search-ajax")),jQuery(document).triggerHandler("em_search_ajax",[r,n,t])}}),t.preventDefault(),!1}}),e(".em-search-ajax").length>0&&e(document).delegate(".em-search-ajax a.page-numbers","click",function(t){var a=e(this),n=a.closest(".em-pagination").attr("data-em-ajax"),o=a.closest(".em-search-ajax"),i=o.parent(),r=a.attr("href").split("?")[1];return""!=n&&(r=""!=r?r+"&"+n:n),o.append('<div class="loading" id="em-loading"></div>'),e.ajax(EM.ajaxurl,{type:"POST",dataType:"html",data:r,success:function(e){o.replaceWith(e),o=i.find(".em-search-ajax"),jQuery(document).triggerHandler("em_search_ajax",[r,o,t])}}),t.preventDefault(),!1}),e(".events-table").on("click",".em-event-delete",function(){if(!confirm("Are you sure you want to delete?"))return!1;window.location.href=this.href}),e("#event-form #event-image-delete, #location-form #location-image-delete").on("click",function(){var t=e(this);t.is(":checked")?t.closest(".event-form-image, .location-form-image").find("#event-image-img, #location-image-img").hide():t.closest(".event-form-image, .location-form-image").find("#event-image-img, #location-image-img").show()}),e("#event-form.em-event-admin-recurring").submit(function(t){var a=e(this);if(1==a.find('input[name="event_reschedule"]').first().val())var n=EM.event_reschedule_warning;else if(1==a.find('input[name="event_recreate_tickets"]').first().val())n=EM.event_recurrence_bookings;else n=EM.event_recurrence_overwrite;confirmation=confirm(n),0==confirmation&&t.preventDefault()}),e(".em-reschedule-trigger").click(function(t){t.preventDefault();var a=e(this);a.closest(".em-recurrence-reschedule").find(a.data("target")).removeClass("reschedule-hidden"),a.siblings(".em-reschedule-value").val(1),a.addClass("reschedule-hidden").siblings("a").removeClass("reschedule-hidden")}),e(".em-reschedule-cancel").click(function(t){t.preventDefault();var a=e(this);a.closest(".em-recurrence-reschedule").find(a.data("target")).addClass("reschedule-hidden"),a.siblings(".em-reschedule-value").val(0),a.addClass("reschedule-hidden").siblings("a").removeClass("reschedule-hidden")}),e("#em-tickets-form").length>0){e("#event-rsvp").click(function(t){this.checked?e("#event-rsvp-options").fadeIn():(confirmation=confirm(EM.disable_bookings_warning),0==confirmation?t.preventDefault():e("#event-rsvp-options").hide())}),e("input#event-rsvp").is(":checked")?e("div#rsvp-data").fadeIn():e("div#rsvp-data").hide();var a=function(){e("#em-tickets-form table tbody tr.em-tickets-row").show(),e("#em-tickets-form table tbody tr.em-tickets-row-form").hide()};e("#em-recurrence-checkbox").length>0?e("#em-recurrence-checkbox").change(function(){e("#em-recurrence-checkbox").is(":checked")?(e("#em-tickets-form .ticket-dates-from-recurring, #em-tickets-form .ticket-dates-to-recurring, #event-rsvp-options .em-booking-date-recurring").show(),e("#em-tickets-form .ticket-dates-from-normal, #em-tickets-form .ticket-dates-to-normal, #event-rsvp-options .em-booking-date-normal, #em-tickets-form .hidden").hide()):(e("#em-tickets-form .ticket-dates-from-normal, #em-tickets-form .ticket-dates-to-normal, #event-rsvp-options .em-booking-date-normal").show(),e("#em-tickets-form .ticket-dates-from-recurring, #em-tickets-form .ticket-dates-to-recurring, #event-rsvp-options .em-booking-date-recurring, #em-tickets-form .hidden").hide())}).trigger("change"):e("#em-form-recurrence").length>0?(e("#em-tickets-form .ticket-dates-from-recurring, #em-tickets-form .ticket-dates-to-recurring, #event-rsvp-options .em-booking-date-recurring").show(),e("#em-tickets-form .ticket-dates-from-normal, #em-tickets-form .ticket-dates-to-normal, #event-rsvp-options .em-booking-date-normal, #em-tickets-form .hidden").hide()):e("#em-tickets-form .ticket-dates-from-recurring, #em-tickets-form .ticket-dates-to-recurring, #event-rsvp-options .em-booking-date-recurring, #em-tickets-form .hidden").hide(),e("#em-tickets-add").click(function(t){t.preventDefault(),a();var n=e("#em-tickets-form table tbody"),o=n.length+1,i=n.first().clone(!0).attr("id","em-ticket-"+o).appendTo(e("#em-tickets-form table"));i.find("*[name]").each(function(t,a){(a=e(a)).attr("name",a.attr("name").replace("em_tickets[0]","em_tickets["+o+"]"))}),i.show().find(".ticket-actions-edit").trigger("click"),i.find(".em-date-input-loc").datepicker("destroy").removeAttr("id"),i.find(".em-time-input").unbind().each(function(e,t){this.timePicker=!1}),em_setup_datepicker(i),em_setup_timepicker(i),e("html, body").animate({scrollTop:i.offset().top-30})}),e(document).delegate(".ticket-actions-edit","click",function(t){t.preventDefault(),a();var n=e(this).closest("tbody");return n.find("tr.em-tickets-row").hide(),n.find("tr.em-tickets-row-form").fadeIn(),!1}),e(document).delegate(".ticket-actions-edited","click",function(t){t.preventDefault();var a=e(this).closest("tbody"),n=a.attr("id").replace("em-ticket-","");return a.find(".em-tickets-row").fadeIn(),a.find(".em-tickets-row-form").hide(),a.find("*[name]").each(function(t,o){if("ticket_start_pub"==(o=e(o)).attr("name"))a.find("span.ticket_start").text(o.attr("value"));else if("ticket_end_pub"==o.attr("name"))a.find("span.ticket_end").text(o.attr("value"));else if(o.attr("name")=="em_tickets["+n+"][ticket_type]")"members"==o.find(":selected").val()&&a.find("span.ticket_name").prepend("* ");else if(o.attr("name")=="em_tickets["+n+"][ticket_start_recurring_days]"){var i="before"==a.find("select.ticket-dates-from-recurring-when").val()?"-"+o.attr("value"):o.attr("value");""!=o.attr("value")?(a.find("span.ticket_start_recurring_days").text(i),a.find("span.ticket_start_recurring_days_text, span.ticket_start_time").removeClass("hidden").show()):(a.find("span.ticket_start_recurring_days").text(" - "),a.find("span.ticket_start_recurring_days_text, span.ticket_start_time").removeClass("hidden").hide())}else if(o.attr("name")=="em_tickets["+n+"][ticket_end_recurring_days]"){i="before"==a.find("select.ticket-dates-to-recurring-when").val()?"-"+o.attr("value"):o.attr("value");""!=o.attr("value")?(a.find("span.ticket_end_recurring_days").text(i),a.find("span.ticket_end_recurring_days_text, span.ticket_end_time").removeClass("hidden").show()):(a.find("span.ticket_end_recurring_days").text(" - "),a.find("span.ticket_end_recurring_days_text, span.ticket_end_time").removeClass("hidden").hide())}else a.find("."+o.attr("name").replace("em_tickets["+n+"][","").replace("]","").replace("[]","")).text(o.attr("value"))}),e(document).triggerHandler("em_maps_tickets_edit",[a,n,!0]),e("html, body").animate({scrollTop:a.parent().offset().top-30}),!1}),e(document).delegate(".em-ticket-form select.ticket_type","change",function(t){var a=e(this);"members"==a.find("option:selected").val()?a.closest(".em-ticket-form").find(".ticket-roles").fadeIn():a.closest(".em-ticket-form").find(".ticket-roles").hide()}),e(document).delegate(".em-ticket-form .ticket-options-advanced","click",function(t){t.preventDefault();var a=e(this);a.hasClass("show")?(a.closest(".em-ticket-form").find(".em-ticket-form-advanced").fadeIn(),a.find(".show,.show-advanced").hide(),a.find(".hide,.hide-advanced").show()):(a.closest(".em-ticket-form").find(".em-ticket-form-advanced").hide(),a.find(".show,.show-advanced").show(),a.find(".hide,.hide-advanced").hide()),a.toggleClass("show")}),e(".em-ticket-form").each(function(){var t=!1,a=e(this);a.find('.em-ticket-form-advanced input[type="text"]').each(function(){""!=this.value&&(t=!0)}),a.find('.em-ticket-form-advanced input[type="checkbox"]:checked').length>0&&(t=!0),a.find(".em-ticket-form-advanced option:selected").each(function(){""!=this.value&&(t=!0)}),t&&a.find(".ticket-options-advanced").trigger("click")}),e(document).delegate(".ticket-actions-delete","click",function(t){t.preventDefault();var a=e(this),n=a.closest("tbody");return n.find("input.ticket_id").val()>0?(a.text("Deleting..."),e.getJSON(e(this).attr("href"),{em_ajax_action:"delete_ticket",id:n.find("input.ticket_id").val()},function(e){e.result?n.remove():(a.text("Delete"),alert(e.error))})):n.remove(),!1})}if(e("#em-bookings-table").length>0){e(document).delegate("#em-bookings-table .tablenav-pages a","click",function(){var t=e(this),a=t.parents("#em-bookings-table form.bookings-filter"),n=t.attr("href").match(/#[0-9]+/);if(null!=n&&n.length>0){var o=n[0].replace("#","");a.find("input[name=pno]").val(o)}else a.find("input[name=pno]").val(1);return a.trigger("submit"),!1});var n={modal:!0,autoOpen:!1,minWidth:500,height:"auto",buttons:[{text:EM.bookings_settings_save,click:function(t){t.preventDefault();var a=e("#em-bookings-table form.bookings-filter [name=cols]").val(""),n=e("form#em-bookings-table-settings-form input.em-bookings-col-item");e.each(n,function(e,t){1==t.value&&(""!=a.val()?a.val(a.val()+","+t.name):a.val(t.name))}),e("#em-bookings-table-settings").trigger("submitted"),e("#em-bookings-table form.bookings-filter").trigger("submit"),e(this).dialog("close")}}]},o={modal:!0,autoOpen:!1,minWidth:500,height:"auto",buttons:[{text:EM.bookings_export_save,click:function(t){e(this).children("form").submit(),e(this).dialog("close")}}]};if(e("#em-bookings-table-settings").length>0){e("#em-bookings-table-settings").dialog(n),e(document).delegate("#em-bookings-table-settings-trigger","click",function(t){t.preventDefault(),e("#em-bookings-table-settings").dialog("open")}),e("#em-bookings-table-export").dialog(o),e(document).delegate("#em-bookings-table-export-trigger","click",function(t){t.preventDefault(),e("#em-bookings-table-export").dialog("open")});var i=function(){e("#em-bookings-table-export-form input[name=show_tickets]").is(":checked")?(e("#em-bookings-table-export-form .em-bookings-col-item-ticket").show(),e("#em-bookings-table-export-form #em-bookings-export-cols-active .em-bookings-col-item-ticket input").val(1)):e("#em-bookings-table-export-form .em-bookings-col-item-ticket").hide().find("input").val(0)};e("#em-bookings-table form select").each(function(t,a){e(a).change(function(t){var a=e(this),n=e("#em-bookings-table-export-form input[name="+a.attr("name")+"]"),o=a.find("option:selected");n.val(o.val())})}),i(),e("#em-bookings-table-export-form input[name=show_tickets]").click(i),e(".em-bookings-cols-sortable").sortable({connectWith:".em-bookings-cols-sortable",update:function(e,t){t.item.parents("ul#em-bookings-cols-active, ul#em-bookings-export-cols-active").length>0?t.item.addClass("ui-state-highlight").removeClass("ui-state-default").children("input").val(1):t.item.addClass("ui-state-default").removeClass("ui-state-highlight").children("input").val(0)}}).disableSelection(),t=!0}e(document).delegate("#em-bookings-table form.bookings-filter","submit",function(t){var a=e(this);return a.parents("#em-bookings-table").find(".table-wrap").first().append('<div id="em-loading" />'),e.post(EM.ajaxurl,a.serializeArray(),function(t){var n=a.parents("#em-bookings-table").first();n.replaceWith(t),e("#em-bookings-table-export input[name=scope]").val(n.find("select[name=scope]").val()),e("#em-bookings-table-export input[name=status]").val(n.find("select[name=status]").val()),jQuery(document).triggerHandler("em_bookings_filtered",[t,n,a])}),!1}),e(document).delegate(".em-bookings-approve,.em-bookings-reject,.em-bookings-unapprove,.em-bookings-delete","click",function(){var t=e(this);if(t.hasClass("em-bookings-delete")&&!confirm(EM.booking_delete))return!1;var a=em_ajaxify(t.attr("href")),n=t.parents("td").first();return n.html(EM.txt_loading),n.load(a),!1})}function r(){e(".interval-desc").hide();var t="-plural";1!=e("input#recurrence-interval").val()&&""!=e("input#recurrence-interval").val()||(t="-singular");var a="span#interval-"+e("select#recurrence-frequency").val()+t;e(a).show()}function s(){e("p.alternate-selector").hide(),e("p#"+e("select#recurrence-frequency").val()+"-selector").show()}function c(){e("input#event-recurrence").is(":checked")?(e("#event_recurrence_pattern").fadeIn(),e("#event-date-explanation").hide(),e("#recurrence-dates-explanation").show(),e("h3#recurrence-dates-title").show(),e("h3#event-date-title").hide()):(e("#event_recurrence_pattern").hide(),e("#recurrence-dates-explanation").hide(),e("#event-date-explanation").show(),e("h3#recurrence-dates-title").hide(),e("h3#event-date-title").show())}e(".em_bookings_events_table").length>0&&(e(document).delegate(".em_bookings_events_table form","submit",function(t){var a=e(this),n=em_ajaxify(a.attr("action"));return a.parents(".em_bookings_events_table").find(".table-wrap").first().append('<div id="em-loading" />'),e.get(n,a.serializeArray(),function(e){a.parents(".em_bookings_events_table").first().replaceWith(e)}),!1}),e(document).delegate(".em_bookings_events_table .tablenav-pages a","click",function(){var t=e(this),a=em_ajaxify(t.attr("href"));return t.parents(".em_bookings_events_table").find(".table-wrap").first().append('<div id="em-loading" />'),e.get(a,function(e){t.parents(".em_bookings_events_table").first().replaceWith(e)}),!1})),e("a.em-booking-button").click(function(t){t.preventDefault();var a=e(this);if(a.text()!=EM.bb_booked&&e(this).text()!=EM.bb_booking){a.text(EM.bb_booking);var n=a.attr("id").split("_");e.ajax({url:EM.ajaxurl,dataType:"jsonp",data:{event_id:n[1],_wpnonce:n[2],action:"booking_add_one"},success:function(e,t,n,o){e.result?a.text(EM.bb_booked):a.text(EM.bb_error),""!=e.message&&alert(e.message)},error:function(){a.text(EM.bb_error)}})}return!1}),e("a.em-cancel-button").click(function(t){t.preventDefault();var a=e(this);if(a.text()!=EM.bb_cancelled&&a.text()!=EM.bb_canceling){a.text(EM.bb_canceling);var n=a.attr("id").split("_");e.ajax({url:EM.ajaxurl,dataType:"jsonp",data:{booking_id:n[1],_wpnonce:n[2],action:"booking_cancel"},success:function(e,t,n,o){e.result?a.text(EM.bb_cancelled):a.text(EM.bb_cancel_error)},error:function(){a.text(EM.bb_cancel_error)}})}return!1}),e(".em-date-single, .em-date-range, #em-date-start").length>0&&(t=!0,em_setup_datepicker("body")),t&&em_load_jquery_css(),e("#recurrence-dates-explanation").hide(),e("#date-to-submit").hide(),e("#end-date-to-submit").hide(),e("#localised-date").show(),e("#localised-end-date").show(),e("#em-wrapper input.select-all").change(function(){e(this).is(":checked")?(e("input.row-selector").prop("checked",!0),e("input.select-all").prop("checked",!0)):(e("input.row-selector").prop("checked",!1),e("input.select-all").prop("checked",!1))}),r(),s(),c(),e("input#event-recurrence").change(c),e("input#recurrence-interval").keyup(r),e("select#recurrence-frequency").change(r),e("select#recurrence-frequency").change(s),(e(".em-location-map").length>0||e(".em-locations-map").length>0||e("#em-map").length>0||e(".em-search-geo").length>0)&&em_maps_load(),jQuery("div.em-location-data input#location-name").length>0&&(jQuery("div.em-location-data input#location-name").autocomplete({source:EM.locationajaxurl,minLength:2,focus:function(e,t){return jQuery("input#location-id").val(t.item.value),!1},select:function(e,t){return jQuery("input#location-id").val(t.item.id).trigger("change"),jQuery("input#location-name").val(t.item.value),jQuery("input#location-address").val(t.item.address),jQuery("input#location-town").val(t.item.town),jQuery("input#location-state").val(t.item.state),jQuery("input#location-region").val(t.item.region),jQuery("input#location-postcode").val(t.item.postcode),""==t.item.country?jQuery("select#location-country option:selected").removeAttr("selected"):jQuery('select#location-country option[value="'+t.item.country+'"]').attr("selected","selected"),jQuery("div.em-location-data input, div.em-location-data select").css("background-color","#ccc").attr("readonly","readonly"),jQuery("#em-location-reset").show(),jQuery("#em-location-search-tip").hide(),jQuery(document).triggerHandler("em_locations_autocomplete_selected",[e,t]),!1}}).data("ui-autocomplete")._renderItem=function(e,t){return html_val="<a>"+t.label+'<br><span style="font-size:11px"><em>'+t.address+", "+t.town+"</em></span></a>",jQuery("<li></li>").data("item.autocomplete",t).append(html_val).appendTo(e)},jQuery("#em-location-reset a").click(function(){return jQuery("div.em-location-data input").css("background-color","#fff").val("").removeAttr("readonly"),jQuery("div.em-location-data select").css("background-color","#fff"),jQuery("div.em-location-data option:selected").removeAttr("selected"),jQuery("input#location-id").val(""),jQuery("#em-location-reset").hide(),jQuery("#em-location-search-tip").show(),jQuery("#em-map").hide(),jQuery("#em-map-404").show(),"undefined"!=typeof marker&&(marker.setPosition(new google.maps.LatLng(0,0)),infoWindow.close(),marker.setDraggable(!0)),!1}),"0"!=jQuery("input#location-id").val()&&""!=jQuery("input#location-id").val()&&(jQuery("div.em-location-data input, div.em-location-data select").css("background-color","#ccc").attr("readonly","readonly"),jQuery("#em-location-reset").show(),jQuery("#em-location-search-tip").hide()))});var infowindow,em_ajaxify=function(e){return-1!=e.search("em_ajax=0")?e=e.replace("em_ajax=0","em_ajax=1"):-1!=e.search(/\?/)?e+="&em_ajax=1":e+="?em_ajax=1",e},em_maps_loaded=!1,maps={},maps_markers={};function em_maps_load(){if(!em_maps_loaded)if(0!=jQuery("script#google-maps").length||"object"==typeof google&&"object"==typeof google.maps)"object"!=typeof google||"object"!=typeof google.maps||em_maps_loaded?jQuery("script#google-maps").length>0&&jQuery(window).load(function(){em_maps_loaded||em_maps()}):em_maps();else{var e=document.createElement("script");e.type="text/javascript",e.id="google-maps";var t=EM.is_ssl?"https:":"http:";void 0!==EM.google_maps_api?e.src=t+"//maps.google.com/maps/api/js?v=3&libraries=places&callback=em_maps&key="+EM.google_maps_api:e.src=t+"//maps.google.com/maps/api/js?v=3&libraries=places&callback=em_maps",document.body.appendChild(e)}}function em_maps_load_locations(e){var t=(e=jQuery(e)).attr("id").replace("em-locations-map-","");if(null==(a=jQuery.parseJSON(e.nextAll(".em-locations-map-coords").first().text())))var a=jQuery.parseJSON(jQuery("#em-locations-map-coords-"+t).text());jQuery.getJSON(document.URL,a,function(a){if(a.length>0){var n={mapTypeId:google.maps.MapTypeId.ROADMAP};"object"==typeof EM.google_map_id_styles&&void 0!==EM.google_map_id_styles[t]?(console.log(EM.google_map_id_styles[t]),n.styles=EM.google_map_id_styles[t]):void 0!==EM.google_maps_styles&&(n.styles=EM.google_maps_styles),jQuery(document).triggerHandler("em_maps_locations_map_options",n);var o={};jQuery(document).triggerHandler("em_maps_location_marker_options",o),maps[t]=new google.maps.Map(e[0],n),maps_markers[t]=[];var i=new google.maps.LatLngBounds;jQuery.map(a,function(e,a){if(0!=e.location_latitude||0!=e.location_longitude){var n=parseFloat(e.location_latitude),r=parseFloat(e.location_longitude),s=new google.maps.LatLng(n,r);jQuery.extend(o,{position:s,map:maps[t]});var c=new google.maps.Marker(o);maps_markers[t].push(c),c.setTitle(e.location_name),em_map_infobox(c,'<div class="em-map-balloon"><div id="em-map-balloon-'+t+'" class="em-map-balloon-content">'+e.location_balloon+"</div></div>",maps[t]),i.extend(new google.maps.LatLng(n,r))}}),maps[t].fitBounds(i),jQuery(document).triggerHandler("em_maps_locations_hook",[maps[t],a,t,maps_markers[t]])}else e.children().first().html("No locations found"),jQuery(document).triggerHandler("em_maps_locations_hook_not_found",[e])})}function em_maps_load_location(e){var t=(e=jQuery(e)).attr("id").replace("em-location-map-","");em_LatLng=new google.maps.LatLng(jQuery("#em-location-map-coords-"+t+" .lat").text(),jQuery("#em-location-map-coords-"+t+" .lng").text());var a="ontouchstart"in window||navigator.maxTouchPoints,n={zoom:14,center:em_LatLng,mapTypeId:google.maps.MapTypeId.ROADMAP,mapTypeControl:!1,scrollwheel:a};"object"==typeof EM.google_map_id_styles&&void 0!==EM.google_map_id_styles[t]?(console.log(EM.google_map_id_styles[t]),n.styles=EM.google_map_id_styles[t]):void 0!==EM.google_maps_styles&&(n.styles=EM.google_maps_styles),jQuery(document).triggerHandler("em_maps_location_map_options",n),maps[t]=new google.maps.Map(document.getElementById("em-location-map-"+t),n),a||(maps[t].addListener("click",function(){maps[t].setOptions({scrollwheel:!0})}),maps[t].addListener("mouseout",function(){maps[t].setOptions({scrollwheel:!1})}));var o={position:em_LatLng,map:maps[t]};jQuery(document).triggerHandler("em_maps_location_marker_options",o),maps_markers[t]=new google.maps.Marker(o),(infowindow=new google.maps.InfoWindow({content:jQuery("#em-location-map-info-"+t+" .em-map-balloon").get(0)})).open(maps[t],maps_markers[t]),maps[t].panBy(40,-70),jQuery(document).triggerHandler("em_maps_location_hook",[maps[t],infowindow,maps_markers[t],t]),jQuery(window).on("resize",function(e){google.maps.event.trigger(maps[t],"resize"),maps[t].setCenter(maps_markers[t].getPosition()),maps[t].panBy(40,-70)})}function em_maps(){if(jQuery(".em-location-map").each(function(e,t){em_maps_load_location(t)}),jQuery(".em-locations-map").each(function(e,t){em_maps_load_locations(t)}),jQuery("select#location-select-id, input#location-address").length>0){var e,t=function(){var t=jQuery("#location-latitude").val(),a=jQuery("#location-longitude").val();if(0!=t||0!=a){var n=new google.maps.LatLng(t,a);i.setPosition(n);var o=jQuery("input#location-name").length>0?jQuery("input#location-name").val():jQuery("input#title").val();i.setTitle(jQuery("input#location-name input#title, #location-select-id").first().val()),jQuery("#em-map").show(),jQuery("#em-map-404").hide(),google.maps.event.trigger(e,"resize"),e.setCenter(n),e.panBy(40,-55),infoWindow.setContent('<div id="location-balloon-content"><strong>'+o+"</strong><br/>"+jQuery("#location-address").val()+"<br/>"+jQuery("#location-town").val()+"</div>"),infoWindow.open(e,i),jQuery(document).triggerHandler("em_maps_location_hook",[e,infowindow,i,0])}else jQuery("#em-map").hide(),jQuery("#em-map-404").show()};if(jQuery("#location-select-id, input#location-id").change(function(){var t;t=jQuery(this).val(),jQuery("#em-map").length>0&&jQuery.getJSON(document.URL,{em_ajax_action:"get_location",id:t},function(t){0!=t.location_latitude&&0!=t.location_longitude?(loc_latlng=new google.maps.LatLng(t.location_latitude,t.location_longitude),i.setPosition(loc_latlng),i.setTitle(t.location_name),i.setDraggable(!1),jQuery("#em-map").show(),jQuery("#em-map-404").hide(),e.setCenter(loc_latlng),e.panBy(40,-55),infoWindow.setContent('<div id="location-balloon-content">'+t.location_balloon+"</div>"),infoWindow.open(e,i),google.maps.event.trigger(e,"resize"),jQuery(document).triggerHandler("em_maps_location_hook",[e,infowindow,i,0])):(jQuery("#em-map").hide(),jQuery("#em-map-404").show())})}),jQuery("#location-name, #location-town, #location-address, #location-state, #location-postcode, #location-country").change(function(){var e=[jQuery("#location-address").val(),jQuery("#location-town").val(),jQuery("#location-state").val(),jQuery("#location-postcode").val()],a="";if(jQuery.each(e,function(e,t){""!=t&&(a=""==a?a+t:a+", "+t)}),""==a)return jQuery("#em-map").hide(),jQuery("#em-map-404").show(),!1;0!=jQuery("#location-country option:selected").val()&&(a=""==a?a+jQuery("#location-country option:selected").text():a+", "+jQuery("#location-country option:selected").text()),""!=a&&jQuery("#em-map").length>0&&r.geocode({address:a},function(e,a){a==google.maps.GeocoderStatus.OK&&(jQuery("#location-latitude").val(e[0].geometry.location.lat()),jQuery("#location-longitude").val(e[0].geometry.location.lng())),t()})}),jQuery("#em-map").length>0){var a=new google.maps.LatLng(0,0),n="ontouchstart"in window||navigator.maxTouchPoints,o={zoom:14,center:a,mapTypeId:google.maps.MapTypeId.ROADMAP,mapTypeControl:!1,scrollwheel:n};void 0!==EM.google_maps_styles&&(o.styles=EM.google_maps_styles),e=new google.maps.Map(document.getElementById("em-map"),o),n||(e.addListener("click",function(){e.setOptions({scrollwheel:!0})}),e.addListener("mouseout",function(){e.setOptions({scrollwheel:!1})}));var i=new google.maps.Marker({position:a,map:e,draggable:!0});infoWindow=new google.maps.InfoWindow({content:""});var r=new google.maps.Geocoder;google.maps.event.addListener(infoWindow,"domready",function(){document.getElementById("location-balloon-content").parentNode.style.overflow="",document.getElementById("location-balloon-content").parentNode.parentNode.style.overflow=""}),google.maps.event.addListener(i,"dragend",function(){var t=i.getPosition();jQuery("#location-latitude").val(t.lat()),jQuery("#location-longitude").val(t.lng()),e.setCenter(t),e.panBy(40,-55)}),jQuery("#location-select-id").length>0?jQuery("#location-select-id").trigger("change"):t(),jQuery(document).triggerHandler("em_map_loaded",[e,infowindow,i])}jQuery(window).on("resize",function(t){google.maps.event.trigger(e,"resize"),e.setCenter(i.getPosition()),e.panBy(40,-55)})}em_maps_loaded=!0,jQuery(document).triggerHandler("em_maps_loaded")}function em_map_infobox(e,t,a){var n=new google.maps.InfoWindow({content:t});google.maps.event.addListener(e,"click",function(){infowindow&&infowindow.close(),infowindow=n,n.open(a,e)})}jQuery(document).bind("em_search_ajax",function(e,t,a){em_maps_loaded&&(a.find(".em-location-map").each(function(e,t){em_maps_load_location(t)}),a.find(".em-locations-map").each(function(e,t){em_maps_load_locations(t)}))}),function(e){function t(t,a,n,o){t.value=e(a).text(),e(t).change(),navigator.userAgent.match(/msie/i)||t.focus(),n.hide()}function a(e,t){var a=e.getHours(),o=t.show24Hours?a:(a+11)%12+1,i=e.getMinutes();return n(o)+t.separator+n(i)+(t.show24Hours?"":a<12?" AM":" PM")}function n(e){return(e<10?"0":"")+e}function o(e,t){return"object"==typeof e?r(e):i(e,t)}function i(e,t){if(e){var a=e.split(t.separator),n=parseFloat(a[0]),o=parseFloat(a[1]);return t.show24Hours||(12===n&&-1!==e.indexOf("AM")?n=0:12!==n&&-1!==e.indexOf("PM")&&(n+=12)),r(new Date(0,0,0,n,o,0))}return null}function r(e){return e.setFullYear(2001),e.setMonth(0),e.setDate(0),e}e.fn.timePicker=function(t){var a=e.extend({},e.fn.timePicker.defaults,t);return this.each(function(){e.timePicker(this,a)})},e.timePicker=function(t,a){var n=e(t)[0];return n.timePicker||(n.timePicker=new jQuery._timePicker(n,a))},e.timePicker.version="0.3",e._timePicker=function(n,s){var c=!1,l=!1,m=o(s.startTime,s),d=o(s.endTime,s),u="selected",p="li."+u;e(n).attr("autocomplete","OFF");for(var g=[],f=new Date(m);f<=d;)g[g.length]=a(f,s),f=new Date(f.setMinutes(f.getMinutes()+s.step));for(var h=e('<div class="time-picker'+(s.show24Hours?"":" time-picker-12hours")+'"></div>'),v=e("<ul></ul>"),_=0;_<g.length;_++)v.append("<li>"+g[_]+"</li>");h.append(v),h.appendTo("body").hide(),h.mouseover(function(){c=!0}).mouseout(function(){c=!1}),e("li",v).mouseover(function(){l||(e(p,h).removeClass(u),e(this).addClass(u))}).mousedown(function(){c=!0}).click(function(){t(n,this,h),c=!1});var k=function(){if(h.is(":visible"))return!1;e("li",h).removeClass(u);var t=e(n).offset();h.css({top:t.top+n.offsetHeight,left:t.left}),h.show();var o=n.value?i(n.value,s):m,c=60*m.getHours()+m.getMinutes(),l=60*o.getHours()+o.getMinutes()-c,p=Math.round(l/s.step),g=r(new Date(0,0,0,0,p*s.step+c,0)),f=e("li:contains("+a(g=m<g&&g<=d?g:m,s)+")",h);return f.length&&(f.addClass(u),h[0].scrollTop=f[0].offsetTop),!0};e(n).focus(k).click(k),e(n).blur(function(){c||h.hide()}),e(n).keydown(function(a){var o;l=!0;var i=h[0].scrollTop;switch(a.keyCode){case 38:if(k())return!1;var r=(o=e(p,v)).prev().addClass(u)[0];return r?(o.removeClass(u),r.offsetTop<i&&(h[0].scrollTop=i-r.offsetHeight)):(o.removeClass(u),r=e("li:last",v).addClass(u)[0],h[0].scrollTop=r.offsetTop-r.offsetHeight),!1;case 40:if(k())return!1;var s=(o=e(p,v)).next().addClass(u)[0];return s?(o.removeClass(u),s.offsetTop+s.offsetHeight>i+h[0].offsetHeight&&(h[0].scrollTop=i+s.offsetHeight)):(o.removeClass(u),s=e("li:first",v).addClass(u)[0],h[0].scrollTop=0),!1;case 13:if(h.is(":visible")){var c=e(p,v)[0];t(n,c,h)}return!1;case 27:return h.hide(),!1}return!0}),e(n).keyup(function(e){l=!1}),this.getTime=function(){return i(n.value,s)},this.setTime=function(t){n.value=a(o(t,s),s),e(n).change()}},e.fn.timePicker.defaults={step:30,startTime:new Date(0,0,0,0,0,0),endTime:new Date(0,0,0,23,30,0),separator:":",show24Hours:!0}}(jQuery);