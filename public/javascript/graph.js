
var options = {
        container:'jsmind_container',
        theme:'default',
        editable:true,
        shortcut:{
           enable:true,        // shortcut is enabled
           handles:{
           },         // shortcut handler
           mapping:{           // shortcut mapping
               addchild   : 9,    // <tab>
               addbrother : 13,    // <Enter>
               editnode   : 32,   // <space>
               delnode    : 8,    // <backspace>
               toggle     : 32,    // < >
               left       : 37,    // <Left>
               up         : 38,    // <Up>
               right      : 39,    // <Right>
               down       : 40,    // <Down>
           }
       }
    }

function hotkey()
{
    var key = window.event.keyCode;
    if(key == 9){updataDatabase()}
    if(key == 13){updataDatabase()}
    if(key == 32){updataDatabase()}
    if(key == 8){updataDatabase()}
}
document.onkeydown = hotkey; 

var _jm = jsMind.show(options);
function open_json(mind){
    _jm.show(mind);
}
function screen_shot(){
    _jm.screenshot.shootDownload();
}

function add_node(){
    var selected_node = _jm.get_selected_node(); // as parent of new node
    if(!selected_node){prompt_info('please select a node first.');return;}

    var nodeid = jsMind.util.uuid.newid();
    var topic = '* Node_'+nodeid.substr(0,5)+' *';
    var node = _jm.add_node(selected_node, nodeid, topic);
    updataDatabase();
}
var imageChooser = document.getElementById('image-chooser');

imageChooser.addEventListener('change', function (event) {
    // Read file here.
    var reader = new FileReader();
    reader.onloadend = (function () {
        var selected_node = _jm.get_selected_node();
        var nodeid = jsMind.util.uuid.newid();
        var topic = undefined;
        var data = {
            "background-image": reader.result,
            "width": "100",
            "height": "100"};
        var node = _jm.add_node(selected_node, nodeid, topic, data);
        
    });

    var file = imageChooser.files[0];
    if (file) {
        reader.readAsDataURL(file);
    };

}, false);


function add_image(){
    var selected_node = _jm.get_selected_node(); // as parent of new node
    if(!selected_node){
        prompt_info('please select a node first.');
        return;
    }
    imageChooser.focus();
    imageChooser.click();
  }


function remove_node(){
    var selected_id = get_selected_nodeid();
    if(!selected_id){prompt_info('please select a node first.');return;}

    _jm.remove_node(selected_id);
    confirm("Are you sure you want to delete this node? (The central node can't be deleted.)");
    updataDatabase();
}
function change_text_font(font_size){
    var selected_id = get_selected_nodeid();
    if(!selected_id){prompt_info('please select a node first.');return;}

    _jm.set_node_font_style(selected_id, font_size);
    updataDatabase();
}

function change_text_color(text_color){
    var selected_id = get_selected_nodeid();
    if(!selected_id){prompt_info('please select a node first.');return;}
    _jm.set_node_color(selected_id, null, text_color);
    updataDatabase();
}
function change_background_color(background){
    var selected_id = get_selected_nodeid();
    if(!selected_id){prompt_info('please select a node first.');return;}
    _jm.set_node_color(selected_id, background, null);
    updataDatabase();
}
function set_theme(theme_name){
    _jm.set_theme(theme_name);
}
function expand(){
    var selected_id = get_selected_nodeid();
    if(!selected_id){prompt_info('please select a node first.');return;}
    _jm.expand_node(selected_id);
}

function collapse(){
    var selected_id = get_selected_nodeid();
    if(!selected_id){prompt_info('please select a node first.');return;}

    _jm.collapse_node(selected_id);
}
function expand_all(){
    _jm.expand_all();
}
function collapse_all(){
    _jm.collapse_all();
}
function prompt_info(msg){
    alert(msg);
}
function get_selected_nodeid(){
    var selected_node = _jm.get_selected_node();
    if(!!selected_node){
        return selected_node.id;

    }else{
        return null;
    }
}
var zoomInButton = document.getElementById("zoom-in-button");
var zoomOutButton = document.getElementById("zoom-out-button");

function zoomIn() {
    if (_jm.view.zoomIn()) {
        zoomOutButton.disabled = false;
    } else {
        zoomInButton.disabled = true;
    };
};

function zoomOut() {
    if (_jm.view.zoomOut()) {
        zoomInButton.disabled = false;
    } else {
        zoomOutButton.disabled = true;
    };
};



 



