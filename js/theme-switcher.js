// Переключение между темной и светлой темами

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    
    // Проверяем сохраненную тему в localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Обновляем иконку в соответствии с текущей темой
    if (themeIcon) {
        updateThemeIcon(savedTheme, themeIcon);
    }
    
    // Обработчик переключения темы
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Устанавливаем новую тему
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Сохраняем в localStorage
            localStorage.setItem('theme', newTheme);
            
            // Обновляем иконку
            if (themeIcon) {
                updateThemeIcon(newTheme, themeIcon);
            }
        });
    }
    
    function updateThemeIcon(theme, iconElement) {
        if (theme === 'dark') {
            iconElement.className = 'fas fa-moon';
            iconElement.setAttribute('title', 'Переключить на светлую тему');
        } else {
            iconElement.className = 'fas fa-sun';
            iconElement.setAttribute('title', 'Переключить на темную тему');
        }
    }
});