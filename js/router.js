var root = null;
var useHash = true; // Defaults to: false
var hash = '#!'; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);

router.on('/sign-up', function(){
    console.log("ban dang o chuc nang dang ki");
}).resolve();

router.on('/sign-in', function(){
    console.log("ban dang o chuc nang dang nhap");
}).resolve();

window.router = router;