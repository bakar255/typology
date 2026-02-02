


async function testRegister() {

const res = await fetch("http://localhost:3001/register", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ email: "bax@mail.com", password: "123456" })

});
  const data = await res.json();
  console.log(data);
}

testRegister();