editing = false;
$(document).ready(function (){
    $('#editor').hide();
    $('#editButton').click(buttonClick);
});

function buttonClick(){
	if (editing) {
		$('#editor-textbox').val(editor.getSession().getValue());
		$('#editorForm').submit();
	}
	else {
        	// show editor textbox
        	// $('#editor').toggle();
        	// Hide rendered div
        	$('#rendered').toggle();
        	
        	// Show editor div
     		$('#editor').toggle();
     		
     		//Set-up ACE
      		var editor = ace.edit("editor");
     		editor.renderer.setShowGutter(false); 
     		editor.getSession().setValue($('#editor-textarea').val());
		editor.getSession().setMode("ace/mode/markdown");

        	
        	// Change edit button
        	$('#editButton').text("Save").addClass("saveButton").removeClass("editButton");
        	editing = true;
    }
}
