<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>PS Planner</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="css/normalize.min.css">
        <link rel="stylesheet" href="css/main.css">

        <!--[if lt IE 9]>
            <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
            <script>window.html5 || document.write('<script src="js/vendor/html5shiv.js"><\/script>')</script>
        <![endif]-->
    </head>
    <body>
        <?php
            # Disable caching
            header("Expires: 0");
            header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
            header("Cache-Control: no-store, no-cache, must-revalidate");
            header("Cache-Control: post-check=0, pre-check=0", false);
            header("Pragma: no-cache");

            $url = 'index.php';
            $file = 'files/planner.md';

            if (isset($_POST['text'])) {
                // save file
                file_put_contents($file, $_POST['text']);

                // redirect back to page
                header(sprintf('Location: %s', $url));
                printf('<a href="%s">Moved</a>.', htmlspecialchars($url));
                exit();
            }

            // read text
            $text = file_get_contents($file);
?>
        <div id="container">
            <a id="editButton" class="button editButton" href="#">Edit</a>
            <div id="renderDiv"></div>
            <div id="aceDiv"></div>
            <div id="editorFormDiv">
                <form id="editorForm" action="" method="post">
                <textarea id="editorTextarea" name="text"><?php echo $text; ?></textarea>
                <button type="submit">Submit Changes</button>
                </form>
            </div>
        </div>
     <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
     <script src="//cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.js"></script>
     <script src="//cdnjs.cloudflare.com/ajax/libs/ace/1.1.3/ace.js"></script>
     <script src="js/isMobile.min.js"></script>
    <script src="js/main.js"></script>
     </html>
