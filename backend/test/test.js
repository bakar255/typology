
async function login() {
  fetch("http://localhost:3001/login", {
    method: "POST",
    headers: {
     "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: "baxxe93@gmail.com",
      password: "12200"
    })
  })
  .then(r => r.json())
  .then(console.log);

}

login();