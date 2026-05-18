// Upload
function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  fetch("/upload", {
    method: "POST",
    body: formData
  })
  .then(async res => {
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(data?.detail || "Upload failed");
    }

    preview.innerHTML = `
      <tr>
        <td class="px-6 py-3">${data?.filename || file.name}</td>
        <td class="px-6 py-3">${(file.size / 1024).toFixed(2)} KB</td>
        <td class="px-6 py-3 text-green-400">Uploaded ✅</td>
      </tr>
    `;
  })
  .catch((err) => {
    console.error(err);

    preview.innerHTML = `
      <tr>
        <td class="px-6 py-3">${file.name}</td>
        <td class="px-6 py-3">${(file.size / 1024).toFixed(2)} KB</td>
        <td class="px-6 py-3 text-red-400">Failed ❌</td>
      </tr>
    `;
  });
}