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
        })

        


    console.log('hello world!');

});