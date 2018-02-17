$(document).ready(function() {




        // Add overlay and pop up modal when My Verizon is clicked
        $('.lightbox-listener').on('click', function() {
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

        // Create function to save email and send it to database
        function emailSave(email) {

            // Create email for development only
            var testEmail = 'eric.richards.finance@gmail.com';

            // Send it
            $.get( "/data-save", { testEmail: testEmail}, function(data) {
            
                console.log(data);
                
            });
        };

        // Click email link
        $('.js-email-link').on('click', function() {
            
            // Get value of the input tag on the front end and save as a variable
            var emailValue = $('.email__field').val();

            // Send the email address to the emailSave function to send to the database
            emailSave(emailValue);

            // Checkpoint
            console.log('email has been clicked');
        });

        



});