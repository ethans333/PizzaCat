const post_data = (data) => {

    fetch(`${window.origin}/get-data`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        cache: "no-cache",
        headers: new Headers({
            "content-type": "application/json"
        })
    }).then((res) => {
        if (res.status !== 200) {
            console.log(`Response status was not 200: ${res.status}`);
            return;
        }

        res.json().then((data) => {

            const label = document.getElementById("lbl-prediction");

            label.innerText = (data.prediction == "pizza") ? "🍕" : "🐱";
        })
    })
}