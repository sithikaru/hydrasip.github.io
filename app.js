const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 230;

const currentFrame = (index) => `./frames/${(index + 1).toString()}.jpg`;
const images = [];

let bottle = { frame: 0 };

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

gsap.to(bottle, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: true,
    pin: "canvas",
    end: "1000%",
  },
  onUpdate: render,
});

gsap.fromTo(
  ".ball-text",
  { opacity: 0 },
  {
    opacity: 1,
    scrollTrigger: {
      scrub: true,
      start: "40%",
      end: "80%",
    },
    onComplete: () => {
      gsap.to(
        ".ball-text",
        { opacity: 0}
      );
    },
  }
);



images[0].onload = render;
//console.log(images);
function render() {
    context.canvas.width = images[0].width;
    context.canvas.height= images[0].height;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[bottle.frame], 0, 0);
}
