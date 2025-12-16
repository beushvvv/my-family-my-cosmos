// Формы валидации для сайта "Моя семья – мой космос"

/**
 * Проверка email
 * @param {string} email - Email для проверки
 * @returns {boolean} - Валидный ли email
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Проверка пароля на минимальную сложность
 * @param {string} password - Пароль для проверки
 * @returns {object} - Объект с результатом проверки
 */
function validatePassword(password) {
    const result = {
        isValid: true,
        errors: [],
        strength: 0
    };
    
    if (password.length < 6) {
        result.isValid = false;
        result.errors.push('Пароль должен содержать не менее 6 символов');
    }
    
    // Проверка сложности пароля
    let strength = 0;
    if (password.length >= 6) strength += 20;
    if (password.length >= 8) strength += 20;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 20;
    if (/\d/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    
    result.strength = Math.min(strength, 100);
    
    return result;
}

/**
 * Проверка совпадения паролей
 * @param {string} password - Пароль
 * @param {string} confirmPassword - Подтверждение пароля
 * @returns {boolean} - Совпадают ли пароли
 */
function passwordsMatch(password, confirmPassword) {
    return password === confirmPassword;
}

/**
 * Проверка возраста
 * @param {number} age - Возраст
 * @param {number} minAge - Минимальный возраст
 * @param {number} maxAge - Максимальный возраст
 * @returns {boolean} - Валидный ли возраст
 */
function isValidAge(age, minAge = 0, maxAge = 120) {
    return age >= minAge && age <= maxAge;
}

/**
 * Проверка даты рождения
 * @param {string} dateString - Дата в формате YYYY-MM-DD
 * @param {number} minAge - Минимальный возраст
 * @param {number} maxAge - Максимальный возраст
 * @returns {object} - Результат проверки
 */
function isValidBirthDate(dateString, minAge = 0, maxAge = 120) {
    const result = {
        isValid: false,
        age: 0,
        errors: []
    };
    
    if (!dateString) {
        result.errors.push('Дата рождения не указана');
        return result;
    }
    
    const birthDate = new Date(dateString);
    const today = new Date();
    
    // Проверка, что дата валидна
    if (isNaN(birthDate.getTime())) {
        result.errors.push('Некорректная дата рождения');
        return result;
    }
    
    // Проверка, что дата не в будущем
    if (birthDate > today) {
        result.errors.push('Дата рождения не может быть в будущем');
        return result;
    }
    
    // Вычисление возраста
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    result.age = age;
    
    // Проверка возраста
    if (age < minAge || age > maxAge) {
        result.errors.push(`Возраст должен быть от ${minAge} до ${maxAge} лет`);
        return result;
    }
    
    result.isValid = true;
    return result;
}

/**
 * Показать сообщение об ошибке
 * @param {HTMLElement} element - Элемент, к которому относится ошибка
 * @param {string} message - Сообщение об ошибке
 */
function showError(element, message) {
    if (!element) return;
    
    // Удаляем предыдущие сообщения об ошибке
    removeError(element);
    
    // Добавляем класс ошибки
    element.classList.add('invalid');
    element.classList.remove('valid');
    
    // Создаем элемент с сообщением об ошибке
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--color-error)';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.25rem';
    
    // Добавляем сообщение после элемента
    element.parentNode.appendChild(errorElement);
    
    // Прокручиваем к элементу с ошибкой
    setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
    }, 100);
}

/**
 * Показать успешную валидацию
 * @param {HTMLElement} element - Элемент, который прошел валидацию
 */
function showSuccess(element) {
    if (!element) return;
    removeError(element);
    element.classList.remove('invalid');
    element.classList.add('valid');
}

/**
 * Удалить сообщение об ошибке
 * @param {HTMLElement} element - Элемент, для которого удаляем ошибку
 */
