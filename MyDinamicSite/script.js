window.onload = function() {
    // 1. ვამოწმებთ შენახულ სახელს
    const savedName = localStorage.getItem("user_name");
    const displayArea = document.getElementById("greetingText");
    if (savedName && displayArea) {
        displayArea.innerText = "კვლავ გამარჯობა, " + savedName + "! სასიამოვნოა შენი დაბრუნება. 🚀";
    }

    // 2. ვამოწმებთ შენახულ რეჟიმს (Dark/Light)
    const savedMode = localStorage.getItem("site_mode");
    const btn = document.getElementById("modeBtn");
    if (savedMode === "light") {
        document.body.classList.add("light-mode");
        if (btn) {
            btn.innerText = "☀️ დღის რეჟიმი";
            btn.style.background = "#2c3e50";
            btn.style.color = "white";
        }
    }

    // 3. ვიძახებთ ამინდს
    getWeather();
};

// ამინდის ფუნქცია (API)
function getWeather() {
    const city = "Tbilisi";
    // ეს გასაღები უკვე ჩავასწორე, რომ ზუსტი იყოს
    const apiKey = "6093151897e97491799a9a3498967912"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ka`;

    console.log("ამინდის მოთხოვნა გაიგზავნა...");

    fetch(url)
        .then(res => {
            if (res.status === 401) throw new Error("API Key ჯერ არ გააქტიურებულა. მოიცადეთ 1-2 საათი.");
            if (!res.ok) throw new Error("კავშირის შეცდომა: " + res.status);
            return res.json();
        })
        .then(data => {
            console.log("მონაცემები მოვიდა:", data);
            const tempElement = document.getElementById("temp");
            const descElement = document.getElementById("desc");

            if (tempElement && descElement) {
                tempElement.innerText = Math.round(data.main.temp) + "°C";
                let desc = data.weather[0].description;
                descElement.innerText = desc.charAt(0).toUpperCase() + desc.slice(1);
            }
        })
        .catch((err) => {
            console.error("შეცდომა:", err);
            const descElement = document.getElementById("desc");
            if (descElement) descElement.innerText = "ამინდი მიუწვდომელია";
        });
}

function sayHello() {
    const inputField = document.getElementById("userName");
    const displayArea = document.getElementById("greetingText");
    if (!inputField || !displayArea) return;

    const name = inputField.value;

    if (name.trim() !== "") {
        localStorage.setItem("user_name", name);
        displayArea.innerText = "გამარჯობა " + name + "! შენი სახელი დამახსოვრებულია. 🚀";
        displayArea.style.color = "#f1c40f";
        inputField.value = "";
    } else {
        displayArea.innerText = "გთხოვთ, ჯერ ჩაწეროთ სახელი.";
        displayArea.style.color = "#ff4b2b";
    }
}

function toggleMode() {
    document.body.classList.toggle("light-mode");
    const btn = document.getElementById("modeBtn");
    if (!btn) return;
    
    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("site_mode", "light");
        btn.innerText = "☀️ დღის რეჟიმი";
        btn.style.background = "#2c3e50";
        btn.style.color = "white";
    } else {
        localStorage.setItem("site_mode", "dark");
        btn.innerText = "🌙 ღამის რეჟიმი";
        btn.style.background = "#f1c40f";
        btn.style.color = "black";
    }
}
