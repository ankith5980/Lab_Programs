// Get references to the button and the data container
const fetchButton = document.getElementById('fetch-btn');
const dataContainer = document.getElementById('data-container');

// Add a click event listener to the button
fetchButton.addEventListener('click', () => {
    // Use the fetch API to make an AJAX request to our JSON file
    fetch('data.json')
        .then(response => {
            // Check if the request was successful
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            // Parse the response body as JSON
            return response.json();
        })
        .then(data => {
            // The 'data' variable now holds the parsed JSON object
            console.log('Data fetched successfully:', data);

            // Get the array of users
            const users = data.users;
            
            // Start building the HTML string
            let htmlContent = '<h3>User List:</h3>';

            // Loop through each user in the array and create an HTML card
            users.forEach(user => {
                htmlContent += `
                    <div class="user-card">
                        <p><strong>ID:</strong> ${user.id}</p>
                        <p><strong>Name:</strong> ${user.name}</p>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><strong>City:</strong> ${user.city}</p>
                    </div>
                `;
            });

            // Update the data container with the generated HTML
            dataContainer.innerHTML = htmlContent;
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error);
            dataContainer.innerHTML = `<p style="color: red;">Could not fetch data. Please check the console for errors.</p>`;
        });
});