function removeError(element) {
    if (!element) return;
    
    element.classList.remove('invalid', 'valid');
    
    // Удаляем элемент с сообщением об ошибке
    const existingError = element.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

/**
 * Валидация поля в реальном времени
 * @param {HTMLElement} input - Поле для валидации
 * @param {function} validator - Функция валидации
 */
function validateOnInput(input, validator) {
    if (!input) return;
    
    input.addEventListener('input', function() {
        const value = this.value.trim();
        
        if (!value) {
            removeError(this);
            return;
        }
        
        const result = validator(value);
        if (result.isValid) {
            showSuccess(this);
        } else {
            showError(this, result.errors[0] || 'Неверное значение');
        }
    });
    
    input.addEventListener('blur', function() {
        const value = this.value.trim();
        
        if (!value) {
            removeError(this);
            return;
        }
        
        const result = validator(value);
        if (!result.isValid) {
            showError(this, result.errors[0] || 'Неверное значение');
        }
    });
}

// Специфичные валидаторы для разных полей

// Валидатор для email
function emailValidator(email) {
    const result = {
        isValid: true,
        errors: []
    };
    
    if (!email) {
        result.isValid = false;
        result.errors.push('Email обязателен для заполнения');
    } else if (!isValidEmail(email)) {
        result.isValid = false;
        result.errors.push('Введите корректный email адрес');
    }
    
    return result;
}

// Валидатор для пароля
function passwordValidator(password) {
    return validatePassword(password);
}

// Валидатор для возраста
function ageValidator(age) {
    const result = {
        isValid: true,
        errors: []
    };
    
    const ageNum = parseInt(age, 10);
    
    if (!age || isNaN(ageNum)) {
        result.isValid = false;
        result.errors.push('Возраст обязателен для заполнения');
    } else if (!isValidAge(ageNum)) {
        result.isValid = false;
        result.errors.push('Возраст должен быть от 0 до 120 лет');
    }
    
    return result;
}

// Валидатор для текстового поля (обязательное)
function requiredTextValidator(text) {
    const result = {
        isValid: true,
        errors: []
    };
    
    if (!text) {
        result.isValid = false;
        result.errors.push('Это поле обязательно для заполнения');
    } else if (text.length < 2) {
        result.isValid = false;
        result.errors.push('Минимальная длина 2 символа');
    }
    
    return result;
}

/**
 * Инициализация валидации для формы
 * @param {HTMLElement} form - Форма для валидации
 */
function initFormValidation(form) {
    if (!form) return;
    
    // Получаем все обязательные поля
    const requiredInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    // Добавляем обработчик отправки формы
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let isValid = true;
        const errors = [];
        
        // Проверяем все обязательные поля
        requiredInputs.forEach(input => {
            const value = input.value.trim();
            
            // Пропускаем скрытые поля и отключенные
            if (input.type === 'hidden' || input.disabled) {
                return;
            }
            
            // Проверка в зависимости от типа поля
            switch (input.type) {
                case 'email':
                    if (!value || !isValidEmail(value)) {
                        isValid = false;
                        showError(input, 'Введите корректный email адрес');
                        errors.push('Некорректный email');
                    } else {
                        showSuccess(input);
                    }
                    break;
                    
                case 'password':
                    const passwordResult = validatePassword(value);
                    if (!passwordResult.isValid) {
                        isValid = false;
                        showError(input, passwordResult.errors[0] || 'Неверный пароль');
                        errors.push('Некорректный пароль');
                    } else {
                        showSuccess(input);
                    }
                    break;
                    
                case 'checkbox':
                    if (!input.checked) {
                        isValid = false;
                        showError(input, 'Это поле обязательно');
                        errors.push('Необходимо согласие');
                    } else {
                        showSuccess(input);
                    }
                    break;
                    
                case 'radio':
                    const radioName = input.name;
                    const radioGroup = form.querySelectorAll(`input[name="${radioName}"]`);
                    const isRadioChecked = Array.from(radioGroup).some(radio => radio.checked);
                    
                    if (!isRadioChecked) {
                        isValid = false;
                        const firstRadio = radioGroup[0];
                        showError(firstRadio, 'Выберите один из вариантов');
                        errors.push('Не выбран вариант');
                    } else {
                        radioGroup.forEach(radio => showSuccess(radio));
                    }
                    break;
                    
                default:
                    if (!value) {
                        isValid = false;
                        showError(input, 'Это поле обязательно для заполнения');
                        errors.push('Пустое обязательное поле');
                    } else {
                        showSuccess(input);
                    }
            }
        });
        
        // Специальная проверка для подтверждения пароля
        const passwordInput = form.querySelector('input[type="password"][name="password"]');
        const confirmPasswordInput = form.querySelector('input[type="password"][name="confirmPassword"]');
        
        if (passwordInput && confirmPasswordInput && 
            passwordInput.value && confirmPasswordInput.value) {
            if (!passwordsMatch(passwordInput.value, confirmPasswordInput.value)) {
                isValid = false;
                showError(confirmPasswordInput, 'Пароли не совпадают');
                errors.push('Пароли не совпадают');
            } else {
                showSuccess(confirmPasswordInput);
            }
        }
        
        // Проверка даты рождения, если есть
        const birthDateInput = form.querySelector('input[type="date"][name="birthDate"]');
        if (birthDateInput && birthDateInput.value) {
            const birthDateResult = isValidBirthDate(birthDateInput.value);
            if (!birthDateResult.isValid) {
                isValid = false;
                showError(birthDateInput, birthDateResult.errors[0] || 'Некорректная дата рождения');
                errors.push('Некорректная дата рождения');
            } else {
                showSuccess(birthDateInput);
            }
        }
        
        // Если форма валидна, отправляем данные
        if (isValid) {
            // Здесь обычно отправка данных на сервер
            console.log('Форма валидна, отправка данных...');
            
            // Показываем сообщение об успехе
            showFormMessage(form, 'success', 'Форма успешно отправлена!');
            
            // Сбрасываем форму
            form.reset();
            
            // Удаляем сообщение через 5 секунд
            setTimeout(() => {
                hideFormMessage(form);
            }, 5000);
        } else {
            // Показываем сообщение об ошибке
            const errorMessage = errors.length > 0 
                ? `Ошибки: ${errors.join(', ')}`
                : 'Пожалуйста, исправьте ошибки в форме';
            
            showFormMessage(form, 'error', errorMessage);
        }
    });
    
    // Добавляем валидацию в реальном времени для email полей
    const emailInputs = form.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        validateOnInput(input, emailValidator);
    });
    
    // Добавляем валидацию в реальном времени для паролей
    const passwordInputs = form.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        validateOnInput(input, passwordValidator);
    });
    
    // Добавляем валидацию в реальном времени для текстовых полей
    const textInputs = form.querySelectorAll('input[type="text"], input[type="number"]');
    textInputs.forEach(input => {
        if (input.hasAttribute('required')) {
            validateOnInput(input, requiredTextValidator);
        }
    });
    
    // Обработчик сброса формы
    form.addEventListener('reset', function() {
        // Удаляем все сообщения об ошибках
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        // Убираем классы валидации
        const validationInputs = form.querySelectorAll('.invalid, .valid');
        validationInputs.forEach(input => {
            input.classList.remove('invalid', 'valid');
        });
        
        // Скрываем сообщения формы
        hideFormMessage(form);
    });
}

