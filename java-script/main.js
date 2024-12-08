var siteNameInput = document.getElementById("bookmark-Name");
var siteUrlInput = document.getElementById("bookmark-url");

var table = document.getElementById('table-content');
var webList = [];

if (localStorage.getItem("lists") != null) {
   webList = JSON.parse(localStorage.getItem("lists"));
   displayList();
} else {
   webList = [];
}

function addContent() {
   var bookmarkName = siteNameInput.value.trim();
   var bookmarkUrl = siteUrlInput.value.trim();
   if (bookmarkName.length < 3) {
      swal({
         title: "Invalid Name!",
         text: "Bookmark name must be at least 3 characters long.",
         icon: "error",
         button: "OK",
      });
      return;
   }
   
   // Validate URL format
   var urlPattern = /^(https:\/\/|www\.)[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)?$/;``
   if (!urlPattern.test(bookmarkUrl)) {
      swal({
         title: "Invalid URL!",
         text: "Please enter a valid URL starting with 'https://www.'.",
         icon: "error",
         button: "OK",
      });
      return;
   }

   // Create bookmark object
   var bookmark = {
      webName: bookmarkName,
      webUrl: bookmarkUrl,
   };

   // Add to list and save to localStorage
   webList.push(bookmark);
   localStorage.setItem("lists", JSON.stringify(webList));

   // Update the UI
   displayList();

   // Success alert
   swal({
      title: "Success!",
      text: "Bookmark added successfully!",
      icon: "success",
      button: "OK",
   });

   // Clear input fields
   siteNameInput.value = "";
   siteUrlInput.value = "";
}

function displayList() {
   var tbodyContent = document.getElementById("table-content");
   var content = ``;
   for (var i = 0; i < webList.length; i++) {
      content += `<tr>
                     <td class="index-column">${i + 1}</td>
                     <td class="all-columns">${webList[i].webName}</td>
                     <td class="all-columns">
                        <a href="${webList[i].webUrl}" target="_blank" class="btn btn-success text-light px-3">
                           <i class="fa-regular fa-eye pe-2"></i> Visit
                        </a>
                     </td>
                     <td class="all-columns">
                        <button onclick="deleteBookmark(${i})" class="btn btn-danger text-light px-3">
                           <i class="fa-solid fa-trash-can pe-2"></i> Delete
                        </button>
                     </td>
                  </tr>`;
   }
   tbodyContent.innerHTML = content;
}

function deleteBookmark(index) {
   webList.splice(index, 1);
   localStorage.setItem("lists", JSON.stringify(webList));
   displayList();
}
