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
  analyze.textContent = "サーバーに接続中…";
  analyze.disabled = true;

  try {
    const response = await fetch(`${SERVER_URL}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        filename: input.files[0]?.name || "video"
      })
    });

    const data = await response.json();

    result.hidden = false;

    result.querySelector("h2").textContent = "🏸 AI分析結果";
    result.querySelector(".note").textContent =
      data.message || "サーバーから正常に返事がありました！";

    result.scrollIntoView({ behavior: "smooth" });

  } catch (error) {
    result.hidden = false;
    result.querySelector(".note").textContent =
      "サーバーへの接続に失敗しました。";

    console.error(error);
  }

  analyze.textContent = "もう一度分析";
  analyze.disabled = false;
});
