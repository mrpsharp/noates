var editing = false;
$(document).ready(function (){
    $('#editor').hide();
    $('#editButton').click(buttonClick);
});

function buttonClick(){
	if (editing) {
		var textToSend = $('#editor').data('editor').getSession().getValue();
		$.ajax({
			type: "POST",
			url: "index.php",
			data: { text: textToSend },
		}).done(function( msg ) {
			location.reload(true);
		});
	}
	else {
        	// show editor textbox
        	$('#editor').toggle();
        	// Hide rendered div
        	$('#rendered').toggle();
     		
     		//Set-up ACE
      		var editor = ace.edit("editor");
      		editor.setTheme("ace/theme/chrome");
			editor.getSession().setMode("ace/mode/markdown");
			editor.renderer.setShowGutter(false); 
			$('#editor').data('editor', editor);

        	// Change edit button
        	$('#editButton').text("Save").addClass("saveButton").removeClass("editButton");
        	editing = true;
    }
}
