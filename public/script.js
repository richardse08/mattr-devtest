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




        function validateEmail (email) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                return (true)
                
                // Send the email address to the emailSave function to send to the database
                emailSave(email);
            }
            else {
                alert('Please enter a valid email address')
                return (false)
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