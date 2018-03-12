
var dbRefObj = firebase.database().ref().child("test");
var dbRefList = document.getElementById(list);
dbRefList = dbRefObj.child("todolist");

//syn list changes
dbRefList.on('child_added',snapshot=> window.alert(snap.val()));