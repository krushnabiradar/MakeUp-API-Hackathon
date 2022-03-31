// fetching the api using async/await and try catch

// var data = fetch(
//   "https://makeup-api.herokuapp.com/api/v1/products.json"
// ).then((response) => response.json())

async function getMakeUpAPIDetails() {
  try {
    var data = await foo();
    var res = await data.json();
    console.log(res);
  } catch (error) {
    alert("Failed to fetch details. Please try after sometime.");
    console.log(error);
  }
  return res;
}

function foo() {
  return fetch("https://makeup-api.herokuapp.com/api/v1/products.json", {
    method: "GET",
  });
}

//initiate Elements

var tbody = document.getElementById("tbody");
var tr = () => document.createElement("tr");
var btn = () => document.createElement("button");
var td = () => document.createElement("td");
var nextBtn = document.getElementById("next");
var prevBtn = document.getElementById("prev");
var firstBtn = document.getElementById("first");
var lastBtn = document.getElementById("last");
var currentPage = document.getElementById("currentPage");
var totalPage = document.getElementById("totalPages");
var pageCon = document.getElementById("pageBtns");

// initiate class for pagination task

class Pagination {
  constructor() {
    this.firstIndex = 0;
    var data = getMakeUpAPIDetails();

    // generate buttons
    data
      .then((data) => {
        var numOfBtn = data.length / 5;
        for (let i = 0; i < numOfBtn; i++) {
          var pageBtn = btn();
          pageBtn.setAttribute("onclick", `page.setPage(${i})`);
          pageBtn.setAttribute("class", "btn btn-dark");
          pageBtn.innerHTML = i + 1;

          pageCon.append(pageBtn);
        }
      })
      .catch((err) => console.log(err));
  }

  // logic for pagination buttons

  buttons() {
    var data = getMakeUpAPIDetails();
    data
      .then((data) => {
        // condition logic for next button
        if (this.firstIndex < data.length - 6 && this.firstIndex >= 0) {
          nextBtn.style.display = "block";
        } else {
          nextBtn.style.display = "none";
        }
        // condition logic for prev btn

        if (this.firstIndex > 0 && this.firstIndex < data.length) {
          prevBtn.style.display = "block";
        } else {
          prevBtn.style.display = "none";
        }
      })
      .catch((err) => console.log(err));
  }

  // to display table contents
  display() {
    var data = getMakeUpAPIDetails();
    data
      .then((data) => {
        // console.log(data.length)

        // navigation i.e showing current and total page number

        totalPage.innerHTML = Math.ceil(data.length / 5);
        currentPage.innerHTML = this.firstIndex / 5 + 1;



        //display table

        tbody.innerHTML = "";
        for (let i = this.firstIndex; i < this.firstIndex + 5; i++) {
          // console.log(data[i].id)
          var row = tr();
          var rowData = [td(), td(), td(), td(), td(), td()];
          rowData[0].innerHTML = data[i].brand;
          rowData[1].innerHTML = data[i].name;
          rowData[2].innerHTML = data[i].price;
          // rowData[3].innerHTML = data[i].image_link;
          rowData[3].innerHTML="<img src="+data[i].image_link+">";
          // rowData[4].innerHTML = data[i].product_link;
          rowData[4].innerHTML = "<a href="+data[i].product_link+"> <button>Go To Product</button></a>";
          rowData[5].innerHTML = data[i].description;
          row.append(...rowData);
          tbody.append(row);
        }
      })
      .catch((err) => console.log(err));
    this.buttons();
  }

  // to change next page
  next() {
    this.firstIndex = this.firstIndex + 5;
    this.display();
  }

  // to change previous page
  prev() {
    this.firstIndex = this.firstIndex - 5;
    this.display();
  }

  // to set the page number
  setPage(num) {
    this.firstIndex = num * 5;
    this.display();
  }
  lastPage() {
    var data = getMakeUpAPIDetails();
    console.log(data.length);
    data
      .then((data) => {
        this.setPage(data.length / 5 - 1);
      })
      .catch((err) => console.log(err));
  }
}

var page = new Pagination();
page.display();

// button actions i.e click event actions

firstBtn.addEventListener("click", () => page.setPage(0));
lastBtn.addEventListener("click", () => page.lastPage());
nextBtn.addEventListener("click", () => page.next());
prevBtn.addEventListener("click", () => page.prev());
