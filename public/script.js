

document.addEventListener('DOMContentLoaded', () => {
    const createUserForm = document.getElementById('createUserForm');
    const updateapikeyForm = document.getElementById('updateapikeyForm');
    const messageDiv = document.getElementById('message');

    createUserForm.addEventListener('submit', async (e) => {
        e.preventDefault();


        const courriel = document.getElementById('courriel').value;
        const password = document.getElementById('password').value;
        console.log(password);
        try {
            const response = await fetch('https://examfinalserviceweb-1.onrender.com/api/exam/users', {
                method: 'POST',
                headers: {

                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( {
                    "courriel" : courriel,
                    "password" : password
                })
            });

            const data = await response.json();
            messageDiv.innerText = JSON.stringify(data);
        } catch (error) {
            console.log(password)
            console.log(response);
            console.error('Error:', error);
        }
    });

    updateapikeyForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userId = document.getElementById('userId').value;
       const password = document.getElementById('motdepasse').value;
       console.log(userId);
        console.log(password);
        try {
            const response = await fetch(`https://examfinalserviceweb-1.onrender.com/api/exam/users/updateCle`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                {
                    "userId": userId,
                    "password" : password
                })
            });

            const data = await response.json();
            messageDiv.innerText = JSON.stringify(data);
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
