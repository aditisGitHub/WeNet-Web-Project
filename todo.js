function getDate() {
  var date = new Date();
  time = document.getElementById("clock");
  seconds = date.getSeconds();
  minutes = date.getMinutes();

  time.innerHTML = `
<h1>Current Time And Date:</h1>
<h1>${
    date.getHours() + ":" + minutes + ":" + seconds + " on "
  }${date.toLocaleDateString()}</h1>
`;
}
getDate();
setInterval(getDate, 1000);

function del(element) {
  itemJsonArrayStr = localStorage.getItem("itemsJson");
  itemJsonArray = JSON.parse(itemJsonArrayStr);

  itemJsonArray.splice(element, 1);

  localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  update();
}

function clearStr() {
  console.log("clearing");
  localStorage.clear();
  console.log(localStorage.getItem("itemsJson"));

  update();
}

function update() {
  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
  }

  //Populate the Table

  tableBody = document.getElementById("tbody");
  str = "";

  itemJsonArray.forEach((element, index) => {
    str += `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td>${element[2]}</td>
            <td><button class="btn btn-sm btn-primary" onclick="del(${index})">Delete</button></td>
          </tr>
          
        
        `;
  });
  tableBody.innerHTML = str;
}

function getAndUpdate() {
  console.log("Updating List...");
  tit = document.getElementById("Name").value;
  desc = document.getElementById("Description").value;
  imp = document.getElementById("Important");
  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    if (imp.checked == true) {
      imp = "Yes";
    } else {
      imp = "No";
    }
    itemJsonArray.push([tit, desc, imp]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    if (imp.checked == true) {
      imp = "Yes";
    } else {
      imp = "No";
    }
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.push([tit, desc, imp]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  }
  update();
}

add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();
