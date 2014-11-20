$(document).ready(function (){
    $('#editor').hide();
    $('#editButton').click(function(){
        $('#editor').toggle(); 
        $('#rendered').toggle();
    });
});
