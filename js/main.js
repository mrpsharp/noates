var client;
$(document).ready(function() {
  // initialise the Dropbox client
  var client = new Dropbox.Client({
    key: "hqfc053v0iumulj"
  });
  // authenticate client
  client.authenticate(function(error, client) {
    if (error) {
      // Replace with a call to your own error-handling code.
      //
      // Don't forget to return from the callback, so you don't execute the code
      // that assumes everything went well.
      return showError(error);
    }

    // Replace with a call to your own application code.
    //
    // The user authorized your app, and everything went well.
    // client is a Dropbox.Client instance that you can use to make API calls.
    render(client);
  });
  $('#editButton').on("click", editClick);
  render();

});

function render(client) {
  client.readFile("Noates/planner.md", function(error, text) {
    if (error) {
      return showError(error);
    }
    $('#renderDiv').html(marked(text));
  });
  $('#editorFormDiv').hide();
}

var showError = function(error) {
  console.log(error.status);
  switch (error.status) {
    case Dropbox.ApiError.INVALID_TOKEN:
      // If you're using dropbox.js, the only cause behind this error is that
      // the user token expired.
      // Get the user through the authentication flow again.
      break;

    case Dropbox.ApiError.NOT_FOUND:
      // The file or folder you tried to access is not in the user's Dropbox.
      // Handling this error is specific to your application.
      break;

    case Dropbox.ApiError.OVER_QUOTA:
      // The user is over their Dropbox quota.
      // Tell them their Dropbox is full. Refreshing the page won't help.
      break;

    case Dropbox.ApiError.RATE_LIMITED:
      // Too many API requests. Tell the user to try again later.
      // Long-term, optimize your code to use fewer API calls.
      break;

    case Dropbox.ApiError.NETWORK_ERROR:
      // An error occurred at the XMLHttpRequest layer.
      // Most likely, the user's network connection is down.
      // API calls will not succeed until the user gets back online.
      break;

    case Dropbox.ApiError.INVALID_PARAM:
    case Dropbox.ApiError.OAUTH_ERROR:
    case Dropbox.ApiError.INVALID_METHOD:
    default:
      // Caused by a bug in dropbox.js, in your application, or in Dropbox.
      // Tell the user an error occurred, ask them to refresh the page.
  }
};

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