/**
 * Показать сообщение формы
 * @param {HTMLElement} form - Форма
 * @param {string} type - Тип сообщения (success, error, warning)
 * @param {string} message - Текст сообщения
 */
function showFormMessage(form, type, message) {
    // Удаляем предыдущие сообщения
    hideFormMessage(form);
    
    // Создаем элемент сообщения
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message--${type}`;
    messageElement.innerHTML = `
        <div class="form-message__content">
            <i class="fas ${getMessageIcon(type)}"></i>
            <div>
                <h4>${getMessageTitle(type)}</h4>
                <p>${message}</p>
            </div>
        </div>
        <button class="form-message__close" aria-label="Закрыть">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Добавляем стили
    messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        background-color: ${getMessageColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Стили для контента
    const contentStyle = messageElement.querySelector('.form-message__content');
    contentStyle.style.display = 'flex';
    contentStyle.style.alignItems = 'flex-start';
    contentStyle.style.gap = '0.75rem';
    contentStyle.style.flex = '1';
    
    // Стили для иконки
    const iconStyle = messageElement.querySelector('.form-message__content i');
    iconStyle.style.fontSize = '1.5rem';
    iconStyle.style.marginTop = '0.125rem';
    
    // Стили для текста
    const textStyle = messageElement.querySelector('.form-message__content div');
    textStyle.style.flex = '1';
    
    // Стили для заголовка
    const titleStyle = textStyle.querySelector('h4');
    titleStyle.style.margin = '0 0 0.25rem 0';
    titleStyle.style.fontSize = '1rem';
    
    // Стили для параграфа
    const pStyle = textStyle.querySelector('p');
    pStyle.style.margin = '0';
    pStyle.style.fontSize = '0.9rem';
    pStyle.style.opacity = '0.9';
    
    // Стили для кнопки закрытия
    const closeBtn = messageElement.querySelector('.form-message__close');
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.color = 'inherit';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.padding = '0';
    closeBtn.style.fontSize = '1rem';
    
    // Обработчик закрытия
    closeBtn.addEventListener('click', function() {
        messageElement.remove();
    });
    
    // Добавляем в DOM
    document.body.appendChild(messageElement);
    
    // Автоматически закрываем через 5 секунд
    setTimeout(() => {
        if (document.body.contains(messageElement)) {
            messageElement.remove();
        }
    }, 5000);
}

/**
 * Скрыть сообщения формы
 * @param {HTMLElement} form - Форма
 */
function hideFormMessage(form) {
    const messages = document.querySelectorAll('.form-message');
    messages.forEach(message => message.remove());
}

/**
 * Получить иконку для типа сообщения
 * @param {string} type - Тип сообщения
 * @returns {string} - Класс иконки
 */
function getMessageIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

/**
 * Получить заголовок для типа сообщения
 * @param {string} type - Тип сообщения
 * @returns {string} - Заголовок
 */
function getMessageTitle(type) {
    switch (type) {
        case 'success': return 'Успешно!';
        case 'error': return 'Ошибка!';
        case 'warning': return 'Внимание!';
        default: return 'Информация';
    }
}

/**
 * Получить цвет для типа сообщения
 * @param {string} type - Тип сообщения
 * @returns {string} - Цвет в формате rgba
 */
function getMessageColor(type) {
    switch (type) {
        case 'success': return 'rgba(76, 175, 80, 0.95)';
        case 'error': return 'rgba(244, 67, 54, 0.95)';
        case 'warning': return 'rgba(255, 152, 0, 0.95)';
        default: return 'rgba(33, 150, 243, 0.95)';
    }
}

/**
 * Специальная валидация для формы регистрации
 * @param {HTMLElement} form - Форма регистрации
 */
function initRegistrationFormValidation(form) {
    if (!form) return;
    
    // Валидация загруженной фотографии
    const photoInput = form.querySelector('input[type="file"][accept="image/*"]');
    if (photoInput) {
        photoInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                const file = this.files[0];
                
                // Проверка размера файла (максимум 5 MB)
                if (file.size > 5 * 1024 * 1024) {
                    showError(this, 'Размер файла не должен превышать 5 MB');
                    this.value = '';
                }
                // Проверка типа файла
                else if (!file.type.startsWith('image/')) {
                    showError(this, 'Пожалуйста, выберите файл изображения');
                    this.value = '';
                } else {
                    showSuccess(this);
                }
            }
        });
    }
    
    // Динамическая проверка полей членов семьи
    const addMemberBtn = form.querySelector('#addFamilyMember');
    if (addMemberBtn) {
        addMemberBtn.addEventListener('click', function() {
            // После добавления нового члена семьи инициализируем валидацию для его полей
            setTimeout(() => {
                const newMember = form.querySelector('.family-member:last-child');
                if (newMember) {
                    initFamilyMemberValidation(newMember);
                }
            }, 0);
        });
    }
    
    // Инициализация валидации для существующих членов семьи
    const existingMembers = form.querySelectorAll('.family-member');
    existingMembers.forEach(member => {
        initFamilyMemberValidation(member);
    });
    
    // Общая валидация формы
    initFormValidation(form);
}

