function openModal() {
    document.getElementById('create-post-modal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    }

    function closeModal() {
        const modal = document.getElementById('create-post-modal');
        const overlay = document.getElementById('overlay');
        const postTitleInput = document.getElementById('post-title');
        const postContentInput = document.getElementById('post-content');

        // Clear the form fields
        postTitleInput.value = '';
        postContentInput.value = '';

        // Hide the create post modal and overlay
        modal.style.display = 'none';
        overlay.style.display = 'none';
    }

    document.addEventListener('DOMContentLoaded', function () {
        const postList = document.getElementById('post-list');
        const submitPostBtn = document.getElementById('submit-post-btn');
        const postTitleInput = document.getElementById('post-title');
        const postContentInput = document.getElementById('post-content');

        submitPostBtn.addEventListener('click', function () {
            const postTitle = postTitleInput.value;
            const postContent = postContentInput.value;

            if (postTitle && postContent) {
                // Create a new post element
                const newPost = document.createElement('li');
                const truncatedContent = postContent.length > 50 ? postContent.substring(0, 50) + '...' : postContent;
                const finalContent = truncatedContent.replace(/(?:\r\n|\r|\n)/g, '<br>');  // replace newline to br
                newPost.innerHTML = `<strong>${postTitle}</strong><br><br>${finalContent}`;

                // Append the new post to the post list
                postList.appendChild(newPost);

                // Clear the form fields
                postTitleInput.value = '';
                postContentInput.value = '';

                // Hide the create post modal and overlay
                closeModal();
            }
        });
    });