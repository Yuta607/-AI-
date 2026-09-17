const input = document.getElementById("video");
const preview = document.getElementById("preview");
const analyze = document.getElementById("analyze");
const result = document.getElementById("result");

const SERVER_URL = "https://ai-badminton-coach.onrender.com";

let url = null;

input.addEventListener("change", () => {
  const file = input.files[0];
  if (!file) return;

  if (url) URL.revokeObjectURL(url);

  url = URL.createObjectURL(file);
  preview.src = url;
  preview.hidden = false;
  analyze.disabled = false;
  result.hidden = true;
});

analyze.addEventListener("click", async () => {
  const file = input.files[0];

  if (!file) {
    alert("先に動画を選んでください。");
    return;
  }

  analyze.textContent = "動画を送信中…";
  analyze.disabled = true;

  try {
    const formData = new FormData();
    formData.append("video", file);

    const response = await fetch(`${SERVER_URL}/analyze`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    result.hidden = false;

    result.querySelector(".note").textContent =
      data.message || "動画をサーバーで受け取りました！";

    result.scrollIntoView({ behavior: "smooth" });

  } catch (error) {
    result.hidden = false;

    result.querySelector(".note").textContent =
      "動画の送信に失敗しました。";

    console.error(error);
  }

  analyze.textContent = "もう一度分析";
  analyze.disabled = false;
});
