const images = [
	{
	  src: "https://klike.net/uploads/posts/2019-05/medium/1559021804_2.jpg",
	  alt: "Slide 1",
	},
	{
	  src: "https://klike.net/uploads/posts/2019-05/1559021828_3.jpg",
	  alt: "Slide 2",
	},
	{
	  src: "https://klike.net/uploads/posts/2019-05/1559021877_4.jpg",
	  alt: "Slide 3",
	},
	{
	  src: "https://klike.net/uploads/posts/2019-05/1559021879_6.jpg",
	  alt: "Slide 4",
	},
 ];

 const slideshowContainer = document.querySelector(".container");

 images.forEach((image, index) => {
	const slide = document.createElement("div");
	slide.className = "slides";

	const img = document.createElement("img");
	img.src = image.src;
	img.alt = image.alt;

	slide.appendChild(img);
	slideshowContainer.appendChild(slide);
 });
 let slideIndex = 0;
 const slides = document.querySelectorAll(".slides");

 function showSlides() {
	for (let i = 0; i < slides.length; i++) {
	  slides[i].style.display = "none";
	}

	slideIndex++;
	if (slideIndex > slides.length) {
	  slideIndex = 1;
	}

	slides[slideIndex - 1].style.display = "block";
	setTimeout(showSlides, 1000);
 }

 showSlides();