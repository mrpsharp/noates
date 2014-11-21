editing = false;
$(document).ready(function (){
    $('#editor').hide();
    $('#editButton').click(buttonClick);
});

function buttonClick(){
  console.log(editing);
	if (editing) {
		$('#editorForm').submit();
	}
	else {
        $('#editor').toggle();
        $('#rendered').toggle();
        $('#editButton').text("Save").addClass("saveButton").removeClass("editButton");
        editing = true;
    }
}
