// 视频播放解析核心功能
function play() {
  // 获取DOM元素
  const urlInput = document.getElementById("url");
  const playBox = document.getElementById("palybox");
  const apiSelect = document.getElementById("jk");
  const titleContainer = document.getElementById("tittext");
  // 获取并验证用户输入的链接
  const videoUrl = urlInput.value.trim();
  if (!videoUrl) {
    alert("提示：请输入链接，没有链接无法解析");
    urlInput.focus(); // 聚焦到输入框，方便用户输入
    return;
  }
  try {
    // 验证URL格式（简单验证）
    new URL(videoUrl);
  } catch (e) {
    alert("提示：请输入有效的链接格式");
    urlInput.focus();
    return;
  }
  try {
    // 获取选中的解析接口
    const selectedIndex = apiSelect.selectedIndex;
    const apiUrl = apiSelect.options[selectedIndex].value;
    if (!apiUrl) {
      alert("提示：请选择有效的解析接口");
      return;
    }
    // 设置播放地址
    playBox.src = `${apiUrl}${videoUrl}`;
    // 发送请求获取视频标题
    fetchVideoTitle(videoUrl, titleContainer);
  } catch (error) {
    console.error("播放处理出错：", error);
    alert("处理过程中出现错误，请重试");
  }
}
// 封装视频标题获取函数
function fetchVideoTitle(videoUrl, container) {
  // 使用fetch API发送请求
  fetch("title.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `titurl=${encodeURIComponent(videoUrl)}` // 编码URL参数
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP错误，状态码: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      container.innerHTML = data;
    })
    .catch(error => {
      console.error("获取标题失败：", error);
      container.innerHTML = "无法获取视频标题";
    });
}
