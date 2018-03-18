
//update database new changes to firebase
function updataDatabase(){
    var user = firebase.auth().currentUser;
    var displayName = user.displayName;
    var mind_data = _jm.get_data('node_array');
    firebase.database().ref(displayName).child("graph").set(mind_data);
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
        
        document.getElementById("login").style.display = "none";
        document.getElementById("display-user").innerHTML=firebaseUser.displayName;
        //get user's profile
        var userPic = document.getElementById('user-pic');
        var profilePicUrl = firebaseUser.photoURL;
        userPic.style.backgroundImage = 'url(' + (profilePicUrl || '/image/profile_placeholder.png') + ')';
        userPic.removeAttribute('hidden');
        //create database object
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
        document.getElementById("display-user").style.display="none";
        document.getElementById('user-pic').style.display="none";
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