const gallery =
document.getElementById("gallery");

const lightbox =
document.getElementById("lightbox");

const lightboxImg =
document.getElementById("lightbox-img");

const imageCounter =
document.getElementById("imageCounter");

const upload =
document.getElementById("upload");

let imageData = [];

let currentIndex = 0;

/* ADD IMAGES */

function addImages(category,count,prefix){

  for(let i=1;i<=count;i++){

    imageData.push({

      src:`images/${category}/${prefix}${i}.jpg`,

      category:category
    });
  }
}

/* YOUR IMAGE COUNTS */

addImages("animals",6,"animal");

addImages("cars",13,"car");

addImages("city",17,"city");

addImages("nature",20,"nature");

/* RENDER */

function renderImages(){

  gallery.innerHTML = "";

  imageData.forEach((img,index)=>{

    gallery.innerHTML += `

      <div class="image-box ${img.category}">

        <img
          src="${img.src}"
          onclick="openLightbox(${index})"
        >

        <div class="overlay">

          <h3>
            ${img.category.toUpperCase()}
          </h3>

          <p>
            Photography by BSKCAM
          </p>

          <div class="buttons">

            <button
              onclick="downloadImage('${img.src}')">

              Download

            </button>

          </div>

        </div>

      </div>

    `;
  });

  imageCounter.innerText =
  imageData.length;
}

renderImages();

/* DOWNLOAD */

function downloadImage(imageSrc){

  const link =
  document.createElement("a");

  link.href = imageSrc;

  link.download = imageSrc;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}

/* LIGHTBOX */

function openLightbox(index){

  currentIndex = index;

  lightbox.style.display = "flex";

  lightboxImg.src =
  imageData[currentIndex].src;
}

function closeLightbox(){

  lightbox.style.display = "none";
}

function changeSlide(step){

  currentIndex += step;

  if(currentIndex >= imageData.length){

    currentIndex = 0;
  }

  if(currentIndex < 0){

    currentIndex =
    imageData.length - 1;
  }

  openLightbox(currentIndex);
}

/* FILTER */

function filterSelection(category){

  const boxes =
  document.querySelectorAll(".image-box");

  boxes.forEach((box)=>{

    if(category === "all"){

      box.style.display = "block";
    }

    else if(
      box.classList.contains(category)
    ){

      box.style.display = "block";
    }

    else{

      box.style.display = "none";
    }

  });

  document
  .getElementById("gallerySection")
  .scrollIntoView({

    behavior:"smooth"
  });
}

/* SEARCH */

function searchImages(){

  let input =
  document
  .getElementById("searchInput")
  .value
  .toLowerCase();

  let boxes =
  document.querySelectorAll(".image-box");

  boxes.forEach((box)=>{

    if(
      box.className
      .toLowerCase()
      .includes(input)
    ){

      box.style.display = "block";
    }

    else{

      box.style.display = "none";
    }

  });
}

/* UPLOAD */

upload.addEventListener("change",(e)=>{

  const files = e.target.files;

  for(let file of files){

    let reader = new FileReader();

    reader.onload = function(event){

      imageData.unshift({

        src:event.target.result,

        category:"uploaded"
      });

      renderImages();
    };

    reader.readAsDataURL(file);
  }

});

/* KEYBOARD */

document.addEventListener("keydown",(e)=>{

  if(e.key === "ArrowRight"){

    changeSlide(1);
  }

  if(e.key === "ArrowLeft"){

    changeSlide(-1);
  }

  if(e.key === "Escape"){

    closeLightbox();
  }

});