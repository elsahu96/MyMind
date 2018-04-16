
//update database new changes to firebase
function updataDatabase(){
    var user = firebase.auth().currentUser;
    var displayName = user.displayName;
    // var email = user.email;
    var mind_data = _jm.get_data('node_array');
    
    var ref = firebase.database().ref(displayName+"/graph");    
    
    ref.set(mind_data);
    console.log("data updated!");   

};
function updataDatabaseBtn(){
    var user = firebase.auth().currentUser;
    var displayName = user.displayName;
    var mind_data = _jm.get_data('node_array');
    firebase.database().ref(displayName).child("graph").set(mind_data);
        window.alert("You just saved your mind map!");   
};

//check user status 
firebase.auth().onAuthStateChanged(firebaseUser =>{
      if(firebaseUser){
        //user is logged in
        var userName = firebaseUser.displayName;

        if(userName==null){
            window.location.href = "setProfile.html";
        }
        // user login as normal user
        
        //create database object
        
        document.getElementById("display-user").innerHTML="Hello, "+userName;
        var dbRefObj = firebase.database().ref(userName+"/graph");
        
        
        //retrive data from firebase
        dbRefObj.once('value').then(function(snapshot) {
            console.log(snapshot.val());
            var data = JSON.stringify(snapshot.val());
            open_json(snapshot.val());
            dbRefObj.on('value', function(snapshot) {
                _jm.show(snapshot.val());
            });
        });    
        
      }else{
        document.getElementById("display-user").style.display="none";
        document.getElementById('user-pic').style.display="none";
        document.getElementById("logout").style.display = "none";
      }
});

function signout(){
    firebase.auth().signOut().then(function() {
            // Sign-out successful.
            window.alert("You have just logged out!");
            window.location.href = "index.html";
          }, function(error) {
            // An error happened.
            console.log(error);

          });
}