const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
const dbg = (obj) => { console.log(obj); return obj; };
const grid = document.getElementById("grid");
const width = 7, height = 6;

const encode = (moves) => {
	let res = "";
	if (moves.length % 2 !== 0)
		moves.push(7);
	for (let i = 0; i < moves.length; i += 2)
		res += alphabet[parseInt(`${moves[i]}${moves[i + 1]}`, 8)];
	return res;
};

const decode = (string) => {
	const res = [];
	const digits = (n) => n < 10 ? ["0", n] : n.split("");
	for (let c of string)
		for (let i of digits(alphabet.indexOf(c).toString(8)))
			res.push(+i);
	while (res[res.length - 1] === 7)
		res.pop();
	return res;
};

const read = (moves) => {
	const res = [];
	for (let y = 0; y < height; y++)
		res.push([]);
	const placed = [];
	for (let i = 0; i < width; i++)
		placed.push(0);
	let first = true;
	for (let m of moves) {
		res[placed[m]][m] = first ? "first" : "second";
		placed[m]++;
		first = !first;
	}
	for (let i = 0; i < width; i++)
		if (placed[i] < height)
			res[placed[i]][i] = "possible";
	return res;
};

const draw = (state) => {
	for (let y = height - 1; y >= 0; y--) {
		for (let x = 0; x < width; x++) {
			const cell = document.createElement("div");
			const value = state[y][x];
			if (value != null)
				cell.classList.add(value);
			if (value === "possible")
				cell.onclick = () => place(x);
			grid.appendChild(cell);
		}
	}
};

const place = (i) => {
	moves.push(i);
	location.hash = encode(moves);

	// TODO: Check for win
	
	if (navigator.share) {
		navigator.share({
			title: "vier",
			text: "your turn",
			url: location.href
		});
	}
	location.reload();
};

// This is where all the magic happens
const hash = location.hash.substring(1);
const moves = decode(hash);
const state = read(moves);
draw(state);
