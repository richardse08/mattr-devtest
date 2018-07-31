$(document).ready(function() {

    var timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();

    var rawDate = Date.now();

    var submitTime = new Date(rawDate).toUTCString();
    // var submitTime = 1234;



    // Get screen width
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);


    // Show nav bar unless user is at the top
    function sticky_nav_scroll() {
        if (window.pageYOffset > 100 && w >= 500) {
            $('.nav').removeClass('display-none');
            $('body').addClass('body-margin-modifier');
        }
        else {
            $('.nav').addClass('display-none');
            $('body').removeClass('body-margin-modifier');
        }
    }

    // If user scrolls, fire scroll function
    window.onscroll = function() {
        sticky_nav_scroll();
    };


    // Scroll to the top 
    function scroller() {
        $('html, body').animate({
            scrollTop: 0
        }, 'slow');
    };

    $('.nav__invite').on('click', function() {
        scroller();
    });












    // Add overlay and pop up modal when lightbox is clicked
    $('.lightbox-listener').on('click', function() {

        // Get the html of the blocks user clicks on
        var headerInject = this.children[1].innerHTML;
        var paragraphInject = this.children[2].innerHTML;

        // Dynamically inject that html into the modal on the fly
        $('.screenshot__title--title').html(headerInject);
        $('.screenshot__title--body').html(paragraphInject);

        $('.lightbox').removeClass('display-none');
        $('.background-overlay').removeClass('display-none');

        $('html, body').animate({
            // Scroll to degree, taking into account 64 pixels of the sticky nav
            scrollTop: 0
        }, 'slow');
    });





    // Remove overlay and remove pop up modal when exit button is clicked
    $('.lightbox-exit').on('click', function() {
        $('.lightbox').addClass('display-none');
        $('.background-overlay').addClass('display-none');
        
    });

    // Click excape key to close out lighbox
    $('body').keyup(function (escapeEvent) {
        var key = escapeEvent.which;
        if(key == 27) {
            $('.lightbox').addClass('display-none');
            $('.background-overlay').addClass('display-none');
        }
    });












    // Create function to save email and send it to database
    function emailSave(email, timestamp) {

        // Create email for development only
        var testEmail = 'eric.richards.finance@gmail.com';
        // var timestamp = submissionTime;
        // console.log(submitTime);

        // Send it
        $.get( "/email-save", { emailAddress: email, emailTimestamp: timestamp}, function(data) {
        
            console.log(email);
            console.log('checkpoint');                
        });

    };





    // Make sure the email is allowable, if so send it to the db
    function validateEmail (email) {
        var requested;
        var emailEntryGood = 'Thanks for signing up!  You’ll recieve an email with your invitation.';
        var emailEntryBad = 'There was a problem with your Request: Valid email address not provided.';

        // If user inputs a good email
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {

            // Send the email address to the emailSave function to send to the database
            emailSave(email, submitTime);

            $('#js-message-endpoint').html(emailEntryGood);

            // Remove display-none on checkbox
            $('.checkbox').removeClass('display-none');

            // Switch over to email--sent
            $('.invite__request').removeClass('email--unsent');
            $('.invite__request').addClass('email--sent');

            // Change submit button text
            requested = 'REQUESTED';
            $('#buttontext').html(requested);

        }
        
        // If user enters a forbidden email
        else {

            $('#js-message-endpoint').html(emailEntryBad);

            // Hide checkbox
            $('.checkbox').addClass('display-none');

            // Switch over to email--unsent
            $('.invite__request').removeClass('email--sent');
            $('.invite__request').addClass('email--unsent');

            // Change submit button text
            requested = 'REQUEST INVITE';
            $('#buttontext').html(requested);

        }
    };







    // Click email link
    $('.js-email-link').on('click', function() {
        
        // Get value of the input tag on the front end and save as a variable
        var emailValue = $('.email__field').val();

        // Check if email is valid
        validateEmail(emailValue);

        // Clear out the value of the input field
        $('.email__field').val('');

        // Checkpoint
        console.log('email has been clicked');

    });



    // Click enter key fire email function
    $('.email__field').keyup(function (enterEvent) {
        var key = enterEvent.which;
        if(key == 13) {
            $('.js-email-link').click();
        }
    });












});