async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const post_text = document.querySelector('input[name="post-text"]').value;

  const response = await fetch(`/api/newpost`, {
    method: "GET",
    body: JSON.stringify({
      title,
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


