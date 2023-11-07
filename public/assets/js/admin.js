function deleteArticle(id, content) {
    const confirmDelete = confirm(`Are you sure you want to delete this item?\n\n"${content}"`);
    if (confirmDelete) {
        fetch(`/api/articles/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    console.log(`Article with ID ${id} deleted.`);
                }
                return response.json();
            })
            .then((data) => {})
            .catch((error) => console.error("Error:", error));
            location.reload();
    } else {
        return
    }
}

function addArticle(content, tag) {
    const apiEndpoint = '/api/articles/';
    const postData = {
        content: content,
        tags: tag
    };

    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        MicroModal.close('add-modal'); // Adjust the ID as necessary
        location.reload();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function editArticle(id, newContent, newTags) {
	fetch(`/api/articles/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ content: newContent, tags: newTags }),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(`Article with ID ${id} updated.`, data);
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}

document.addEventListener('DOMContentLoaded', function() {
    MicroModal.init({
      openTrigger: 'data-micromodal-trigger', // trigger attribute
      closeTrigger: 'data-micromodal-close', // close button attribute
      disableScroll: true,
      awaitOpenAnimation: true,
      awaitCloseAnimation: true,
    });
});

document.getElementById('submit-article').addEventListener('click', function() {
    const content = document.getElementById('article-content').value;
    const tag = document.getElementById('tag-content').value;
    const tags = tag || "etc";

    if (content.trim() && tag.match(/^\w+$/)) {
        addArticle(content, tag);
    }
});

document.getElementById('cancel-article').addEventListener('click', function() {
    const content = document.getElementById('article-content').value;
    if (content.trim()) {
        const confirmLeave = confirm("You have unsaved changes. Are you sure you want to leave?");
        if (confirmLeave) {
            MicroModal.close('add-modal');
        }
    } else {
        MicroModal.close('add-modal');
    }
});
  