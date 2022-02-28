async function newFormHandler(event) {
  event.preventDefault();

  const post_title = document.querySelector('#post-title').value;
  const post_text = document.querySelector('#post-text').value;
  console.log(post_title);
  console.log(post_text);
  const response = await fetch(`/api/post`, {
    method: "POST",
    body: JSON.stringify({
      post_title,
      post_text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace("/dash");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
