:: Полное содержимое create-structure.bat:
@echo off
echo ========================================
echo   Создание структуры проекта
echo ========================================

:: 1. HTML файлы
echo Создаю HTML файлы...
echo ^<!DOCTYPE html^> > index.html
echo ^<html^>^<head^>^<title^>Главная^</title^>^</head^>^<body^>^</body^>^</html^> >> index.html
echo ^<!DOCTYPE html^> > index-light.html
echo ^<html^>^<head^>^<title^>Главная светлая^</title^>^</head^>^<body^>^</body^>^</html^> >> index-light.html
echo ^<!DOCTYPE html^> > registration.html
echo ^<html^>^<head^>^<title^>Регистрация^</title^>^</head^>^<body^>^</body^>^</html^> >> registration.html
echo ^<!DOCTYPE html^> > schedule.html
echo ^<html^>^<head^>^<title^>Расписание^</title^>^</head^>^<body^>^</body^>^</html^> >> schedule.html
echo ^<!DOCTYPE html^> > account.html
echo ^<html^>^<head^>^<title^>Личный кабинет^</title^>^</head^>^<body^>^</body^>^</html^> >> account.html
echo ^<!DOCTYPE html^> > competition.html
echo ^<html^>^<head^>^<title^>Конкурс^</title^>^</head^>^<body^>^</body^>^</html^> >> competition.html
echo ^<!DOCTYPE html^> > 404.html
echo ^<html^>^<head^>^<title^>404^</title^>^</head^>^<body^>^</body^>^</html^> >> 404.html

:: 2. Папка CSS
echo Создаю папку CSS...
mkdir css 2>nul
cd css
echo /* main.css */ > main.css
echo /* themes.css */ > themes.css
echo /* responsive.css */ > responsive.css
cd ..

:: 3. Папка JS
echo Создаю папку JS...
mkdir js 2>nul
cd js
echo // main.js > main.js
echo // theme-switcher.js > theme-switcher.js
echo // form-validation.js > form-validation.js
cd ..

:: 4. Остальные папки
echo Создаю остальные папки...
mkdir media 2>nul
mkdir media\images 2>nul
mkdir media\fonts 2>nul
mkdir media\video 2>nul
echo. > media\images\.gitkeep
echo. > media\fonts\.gitkeep
echo. > media\video\.gitkeep

mkdir creative 2>nul
cd creative
type nul > index.png
type nul > index-light.png
type nul > registration.png
type nul > schedule.png
type nul > account.png
type nul > competition.png
type nul > 404.png
cd ..

mkdir tasks 2>nul
cd tasks
echo ^<!DOCTYPE html^> > task1.html
echo ^<html^>^<head^>^<title^>Task 1^</title^>^</head^>^<body^>^</body^>^</html^> >> task1.html
mkdir task2 2>nul
echo. > task2\.gitkeep
echo ^<!DOCTYPE html^> > task3.html
echo ^<html^>^<head^>^<title^>Task 3^</title^>^</head^>^<body^>^</body^>^</html^> >> task3.html
echo ^<!DOCTYPE html^> > task4.html
echo ^<html^>^<head^>^<title^>Task 4^</title^>^</head^>^<body^>^</body^>^</html^> >> task4.html
echo ^<!DOCTYPE html^> > task5.html
echo ^<html^>^<head^>^<title^>Task 5^</title^>^</head^>^<body^>^</body^>^</html^> >> task5.html
echo ^<!DOCTYPE html^> > task6.html
echo ^<html^>^<head^>^<title^>Task 6^</title^>^</head^>^<body^>^</body^>^</html^> >> task6.html
cd ..

:: 5. Файл CNAME
echo. > CNAME

echo ========================================
echo   Структура создана успешно!
echo ========================================
echo.
dir /b