/**
 * Инициализация валидации для члена семьи
 * @param {HTMLElement} memberElement - Элемент члена семьи
 */
function initFamilyMemberValidation(memberElement) {
    if (!memberElement) return;
    
    const inputs = memberElement.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        if (input.hasAttribute('required')) {
            validateOnInput(input, requiredTextValidator);
        }
    });
}

/**
 * Инициализация валидации для формы входа
 * @param {HTMLElement} form - Форма входа
 */
function initLoginFormValidation(form) {
    if (!form) return;
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = this.querySelector('input[type="email"]');
        const password = this.querySelector('input[type="password"]');
        let isValid = true;
        
        if (!email || !email.value || !isValidEmail(email.value)) {
            showError(email, 'Введите корректный email адрес');
            isValid = false;
        } else {
            showSuccess(email);
        }
        
        if (!password || !password.value || password.value.length < 6) {
            showError(password, 'Пароль должен содержать не менее 6 символов');
            isValid = false;
        } else {
            showSuccess(password);
        }
        
        if (isValid) {
            // Имитация успешного входа
            showFormMessage(this, 'success', 'Вход выполнен успешно!');
            
            // Перенаправление на личный кабинет через 1 секунду
            setTimeout(() => {
                // Только если мы не на странице account.html
                if (!window.location.pathname.includes('account.html')) {
                    window.location.href = 'account.html';
                } else {
                    form.reset();
                }
            }, 1000);
        } else {
            showFormMessage(this, 'error', 'Пожалуйста, проверьте email и пароль');
        }
    });
}

/**
 * Инициализация валидации для формы подписки на новости
 * @param {HTMLElement} form - Форма подписки
 */
