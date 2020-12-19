let listImage = [
  {
    img: "http://dummyimage.com/300x300.jpg/dddddd/000000",
  },
  {
    img: "http://dummyimage.com/300x300.jpg/dddddd/000000",
  },
  {
    img: "http://dummyimage.com/300x300.jpg/cc0000/ffffff",
  },
  {
    img: "http://dummyimage.com/300x300.jpg/ff4444/ffffff",
  },
  {
    img: "http://dummyimage.com/300x300.jpg/ff4444/ffffff",
  },
  {
    img: "http://dummyimage.com/300x300.jpg/ff4444/ffffff",
  },
  {
    img: "http://dummyimage.com/300x300.jpg/5fa2dd/ffffff",
  },
  {
    img: "http://dummyimage.com/300x300.jpg/ff4444/ffffff",
  },
  {
    img: "http://dummyimage.com/300x300.jpg/dddddd/000000",
  },
  {
    img: "http://dummyimage.com/300x300.jpg/cc0000/ffffff",
  },
];

function displayImage(){
    let image = document.getElementById("image-container");

    console.log(image);
    image.innerHTML= ""
    
    for (let i=0 ; i< listImage.length ; i++){
        const img = listImage[i]
        console.log(img.img);

        let HTML = `
        <div class="column">
                <img
                  id="img2"
                  onclick="myFunction(this)"
                  src= ${img.img}
                  width="200px"
                  alt=""
                />
                <p>Black Alistar</p>
              </div>
        
        
        
        `

        image.innerHTML += HTML
    }
}
displayImage()