
//update database new changes to firebase
function updataDatabase(){
    var user = firebase.auth().currentUser;
    var displayName = user.displayName;
    var mind_data = _jm.get_data('node_array');
    firebase.database().ref(displayName).child("graph").set(mind_data);
        console.log("data updated!");   
};

//check user status 
firebase.auth().onAuthStateChanged(firebaseUser =>{
      if(firebaseUser){
        //user is logged in
        document.getElementById("login").style.display = "none";
        document.getElementById("display-user").innerHTML=firebaseUser.displayName;
        //database object
        var dbRefObj = firebase.database().ref(firebaseUser.displayName+"/graph");
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
        document.getElementById("logout").style.display = "none";
        document.getElementById("login").style.display = "block";
        // document.getElementById("jsmind_container").style.display = "none";
        // console.log("not logged in");
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