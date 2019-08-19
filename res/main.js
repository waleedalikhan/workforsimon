$(init);
function init() {
    // define vars
    var diagram = [];
    var canvas = $(".canvas");
    var trash = $("#trash");
    // Functionality for the trash bin
        trash.droppable({
        drop: function (event, ui) {
            var removeIt = $(ui.draggable).attr("id");
            ui.draggable.remove();
            diagram = jQuery.grep(diagram, function(node) {
                return node._id != removeIt;
            });
        }
    })

    // Creating a clone when we drag an element from the menu
    $(".tool").draggable({
        helper: "clone", 
        start: function(e, ui){
            $(ui.helper).addClass("dragable")
        }
    });


    // Adding types to the classes of the elements while dragging them
    canvas.droppable({
        drop: function (event, ui) {
            var node = {
                _id: (new Date).getTime(),
                position: ui.helper.position()
            };
            node.position.left -= canvas.position().left;
            if (ui.helper.hasClass("tool-1")) {
                node.type = "TOOL-1";
            } else if (ui.helper.hasClass("tool-2")) {
                node.type = "TOOL-2";
            } else {
                return;
            }
            diagram.push(node);
            renderDiagram(diagram);
        }
    });

    // Creating a function which adds the html and CSS in the clone when it drops
    function renderDiagram(diagram) {
        canvas.empty();
        for (var d in diagram) {
            var node = diagram[d];
            var html = "";
            
            // For name/input
            if (node.type === "TOOL-1") {
                html = "<form id='" + node._id + "' class='border my-4 p-3 cursor animate the-form'><div class='form-group'><label for='name'>Name</label><input type='text' class='form-control' placeholder='Enter name' ondragstart='dragStart(event)' ></div></form>";
            } //For the slider
             else if (node.type === "TOOL-2") {
                html = "<div id='" + node._id + "' class='slidecontainer border my-3 p-4 w-100 animate the-slider cursor'><input type='range' min'1' max='100' value='1' class='slider' id='myRange' ></div>";
            }
            
            // Some CSS to be added to the droped elements for their positioning
            var dom = $(html).css({
                "position": "absolute",
                "top": node.position.top,
                "left": node.position.left
            })
            // Sorry I forgot that the stop function was not of use I was just checking it to console log something which i was founding error of nothing else
            
            // Finaly adding HTML to the canvas where it drops
            canvas.append(html);
        }
    }

    // The re-arrangement of the elements
    $(function () {
        $("#sortable").sortable();
        $("#sortable").disableSelection();
    })

    // That's it thank you for lettin me work for you and I would like to work more for you and you can ask anything you want in there! thanks ALot man!
}