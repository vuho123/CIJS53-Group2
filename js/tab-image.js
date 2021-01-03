function myFunction(imgs) {
  // let expandImg = document.getElementById("expandedImg");

  // expandImg.src = imgs.src;
  // expandImg.parentElement.style.display = "block";
  // document.getElementById("description").textContent = document.getElementById("name").textContent 
  // // expandImg.parentElement.style.animation = "fadeIn 5s";
  // console.log(expandImg.src);
  document.getElementById("image").style.backgroundImage = " url('"+imgs.src + "')"
  // document.getElementById("description").textContent =

}

let image1 = document.getElementById("img1")
document.getElementById("image").style.backgroundImage = "url('"+image1.src + "')"


// document.getElementById("description").textContent = document.getElementById("headName").textContent
