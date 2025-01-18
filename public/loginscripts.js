
// Check if user is logged in and update UI accordingly
function checkLoginStatus() 
{
fetch('/check-login')
    .then(response => response.json())
    .then(data => 
    {
    if (data.loggedIn) 
    {
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('logout-btn').style.display = 'inline';
    } 
    else 
    {
        document.getElementById('login-btn').style.display = 'inline';
        document.getElementById('logout-btn').style.display = 'none';
        showSection('biography');
    }
    });
}

// Διαχείριση Login Action
document.getElementById('login-btn').addEventListener('click', () => 
{
const username = prompt('Enter username:');
const password = prompt('Enter password:');

fetch('/login', 
{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
})
.then(response => response.json())
.then(data => 
{
    if (data.success) 
    {
    alert('Login successful!');
    checkLoginStatus();
    } 
    else 
    {
    alert('Invalid username or password.');
    }
});
});

// Διαχείριση Logout Action
document.getElementById('logout-btn').addEventListener('click', () => 
{
fetch('/logout')
    .then(response => response.json())
    .then(() => 
    {
        alert('You have been logged out.');
        checkLoginStatus();
    });
});

// Διαχείριση View Action
function viewPage() 
{
    fetch('/view')
    .then(response => response.json())
    .then(data => 
    {
    if (data.success) 
    {
        showSection('administration');
    }
    else 
    {
        alert('You are not logged in!');
    }
    });
}

// Αρχικοποιήση της εφαρμογής ελέγχοντας την κατάσταση σύνδεσης
checkLoginStatus();
