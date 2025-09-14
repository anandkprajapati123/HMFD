function valid(){
    let user =document.getElementsByClassName("userInput").value;
    let password=document.getElementsByClassName("userPassword").value;
    let text=/^[a-z,A-Z]+$/;
    let pass=/[@.#$!%^&*.?]/;
    if((!user.match(text)) || user.length<6 || user==""){
        alert("Please Enter Only Characters, Length of 6");
    }
    else if((!password.match(pass))|| password.length<6 || password==""){
        alert("Pleaase Enter a valid password");
    }
    else{
        alert("You Entered Valid User and Password");
    }
}
  
let heading=document.createElement("header");
heading.innerText="Hi, I am Chef Master";
heading.style.fontSize="50px";
document.write(heading);

let para=document.querySelector("h1");
// para.append(heading);
para.prepend(heading);
// para.before(heading);


function valid() {
    let user = document.getElementById("userInput").value.trim();
    let password = document.getElementById("userPassword").value.trim();

    let text = /^[a-zA-Z]+$/; // only alphabets
    let pass = /[@.#$!%^&*.?]/; // must contain special character

    if (!text.test(user) || user.length < 6) {
        alert("⚠️ Username must be at least 6 characters and only letters allowed.");
    } else if (!pass.test(password) || password.length < 6) {
        alert("⚠️ Password must be at least 6 characters & contain a special symbol.");
    } else {
        alert("✅ You Entered Valid Username and Password");
    }
}

// Add dynamic heading
let heading = document.createElement("header");
heading.innerText = "👨‍🍳 Hi, I am Chef Master!";
heading.style.fontSize = "40px";
heading.style.textAlign = "center";
heading.style.color = "darkgreen";

document.body.prepend(heading);
