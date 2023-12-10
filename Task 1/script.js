const clock = document.createElement("div")
clock.classList.add("clock")
document.body.appendChild(clock)
function Update() {
	const clockElement = document.querySelector(".clock");
	const now = new Date();
	const hours = now.getHours().toString().padStart(2, '0');
	const minutes = now.getMinutes().toString().padStart(2, '0');
	const seconds = now.getSeconds().toString().padStart(2, '0');
	const Time = `${hours}:${minutes}:${seconds}`;
	clockElement.innerText = Time;
 }
 setInterval(Update, 1000);
 Update();