function initNewsletterFormValidation(form) {
    if (!form) return;
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = this.querySelector('input[type="email"]');
        const agreement = this.querySelector('input[type="checkbox"]');
        let isValid = true;
        
        if (!email || !email.value || !isValidEmail(email.value)) {
            showError(email, 'Введите корректный email адрес');
            isValid = false;
        } else {
            showSuccess(email);
        }
        
        if (!agreement || !agreement.checked) {
            showError(agreement, 'Необходимо согласие на обработку данных');
            isValid = false;
        } else {
            showSuccess(agreement);
        }
        
        if (isValid) {
            showFormMessage(this, 'success', 'Вы успешно подписались на новости!');
            this.reset();
        }
    });
}

/**
 * Инициализация валидации для формы поиска
 * @param {HTMLElement} form - Форма поиска
 */
function initSearchFormValidation(form) {
    if (!form) return;
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const searchInput = this.querySelector('input[type="text"], .search-input');
        
        if (!searchInput || !searchInput.value.trim()) {
            showError(searchInput, 'Введите поисковый запрос');
            return;
        }
        
        // Имитация поиска
        showFormMessage(this, 'info', `Выполняется поиск: "${searchInput.value}"`);
        
        // Очищаем поле
        searchInput.value = '';
    });
}

/**
 * Инициализация валидации для формы бронирования
 * @param {HTMLElement} form - Форма бронирования
 */
function initBookingFormValidation(form) {
    if (!form) return;
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const competitionSelect = this.querySelector('select');
        const timeSelect = this.querySelector('select[name="time"]');
        const participantsInput = this.querySelector('input[type="number"]');
        let isValid = true;
        
        if (!competitionSelect || !competitionSelect.value) {
            showError(competitionSelect, 'Выберите конкурс');
            isValid = false;
        } else {
            showSuccess(competitionSelect);
        }
        
        if (!timeSelect || !timeSelect.value) {
            showError(timeSelect, 'Выберите время');
            isValid = false;
        } else {
            showSuccess(timeSelect);
        }
        
        if (!participantsInput || !participantsInput.value || 
            participantsInput.value < 1 || participantsInput.value > 10) {
            showError(participantsInput, 'Укажите количество человек от 1 до 10');
            isValid = false;
        } else {
            showSuccess(participantsInput);
        }
        
        if (isValid) {
            showFormMessage(this, 'success', 'Запись на конкурс успешно оформлена!');
            form.reset();
        }
    });
}

/**
 * Инициализация валидации отдельных полей без формы
 */
function initStandaloneValidation() {
    // Валидация полей ввода в реальном времени
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        if (!input.closest('form')) {
            validateOnInput(input, emailValidator);
        }
    });
    
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        if (!input.closest('form')) {
            validateOnInput(input, passwordValidator);
        }
    });
}

// Добавляем CSS анимацию
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    .form-message--closing {
        animation: fadeOut 0.3s ease forwards;
    }
`;
document.head.appendChild(style);

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('Form validation initialized on:', window.location.pathname);
    
    // Инициализация всех форм на странице
    const forms = document.querySelectorAll('form');
    console.log('Found forms:', forms.length);
    
    forms.forEach((form, index) => {
        console.log(`Form ${index + 1}:`, form.id || form.className || 'unnamed');
        
        // Для каждой формы определяем ее тип и применяем соответствующую валидацию
        if (form.id === 'registrationForm' || form.classList.contains('registration-form')) {
            console.log('Initializing registration form validation');
            initRegistrationFormValidation(form);
        } else if (form.id === 'loginForm' || (form.querySelector('input[type="email"]') && form.querySelector('input[type="password"]'))) {
            console.log('Initializing login form validation');
            initLoginFormValidation(form);
        } else if (form.id === 'newsletterForm' || (form.querySelector('input[type="email"]') && form.querySelector('input[type="checkbox"]'))) {
            console.log('Initializing newsletter form validation');
            initNewsletterFormValidation(form);
        } else if (form.id === 'searchForm' || form.classList.contains('search-form')) {
            console.log('Initializing search form validation');
            initSearchFormValidation(form);
        } else if (form.id === 'bookingForm' || form.classList.contains('booking-form')) {
            console.log('Initializing booking form validation');
            initBookingFormValidation(form);
        } else {
            // Общая валидация для остальных форм
            console.log('Initializing general form validation');
            initFormValidation(form);
        }
    });
    
    // Если на странице есть отдельные поля валидации (без формы)
    initStandaloneValidation();
    
    console.log('Form validation setup complete');
});