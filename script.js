
// ========================
// 1. 欢迎按钮
// ========================

const helloBtn = document.getElementById("helloBtn");
const message = document.getElementById("message");

helloBtn.addEventListener("click", () => {
  message.textContent = "🎉 欢迎来到我的网站！";
});


// ========================
// 2. 项目搜索与筛选
// ========================

const searchInput = document.getElementById("projectSearch");
const projectFilter = document.getElementById("projectFilter");

const cards = document.querySelectorAll("#projects .card");
const resultsCount = document.getElementById("resultsCount");
const noResults = document.getElementById("noResults");

function filterProjects() {
  const keyword = searchInput.value.trim().toLowerCase();
  const status = projectFilter.value;

  let visibleCount = 0;

  cards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    const cardStatus = card.dataset.status;

    const matchesKeyword = text.includes(keyword);
    const matchesStatus =
      status === "all" || status === cardStatus;

    const shouldShow = matchesKeyword && matchesStatus;

    card.hidden = !shouldShow;

    if (shouldShow) {
      visibleCount++;
    }
  });

  resultsCount.textContent = `找到 ${visibleCount} 个项目`;
  noResults.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterProjects);
projectFilter.addEventListener("change", filterProjects);

// 页面加载时先执行一次
filterProjects();


// ========================
// 3. 表单验证
// ========================

const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("contactName");
const emailInput = document.getElementById("contactEmail");
const messageInput = document.getElementById("contactMessage");
const formStatus = document.getElementById("formStatus");

function showError(text, field) {
  formStatus.textContent = "⚠️ " + text;
  formStatus.className = "error";
  field.focus();
}

contactForm.addEventListener("submit", (event) => {
  // 阻止表单默认提交与页面刷新
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const content = messageInput.value.trim();

  if (name.length < 2) {
    showError("名字至少需要2个字符。", nameInput);
    return;
  }

  if (!email || !emailInput.validity.valid) {
    showError("请输入有效的电子邮箱。", emailInput);
    return;
  }

  if (content.length < 10) {
    showError("留言至少需要10个字符。", messageInput);
    return;
  }

  // 验证通过：仅在网页显示结果
  formStatus.textContent =
    `✅ ${name}，填写成功！这是一份前端演示，留言没有实际发送。`;

  formStatus.className = "success";

  contactForm.reset();
});


// ========================
// 4. 保存深色模式设置
// ========================

const themeBtn = document.getElementById("themeBtn");
const storageKey = "my-first-website-theme";


function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);

  themeBtn.textContent = isDark ? "☀️" : "🌙";

  themeBtn.setAttribute(
    "aria-pressed",
    String(isDark)
  );

  themeBtn.setAttribute(
    "aria-label",
    isDark ? "切换到浅色模式" : "切换到深色模式"
  );
}


// 页面加载时读取上次保存的设置
try {
  const savedTheme = localStorage.getItem(storageKey);
  applyTheme(savedTheme === "dark");
} catch (error) {
  // 某些浏览器环境可能不允许使用 localStorage
  applyTheme(false);
}

// 点击按钮时切换并保存
themeBtn.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark");

  applyTheme(isDark);

  try {
    localStorage.setItem(
      storageKey,
      isDark ? "dark" : "light"
    );
  } catch (error) {
    console.warn("当前环境无法保存主题设置。");
  }
});

// ========================
// 第五课：手机导航菜单
// ========================

const menuBtn = document.getElementById("menuBtn");
const primaryNav = document.getElementById("primaryNav");

function setMenu(open) {
  primaryNav.classList.toggle("open", open);

  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute(
    "aria-label",
    open ? "关闭导航菜单" : "打开导航菜单"
  );

  menuBtn.textContent = open ? "✕" : "☰";
}

// 点击菜单按钮
menuBtn.addEventListener("click", () => {
  const isOpen = primaryNav.classList.contains("open");
  setMenu(!isOpen);
});

// 点击导航链接后，关闭菜单
primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    setMenu(false);
  });
});

// 按 Escape 键关闭菜单
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    primaryNav.classList.contains("open")
  ) {
    setMenu(false);
    menuBtn.focus();
  }
});

// 电脑和手机布局切换时，重置菜单
const desktopScreen = window.matchMedia(
  "(min-width: 761px)"
);

desktopScreen.addEventListener("change", () => {
  setMenu(false);
});
