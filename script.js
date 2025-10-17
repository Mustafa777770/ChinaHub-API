document.addEventListener("DOMContentLoaded", () => {
  const langToggle = document.getElementById("langToggle");
  const themeToggle = document.getElementById("themeToggle");
  const menuToggle = document.getElementById("menuToggle");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuClose = document.getElementById("menuClose");
  const chatToggle = document.getElementById("chatToggle");
  const chatOverlay = document.getElementById("chatOverlay");
  const chatClose = document.getElementById("chatClose");

  const views = {
    home: document.querySelector(".home-view"),
    bill: document.getElementById("billView"),
    track: document.getElementById("trackView"),
  };

  const hideAllViews = () => {
    Object.values(views).forEach(v => v.classList.add("hidden"));
  };

  const showView = (key) => {
    hideAllViews();
    views[key].classList.remove("hidden");
  };

  const changeToEnglish = () => {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
    langToggle.textContent = "AR";
    // In real app, you'd also swap all text content / translations
    // For this demo, we just change direction
  };

  const changeToArabic = () => {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
    langToggle.textContent = "EN";
  };

  let isEnglish = false;
  langToggle.addEventListener("click", () => {
    isEnglish = !isEnglish;
    if (isEnglish) changeToEnglish();
    else changeToArabic();
  });

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  menuToggle.addEventListener("click", () => {
    menuOverlay.classList.remove("hidden");
  });
  menuClose.addEventListener("click", () => {
    menuOverlay.classList.add("hidden");
  });

  chatToggle.addEventListener("click", () => {
    chatOverlay.classList.remove("hidden");
  });
  chatClose.addEventListener("click", () => {
    chatOverlay.classList.add("hidden");
  });

  // Navigation via menu items
  document.querySelectorAll(".menu-list li").forEach(item => {
    item.addEventListener("click", () => {
      const action = item.dataset.action;
      menuOverlay.classList.add("hidden");
      if (action === "goHome") showView("home");
      if (action === "goBill") showView("bill");
      if (action === "goTrack") showView("track");
    });
  });

  // Hero service card clicks
  document.querySelectorAll("[data-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      const act = btn.dataset.action;
      if (act === "goBill") {
        showView("bill");
      }
      if (act === "goTrack") {
        showView("track");
      }
      if (act === "goHome") {
        showView("home");
      }
    });
  });

  // Bill form
  document.getElementById("billForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const invoice = parseFloat(document.getElementById("invoiceValue").value);
    const method = document.getElementById("shippingMethod").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const volume = parseFloat(document.getElementById("volume").value);
    const conv = 1450;  // USD → IQD

    const commissionUsd = invoice * 0.03;
    const commissionIqd = commissionUsd * conv;
    const invoiceIqd = invoice * conv;

    let shippingFeeIqd = 0;
    if (method === "air") {
      const shippingUsd = weight * 9.5;  // average rate
      shippingFeeIqd = shippingUsd * conv;
    } else {
      shippingFeeIqd = volume * 250000;
    }

    const total = invoiceIqd + commissionIqd + shippingFeeIqd;

    document.getElementById("resInvoice").textContent = invoiceIqd.toLocaleString();
    document.getElementById("resCommission").textContent = commissionIqd.toLocaleString();
    document.getElementById("resShippingFee").textContent = shippingFeeIqd.toLocaleString();
    document.getElementById("resTotal").textContent = total.toLocaleString();

    document.getElementById("billResult").classList.remove("hidden");
  });

  // Track form
  document.getElementById("trackForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const method = document.getElementById("trackMethod").value;
    const shipDateVal = document.getElementById("shipDate").value;
    if (!shipDateVal) return;

    const shipDate = new Date(shipDateVal);
    let addDays = method === "sea" ? 50 : 15;
    const etaDate = new Date(shipDate.getTime() + addDays * 24*60*60*1000);

    document.getElementById("eta").textContent = etaDate.toISOString().split("T")[0];
    document.getElementById("trackResult").classList.remove("hidden");
  });

});
