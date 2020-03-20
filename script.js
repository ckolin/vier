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

const getId = (x, y) => `cell-${x}-${y}`;
const getCell = (x, y) => document.getElementById(getId(x, y));

const init = () => {
	let columns = "";
	for (let i = 0; i < width; i++)
		columns += "1fr ";
	grid.style.gridTemplateColumns = columns;
	for (let y = height - 1; y >= 0; y--) {
		for (let x = 0; x < width; x++) {
			const el = document.createElement("div");
			el.id = getId(x, y);
			grid.appendChild(el);
		}
	}
};

const draw = () => {
	const placed = [];
	for (let i = 0; i < width; i++)
		placed[i] = 0;

	let first = true;
	for (let m of moves) {
		getCell(m, placed[m]).className = first ? "first" : "second";
		placed[m]++;
		first = !first;
	}

	for (let i = 0; i < width; i++) {
		const c = getCell(i, placed[i]);
		if (c != null) {
			c.className = "possible";
			c.onclick = () => { moves.push(i); draw(); };
		}
	}
};

const hash = location.hash.substring(1);
const moves = decode(hash);

init();
draw();