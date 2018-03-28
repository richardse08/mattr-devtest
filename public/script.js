$(document).ready(function() {

    // Get screen width
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);


    // Show nav bar unless user is at the top
    function sticky_nav_scroll() {
        if (window.pageYOffset > 0 && w >= 500) {
            $('.nav').removeClass('display-none');
        }
        else {
            $('.nav').addClass('display-none');
        }
    }

    // If user scrolls, fire scroll function
    window.onscroll = function() {
        sticky_nav_scroll();
    };













    // // Add overlay and pop up modal when lightbox is clicked
    // $('.lightbox-listener').on('click', function() {

    //     // Get the html of the blocks user clicks on
    //     var headerInject = this.children[1].innerHTML;
    //     var paragraphInject = this.children[2].innerHTML;

    //     // Dynamically inject that html into the modal on the fly
    //     $('.screenshot__title--title').html(headerInject);
    //     $('.screenshot__title--body').html(paragraphInject);

    //     $('.lightbox').removeClass('display-none');
    //     $('.background-overlay').removeClass('display-none');

    //     $('html, body').animate({
    //         // Scroll to degree, taking into account 64 pixels of the sticky nav
    //         scrollTop: 0
    //     }, 'slow');
    // });





    // Remove overlay and remove pop up modal when exit button is clicked
    $('.lightbox-exit').on('click', function() {
        $('.lightbox').addClass('display-none');
        $('.background-overlay').addClass('display-none');
    });




    function validateEmail (email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {

            // Send the email address to the emailSave function to send to the database
            emailSave(email);

            // Simple alert, need to change
            alert('Your request has been saved. Thank you!');

            // Remove display-none on checkbox
            $('.checkbox').removeClass('display-none');

            // Change submit button text
            var requested = 'REQUESTED';
            // $('invite__request--text').html(requested);
            // invite__request--text.innerHTML(requested);
        }
        else {

            // Simple alert, need to change
            alert('Please enter a valid email address')
        }
    };







    // Create function to save email and send it to database
    function emailSave(email) {

        // Create email for development only
        var testEmail = 'eric.richards.finance@gmail.com';

        // Send it
        $.get( "/email-save", { emailAddress: email}, function(data) {
        
            console.log(data);
            console.log('checkpoint');                
        });

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