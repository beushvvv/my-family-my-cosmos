// Обновление значения диапазона
const rangeInput = document.getElementById('range');
const rangeValue = document.getElementById('rangeValue');

rangeInput.addEventListener('input', function() {
    rangeValue.textContent = this.value;
});

// Имитация загрузки для прогресс-бара
const progressBar = document.getElementById('progressBar');
let progress = 75;

// Функция для обновления прогресса (имитация)
function updateProgress() {
    progress = (progress + 5) % 100;
    progressBar.value = progress;
    progressBar.nextElementSibling.textContent = progress + '%';
    
    setTimeout(updateProgress, 2000);
}

// Запуск обновления прогресса через 2 секунды
setTimeout(updateProgress, 2000);

// Добавление интерактивности для кнопок
document.querySelector('.primary-btn').addEventListener('click', function() {
    alert('Данные отправлены!');
});

document.querySelector('.secondary-btn').addEventListener('click', function() {
    // Сброс всех полей формы
    document.querySelectorAll('input, select').forEach(element => {
        if (element.type === 'text' || element.type === 'date') {
            element.value = '';
        } else if (element.type === 'checkbox' || element.type === 'radio') {
            element.checked = false;
        } else if (element.type === 'range') {
            element.value = 50;
            rangeValue.textContent = '50';
        }
    });
    
    // Сброс прогресс-бара
    progressBar.value = 75;
    progressBar.nextElementSibling.textContent = '75%';
    progress = 75;
    
    alert('Форма сброшена!');
});