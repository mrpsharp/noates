$(document).ready(function() {
  $('#editButton').on("click", editClick);
  render();

});

function editClick() {
  $('#renderDiv').hide();
  if (isMobile.any) {
    $('#editorFormDiv').show();
  } else {
    url = "//cdnjs.cloudflare.com/ajax/libs/ace/1.1.3/ace.js";
    $.getScript(url, function() {
      $('#aceDiv').show();
      var editor = ace.edit("aceDiv");
      editor.setTheme("ace/theme/chrome");
      editor.getSession().setMode("ace/mode/markdown");
      editor.renderer.setShowGutter(false);
      editor.getSession().setValue($('#editorTextarea').val());
      $('#editorForm').submit(function(e) {
        var editor = ace.edit("aceDiv");
        $('#editorTextarea').text(editor.getSession().getValue());
      });
    });
  }
  $('#editButton').off("click", editClick);
  $('#editButton').click(function() {
    $('#editorForm').submit()
  });
  $('#editButton').text("Save").addClass("saveButton").removeClass("editButton");
}

function render() {
  $('#renderDiv').html(marked($('#editorTextarea').val()));
  $('#editorFormDiv').hide();
}
