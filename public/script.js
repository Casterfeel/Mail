
function changeBackground(pageNumber) {
    const row = document.querySelector('.row'); 

    if (row) {
        
        row.style.backgroundImage = "";

        
        if (pageNumber === 4) { 
            row.style.backgroundImage = "url('./images/calc1.png'), url('./images/calc2.png')";
            row.style.backgroundPosition = "left top, right bottom";
            row.style.backgroundRepeat = "no-repeat";
        } else {
            
            row.style.backgroundImage = "url('./images/left.png'), url('./images/top tight.png'), url('./images/bot right.png')";
            row.style.backgroundPosition = "left, top right, bottom right";
            row.style.backgroundRepeat = "no-repeat";
        }
    }
}


function checkCheckboxes(pageNumber) {
    let isValid = true;  

    
    if (pageNumber === 1 || pageNumber === 2 || pageNumber === 3 || pageNumber === 4) {
        const checkboxes = document.querySelectorAll(`input[name="question${pageNumber}"]:checked`);
        if (checkboxes.length === 0) {
            alert(`Пожалуйста, выберите хотя бы один вариант для вопроса ${pageNumber}`);
            isValid = false;
        }
    }

    return isValid;
}


function nextPage(page) {
    
    if (!checkCheckboxes(page)) {
        return;  
    }

    const currentPage = document.getElementById('page-' + page);
    const nextPage = document.getElementById('page-' + (page + 1));
    
    
    currentPage.classList.add('hidden');
    
    
    nextPage.classList.remove('hidden');
    
    
    changeBackground(page);
}


function submitForm() {
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const agree = document.getElementById('agree').checked;

    
    if (!phone || !email || !agree) {
        alert('Заполните все поля');
        return;
    }

    
    const question1Checked = document.querySelectorAll('input[name="question1"]:checked').length > 0;
    const question2Checked = document.querySelectorAll('input[name="question2"]:checked').length > 0;
    const question3Checked = document.querySelectorAll('input[name="question3"]:checked').length > 0;
    const question4Checked = document.querySelectorAll('input[name="question4"]:checked').length > 0;

    if (!question1Checked || !question2Checked || !question3Checked || !question4Checked) {
        alert('Пожалуйста, ответьте на все вопросы!');
        return;
    }

    const question1 = Array.from(document.querySelectorAll('input[name="question1"]:checked')).map(input => input.nextElementSibling.textContent).join(', ');
    const question2 = Array.from(document.querySelectorAll('input[name="question2"]:checked')).map(input => input.nextElementSibling.textContent).join(', ');
    const question3 = Array.from(document.querySelectorAll('input[name="question3"]:checked')).map(input => input.nextElementSibling.textContent).join(', ');
    const question4 = Array.from(document.querySelectorAll('input[name="question4"]:checked')).map(input => input.nextElementSibling.textContent).join(', ');

    const data = {
        question1,
        question2,
        question3,
        question4,
        phone,
        email
    };

    
    fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) { 
            return response.json().then(err => {
                throw new Error(err.message || 'Ошибка сервера');
            });
        }
        return response.json();
    })
    .then(result => {
        alert(result.message); 
        console.log(result);
    })
    .catch(error => {
        alert('Ошибка отправки данных: ' + error.message);
        console.error('Error: ', error);
    });
}


document.querySelector('.entry_btn').addEventListener('click', function() {
    const entryBlock = document.querySelector('.entry_block');
    const quizPage1 = document.getElementById('page-1');
    
    
    entryBlock.classList.add('hidden');
    
   
    quizPage1.classList.remove('hidden');
    
    
    changeBackground(1);
});


document.querySelector('.price_btn').addEventListener('click', submitForm);


document.addEventListener("DOMContentLoaded", function() {
    console.log("JavaScript файл подключен и выполнен");
});
