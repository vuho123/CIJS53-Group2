let listing = [
  
  {
    img: "https://ccbook.vn/wordpress/wp-content/uploads/2019/04/tong-hop-kien-thuc-ngu-van-lop-9-anh-minh-hoa-1.png",
    name:"Văn Học"
  },
  {
    img: "https://vnwriter.net/wp-content/uploads/2018/12/sach-hay-ve-dien-anh-780x405.jpg",
    name: "Điện Ảnh"
  },
  {
    img: "https://nhiepanhvietnam.vn/Uploads/logos/14072017/News/2071416386-nhung-dieu-can-biet-trong-nhiep-anh.jpg",
    name: "Nhiếp Ảnh"
  },
  {
    img: "https://vnwriter.net/wp-content/uploads/2018/04/sach-hay-ve-am-nhac-780x405.jpg",
    name:"Âm Nhạc"
  },
  {
    img: "https://revelogue.com/wp-content/uploads/2020/11/Camille_Pissarro_-_Avenue_de_lOpera_-_Musee_des_Beaux-Arts_Reims-1024x808.jpg",
    name: "Văn Hóa"
  },
  
];

function displayImage(){
    let image = document.getElementById("image-container");

    console.log(image);
    image.innerHTML= ""
    
    for (let i=0 ; i< listing.length ; i++){
        const index = listing[i]

        let HTML = `
        <div class="column">
                <img
                  id="img2"
                  onclick="myFunction(this)"
                  src= ${index.img}
                  width="200px"
                  height="130px"
                  alt=""
                />
                <p id="name">${index.name}</p>
               
              </div>
        
        
        
        `

        image.innerHTML += HTML
    }
}
displayImage()