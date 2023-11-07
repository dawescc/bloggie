document.addEventListener("DOMContentLoaded", function () {
	MicroModal.init({
		openTrigger: "data-micromodal-trigger", // trigger attribute
		closeTrigger: "data-micromodal-close", // close button attribute
		disableScroll: true,
		awaitOpenAnimation: true,
		awaitCloseAnimation: true,
	});
});

document.getElementById("submit-article").addEventListener("click", function () {
	const content = document.getElementById("article-content").value;
	const tag = document.getElementById("tag-content").value;
	const tags = tag || "etc";

	if (content.trim() && tag.match(/^\w+$/)) {
		console.log('Add submit functions');
	}
});

document.getElementById("cancel-article").addEventListener("click", function () {
	const content = document.getElementById("article-content").value;
	if (content.trim()) {
		const confirmLeave = confirm("You have unsaved changes. Are you sure you want to leave?");
		if (confirmLeave) {
			MicroModal.close("add-modal");
		}
	} else {
		MicroModal.close("add-modal");
	}
});
