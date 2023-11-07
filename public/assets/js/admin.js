function deleteArticle(id, content) {
	const supabaseUrl = process.env.SUPABASE_URL;
	const supabaseKey = process.env.SUPABASE_ANON_KEY;

	const confirmDelete = confirm(`Are you sure you want to delete this item?\n\n"${content}"`);
	if (confirmDelete) {
		fetch(`${supabaseUrl}/rest/v1/articles?id=eq.${id}`, {
			method: "DELETE",
			headers: {
				apikey: supabaseKey,
				Authorization: `Bearer ${supabaseKey}`,
				"Content-Type": "application/json",
				Prefer: "return=representation",
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				console.log(`Article with ID ${id} deleted.`);
				return response.json();
			})
			.catch((error) => console.error("Error:", error))
			.finally(() => location.reload());
	}
}

function addArticle(content, tags) {
	const supabaseUrl = process.env.SUPABASE_URL;
	const supabaseKey = process.env.SUPABASE_ANON_KEY;
	const postData = {
		content: content,
		tags: tags,
	};

	fetch(`${supabaseUrl}/rest/v1/articles`, {
		method: "POST",
		headers: {
			apikey: supabaseKey,
			Authorization: `Bearer ${supabaseKey}`,
			"Content-Type": "application/json",
			Prefer: "return=representation",
		},
		body: JSON.stringify(postData),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			console.log("Success:", data);
			MicroModal.close("add-modal");
			location.reload();
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}

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
		addArticle(content, tag);
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
