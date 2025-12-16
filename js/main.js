// Основной JavaScript файл

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Бургер-меню
    const burger = document.getElementById('burger');
    const nav = document.querySelector('.nav');
    
    if (burger && nav) {
        burger.addEventListener('click', function() {
            nav.classList.toggle('active');
            burger.classList.toggle('active');
            
            // Анимация бургера
            const burgerLines = burger.querySelectorAll('.burger__line');
            if (nav.classList.contains('active')) {
                burgerLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                burgerLines[1].style.opacity = '0';
                burgerLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                burgerLines[0].style.transform = 'none';
                burgerLines[1].style.opacity = '1';
                burgerLines[2].style.transform = 'none';
            }
        });
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', function(event) {
            if (!nav.contains(event.target) && !burger.contains(event.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('active');
                
                const burgerLines = burger.querySelectorAll('.burger__line');
                burgerLines[0].style.transform = 'none';
                burgerLines[1].style.opacity = '1';
                burgerLines[2].style.transform = 'none';
            }
        });
    }
    
    // Слайдер популярных конкурсов (статическая реализация)
    const sliderDots = document.querySelectorAll('.slider__dot');
    const sliderSlides = document.querySelectorAll('.slider__slide');
    const sliderPrev = document.querySelector('.slider__prev');
    const sliderNext = document.querySelector('.slider__next');
    
    let currentSlide = 0;
    
    function showSlide(n) {
        // Скрываем все слайды
        sliderSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Убираем активный класс у всех точек
        sliderDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Корректируем индекс слайда
        if (n >= sliderSlides.length) {
            currentSlide = 0;
        } else if (n < 0) {
            currentSlide = sliderSlides.length - 1;
        } else {
            currentSlide = n;
        }
        
        // Показываем текущий слайд
        sliderSlides[currentSlide].classList.add('active');
        sliderDots[currentSlide].classList.add('active');
    }
    
    // Обработчики для точек
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Обработчики для кнопок вперед/назад
    if (sliderPrev) {
        sliderPrev.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
    }
    
    if (sliderNext) {
        sliderNext.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
    }
    
    // Автопереключение слайдов (опционально)
    // setInterval(() => {
    //     showSlide(currentSlide + 1);
    // }, 5000);
    
    // Слайдер отзывов (статическая реализация)
    const reviewsDots = document.querySelectorAll('.reviews-dot');
    const reviewCards = document.querySelectorAll('.review-card');
    const reviewsPrev = document.querySelector('.reviews-prev');
    const reviewsNext = document.querySelector('.reviews-next');
    
    let currentReview = 0;
    
    function showReview(n) {
        // Скрываем все отзывы
        reviewCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Убираем активный класс у всех точек
        reviewsDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Корректируем индекс отзыва
        if (n >= reviewCards.length) {
            currentReview = 0;
        } else if (n < 0) {
            currentReview = reviewCards.length - 1;
        } else {
            currentReview = n;
        }
        
        // Показываем текущий отзыв
        reviewCards[currentReview].classList.add('active');
        reviewsDots[currentReview].classList.add('active');
    }
    
    // Обработчики для точек отзывов
    reviewsDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showReview(index);
        });
    });
    
    // Обработчики для кнопок вперед/назад отзывов
    if (reviewsPrev) {
        reviewsPrev.addEventListener('click', () => {
            showReview(currentReview - 1);
        });
    }
    
    if (reviewsNext) {
        reviewsNext.addEventListener('click', () => {
            showReview(currentReview + 1);
        });
    }
    
    /*
    // Валидация форм
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            let isValid = true;
            
            // Валидация email
            if (!email.value || !isValidEmail(email.value)) {
                markInvalid(email, 'Введите корректный email');
                isValid = false;
            } else {
                markValid(email);
            }
            
            // Валидация пароля
            if (!password.value || password.value.length < 6) {
                markInvalid(password, 'Пароль должен содержать не менее 6 символов');
                isValid = false;
            } else {
                markValid(password);
            }
            
            if (isValid) {
                alert('Вход выполнен успешно!');
                // Здесь обычно отправка формы на сервер
                loginForm.reset();
            }
        });
    }
    
    // Вспомогательные функции для валидации
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function markInvalid(element, message) {
        element.classList.add('invalid');
        element.classList.remove('valid');
        
        // Удаляем предыдущее сообщение об ошибке
        const existingError = element.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Добавляем новое сообщение об ошибке
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        error.style.color = 'var(--color-error)';
        error.style.fontSize = '0.8rem';
        error.style.marginTop = '0.25rem';
        element.parentNode.appendChild(error);
    }
    
    function markValid(element) {
        element.classList.remove('invalid');
        element.classList.add('valid');
        
        // Удаляем сообщение об ошибке, если есть
        const existingError = element.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    */
    
    // Форма поиска
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput.value.trim()) {
                alert(`Поиск по запросу: "${searchInput.value}"`);
                // Здесь обычно отправка запроса поиска
            }
        });
    }
    
    // Форма подписки
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('newsletterEmail');
            const agreement = document.getElementById('privacyAgreement');
            let isValid = true;
            
            // Валидация email
            if (!email.value || !isValidEmail(email.value)) {
                markInvalid(email, 'Введите корректный email');
                isValid = false;
            } else {
                markValid(email);
            }
            
            // Валидация согласия
            if (!agreement.checked) {
                alert('Необходимо согласие на обработку персональных данных');
                isValid = false;
            }
            
            if (isValid) {
                alert('Спасибо за подписку!');
                // Здесь обычно отправка формы на сервер
                newsletterForm.reset();
            }
        });
    }
    
    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            if (this.getAttribute('href') === '#') return;
            
            event.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Закрываем меню на мобильных, если открыто
                    if (nav && nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        burger.classList.remove('active');
                        
                        const burgerLines = burger.querySelectorAll('.burger__line');
                        burgerLines[0].style.transform = 'none';
                        burgerLines[1].style.opacity = '1';
                        burgerLines[2].style.transform = 'none';
                    }
                    
                    // Прокрутка к элементу
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Добавляем стили для валидации
    const style = document.createElement('style');
    style.textContent = `
        .form-input.invalid {
            border-color: var(--color-error) !important;
            box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.2) !important;
        }
        
        .form-input.valid {
            border-color: var(--color-success) !important;
        }
    `;
    document.head.appendChild(style);
});