export const capitalize = string => {
	let newString = "";
	string.split(" ").forEach(word => {
		newString += word.charAt(0).toUpperCase() + word.slice(1) + " ";
	});

	return newString.trim();
};

export const linkify = taskName => {
	return taskName
		.split(" ")
		.map(item => item.toLowerCase())
		.join("-");
};

export const unlinkify = taskName => {
	let splitLink = taskName.split("/");
	return splitLink[splitLink.length - 1]
		.split("-")
		.map(item => item.toLowerCase())
		.join(" ");
};
