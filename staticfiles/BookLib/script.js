document.addEventListener('DOMContentLoaded', function() {
    var plus = document.getElementById("plus");
    var pop = document.querySelector(".pop");
    var black = document.querySelector(".black");
    var tab1 = document.querySelector(".tab1");
    var add = document.getElementById("add");
    var cancel = document.getElementById("cancel");

    plus.addEventListener("click", function(event) {
        event.preventDefault();
        pop.style.display = "block";
        black.style.display = "block";
    });

    cancel.addEventListener("click", function(event) {
        event.preventDefault();
        pop.style.display = "none";
        black.style.display = "none";
    });

    add.addEventListener("click", function(event) {
        event.preventDefault();

        var form = document.querySelector("form");
        var formData = new FormData(form);

        // Use fetch to send the form data to the server
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Assuming the server responds with JSON
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .then(data => {
            // Handle the response data from the server
            if (data.success) {
                var div = document.createElement("div");
                div.setAttribute("class", "tab");
                div.innerHTML = `
                    <h2>${data.title}</h2>
                    <h3>By ${data.author}</h3> 
                    <p>${data.des}</p>
                    <button onclick="deleteBook(event, ${data.id})">Delete</button>
                `;
                tab1.appendChild(div);
                pop.style.display = "none";
                black.style.display = "none";
                form.reset();
            } else {
                alert('Failed to add book.');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    });

    window.deleteBook = function(event, id) {
        event.preventDefault();

        fetch(`/delete/${id}/`, {
            method: 'DELETE',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
            }
        })
        .then(response => {
            if (response.ok) {
                event.target.parentElement.remove();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
});
