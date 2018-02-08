
 var options = {
        container:'jsmind_container',
        theme:'belizehole',
        editable:true,
        shortcut:{
           enable:true,        // 是否启用快捷键
           handles:{
            
           },         // 命名的快捷键事件处理器
           mapping:{           // 快捷键映射
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
var _jm = jsMind.show(options);
        

// function new_graph(){
//         window.alert("Do you want to start a new graph?");
//         options = {
//             container:'jsmind_container',
//             theme:'greensea',
//             editable:true
//         }
//         _jm = jsMind.show(options);
        
//     }

function open_ajax(){
    var options = {
        container:'jsmind_container',
        theme:'belizehole',
        editable:true,
        shortcut:{
           enable:true,        // 是否启用快捷键
           handles:{
            
           },         // 命名的快捷键事件处理器
           mapping:{           // 快捷键映射
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
    
    var mind_url = 'data.json';
    jsMind.util.ajax.get(mind_url,function(mind){
        _jm = jsMind.show(options,mind);
    });
}
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
function remove_node(){
    var selected_id = get_selected_nodeid();
    if(!selected_id){prompt_info('please select a node first.');return;}

    _jm.remove_node(selected_id);
}
function change_text_font(){
    var selected_id = get_selected_nodeid();
    if(!selected_id){prompt_info('please select a node first.');return;}

    _jm.set_node_font_style(selected_id, 28);
}

function change_text_color(){
    var selected_id = get_selected_nodeid();
    if(!selected_id){prompt_info('please select a node first.');return;}

    _jm.set_node_color(selected_id, null, '#000');
}
function change_background_color(){
    var selected_id = get_selected_nodeid();
    if(!selected_id){prompt_info('please select a node first.');return;}

    _jm.set_node_color(selected_id, '#eee', null);
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


//每次一有新change就会call这个function然后update到firebase
function updataDatabase(){
    var mind_data = _jm.get_data('node_array');
    // var mind_string = jsMind.util.json.json2string(mind_data);
    // prompt_info(mind_string);
    firebase.database().ref().child("test").set(mind_data);
        console.log("data updated!");    
    
}

firebase.database().ref().child("test").once('value').then(function(snapshot) {
    console.log(snapshot.val());
    var data = JSON.stringify(snapshot.val());
    open_json(snapshot.val());
}) ;

firebase.database().ref().child("test").on('value', function(snapshot) {
    _jm.show(snapshot.val());
});



// load_graph();

// open_ajax();

