window.onload = function() {
    // 1. ვამოწმებთ შენახულ სახელს
    const savedName = localStorage.getItem("user_name");
    const displayArea = document.getElementById("greetingText");
    if (savedName) {
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

    // 3. ავტომატურად ვიძახებთ ამინდს ჩატვირთვისას
    getWeather();
};

// ამინდის ფუნქცია (API)
function getWeather() {
    const city = "Tbilisi";
    const apiKey = "6093151897e97491799a9a3498967912"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ka`;

    console.log("ამინდის მოთხოვნა გაიგზავნა...");

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error("API-სთან კავშირი ვერ დამყარდა");
            return res.json();
        })
        .then(data => {
            console.log("მონაცემები მოვიდა:", data); // ამას ნახავ კონსოლში (F12)

            const tempElement = document.getElementById("temp");
            const descElement = document.getElementById("desc");

            if (tempElement && descElement) {
                tempElement.innerText = Math.round(data.main.temp) + "°C";
                let desc = data.weather[0].description;
                descElement.innerText = desc.charAt(0).toUpperCase() + desc.slice(1);
            } else {
                console.error("შეცდომა: HTML-ში ვერ ვიპოვე 'temp' ან 'desc' აიდი!");
            }
        })
        .catch((err) => {
            console.error("მოხდა შეცდომა:", err);
            const descElement = document.getElementById("desc");
            if (descElement) descElement.innerText = "ამინდი მიუწვდომელია";
        });
}

function sayHello() {
    const inputField = document.getElementById("userName");
    const name = inputField.value;
    const displayArea = document.getElementById("greetingText");

    if (name.trim() !== "") {
        localStorage.setItem("user_name", name);
        displayArea.innerText = "გამარჯობა " + name + "! შენი სახელი დამახსოვრებულია. 🚀";
        displayArea.style.color = "#ffde59";
        inputField.value = "";
    } else {
        displayArea.innerText = "გთხოვთ, ჯერ ჩაწეროთ სახელი.";
        displayArea.style.color = "#ff4b2b";
    }
}

function toggleMode() {
    document.body.classList.toggle("light-mode");
    const btn = document.getElementById("modeBtn");
    
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

function addTodo() {
    const input = document.getElementById("todoInput");
    const text = input.value;
    
    if (text.trim() !== "") {
        const li = document.createElement("li");
        li.innerHTML = text + " <button onclick='this.parentElement.remove()' style='color: red; background: none; border: none; cursor: pointer; font-weight: bold; margin-left: 10px;'>X</button>";
        li.style.background = "rgba(255,255,255,0.1)";
        li.style.margin = "5px 0";
        li.style.padding = "10px";
        li.style.borderRadius = "8px";
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        
        document.getElementById("todoList").appendChild(li);
        input.value = "";
    }
}