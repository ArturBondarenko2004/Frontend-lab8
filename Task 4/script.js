let blockCount = 0;

function generateBlock() {
  if (blockCount < 25) {
    const box = document.createElement('div');
    box.classList.add('block');

    const x = Math.floor(Math.random() * (window.innerWidth - 40));
    const y = Math.floor(Math.random() * (window.innerHeight - 40));
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    const size = Math.floor(Math.random() * (70 - 40 + 1)) + 40;

    box.style.width = size + 'px';
    box.style.height = size + 'px';
    box.style.left = x + 'px';
    box.style.top = y + 'px';
    box.style.backgroundColor = `rgb(${r},${g},${b})`;

    document.body.appendChild(box);
    blockCount++;
  }
}

function move(tag) {
  let style = getComputedStyle(tag);
  let left = parseInt(style.left);
  let top = parseInt(style.top);
  let speed = 20; 
  
  let blockWidth = tag.clientWidth;
  let blockHeight = tag.clientHeight;

  let angle = parseFloat(tag.getAttribute('data-angle')) || (Math.random() * 2 * Math.PI - Math.PI);

  let dx = speed * Math.cos(angle);
  let dy = speed * Math.sin(angle);

  let newLeft = left + dx;
  let newTop = top + dy;

  let windowWidth = document.documentElement.clientWidth - blockWidth;
  let windowHeight = document.documentElement.clientHeight - blockHeight;

  if (newLeft < 0) {
    newLeft = 0;
    angle = Math.PI - angle;
  } else if (newLeft > windowWidth) {
    newLeft = windowWidth;
    angle = Math.PI - angle; 
  }
  if (newTop < 0) {
    newTop = 0;
    angle = -angle; 
  } else if (newTop > windowHeight) {
    newTop = windowHeight;
    angle = -angle; 
  }
  angle = (angle + 2 * Math.PI) % (2 * Math.PI);
  tag.style.left = newLeft + 'px';
  tag.style.top = newTop + 'px';
  tag.style.transform = `rotate(${angle}rad)`;
  tag.setAttribute('data-angle', angle.toString());
}
function moveBlocks() {
  let blocks = document.querySelectorAll('.block');
  blocks.forEach(function (block) {
    move(block);
  });
}
setInterval(moveBlocks, 100);
setInterval(generateBlock, 500);
