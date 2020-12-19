function myFunction(imgs) {
    let expandImg = document.getElementById("image");
    expandImg.src = imgs.src;
    expandImg.parentElement.style.display = "block";
  }