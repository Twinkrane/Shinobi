// Функция для загрузки данных из localStorage
function loadInputs() {
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    inputs.forEach(input => {
        const storedValue = localStorage.getItem(input.id);
        if (storedValue) {
            input.value = storedValue; // Устанавливаем значение из localStorage
        }
    });

    // Загрузка состояния чекбоксов
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        const storedChecked = localStorage.getItem(checkbox.id);
        checkbox.checked = storedChecked === 'true'; // Устанавливаем состояние чекбокса
    });

    // Загрузка сохраненного значения для выпадающего списка "Броня"
    const armorSelect = document.getElementById('armor-select');
    const savedArmor = localStorage.getItem('armor-select');
    if (savedArmor) {
        armorSelect.value = savedArmor;
    }

    // Загрузка сохраненного значения для выпадающего списка "Продвижение"
    const promotionSelect = document.getElementById('promotion-select');
    const savedPromotion = localStorage.getItem('promotion-select'); // Убедитесь, что ключ совпадает
    if (savedPromotion) {
        promotionSelect.value = savedPromotion;
    }

    const rankSelect = document.getElementById('rank-select');
    const savedRank = localStorage.getItem('rank-select'); // Убедитесь, что ключ совпадает
    if (savedRank) {
        rankSelect.value = savedRank;
    }

    const mercsSelect = document.getElementById('mercs-select');
    const savedMercs = localStorage.getItem('mercs-select'); // Убедитесь, что ключ совпадает
    if (savedMercs) {
        mercsSelect.value = savedMercs;
    }

}

// Функция для сохранения данных в localStorage
function saveInput(event) {
    const inputId = event.target.id; // Получаем ID поля ввода
    localStorage.setItem(inputId, event.target.value); // Сохраняем значение в localStorage
}

// Функция для сохранения состояния чекбокса
function saveCheckbox(event) {
    const checkboxId = event.target.id; // Получаем ID чекбокса
    localStorage.setItem(checkboxId, event.target.checked); // Сохраняем состояние чекбокса в localStorage
}

// Функция для сохранения значения выпадающего списка
function saveSelect(event) {
    const selectId = event.target.id; // Получаем ID выпадающего списка
    localStorage.setItem(selectId, event.target.value); // Сохраняем значение в localStorage
}

// Функция для очистки localStorage
function clearStorage() {
    // Всплывающее предупреждение
    const confirmClear = confirm("Вы хотите удалить этого персонажа?");
    
    if (confirmClear) {
        localStorage.clear(); // Очищаем localStorage
        const inputs = document.querySelectorAll('input[type="text"], textarea');
        inputs.forEach(input => {
            input.value = ''; // Очищаем значения полей ввода
        });

        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false; // Сбрасываем состояние чекбоксов
        });

        // Сбрасываем значение выпадающих списков на "Без брони"
        const armorSelect = document.getElementById('armor-select');
        armorSelect.value = ""; // Устанавливаем значение по умолчанию

        const promotionSelect = document.getElementById('promotion-select');
        promotionSelect.value = ""; // Устанавливаем значение по умолчанию

        const rankSelect = document.getElementById('rank-select');
        rankSelect.value = "0"; // Устанавливаем значение по умолчанию

        const mercsSelect = document.getElementById('mercs-select');
        mercsSelect.value = ""; // Устанавливаем значение по умолчанию
    }
}








// Добавляем обработчик события для кнопки очистки
document.getElementById('clearStorage').addEventListener('click', clearStorage);

// Добавляем обработчики событий для каждого input
const inputs = document.querySelectorAll('input[type="text"], textarea');
inputs.forEach(input => {
    input.addEventListener('input', saveInput); // Сохраняем при вводе текста
});

// Добавляем обработчики событий для чекбоксов
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', saveCheckbox); // Сохраняем состояние чекбокса
});

// Загружаем данные при загрузке страницы
window.onload = loadInputs;

// Добавляем обработчики событий для select элементов
const armorSelect = document.getElementById('armor-select');
armorSelect.addEventListener('change', saveSelect);

const promotionSelect = document.getElementById('promotion-select');
promotionSelect.addEventListener('change', saveSelect);

const rankSelect = document.getElementById('rank-select');
rankSelect.addEventListener('change', saveSelect);

const mercsSelect = document.getElementById('mercs-select');
mercsSelect.addEventListener('change', saveSelect);












// Функция для выгрузки данных
function exportData() {
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    const data = {};

    inputs.forEach(input => {
        data[input.id] = input.value;
    });

    const json = JSON.stringify(data, null, 2); // Преобразуем объект в JSON
    const blob = new Blob([json], { type: 'application/json' }); // Создаем Blob
    const url = URL.createObjectURL(blob); // Создаем URL для Blob

    const a = document.createElement('a'); // Создаем ссылку для скачивания
    a.href = url;
    a.download = 'character_data.json'; // Имя файла для скачивания
    document.body.appendChild(a);
    a.click(); // Имитируем клик для скачивания
    document.body.removeChild(a); // Удаляем ссылку
}

// Функция для загрузки данных
function importData(event) {
    const file = event.target.files[0];
    if (!file) {
        return; // Если файл не выбран, выходим
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result); // Парсим JSON
            for (const key in data) {
                const input = document.getElementById(key);
                if (input) {
                    input.value = data[key]; // Устанавливаем значение в поле ввода
                }
            }
        } catch (error) {
            alert('Ошибка загрузки данных: ' + error.message);
        }
    };
    reader.readAsText(file); // Читаем файл как текст
}

// Добавляем обработчики событий для кнопок
document.getElementById('exportData').addEventListener('click', exportData);
document.getElementById('importData').addEventListener('change', importData);
document.getElementById('importDataButton').addEventListener('click', () => {
    document.getElementById('importData').click(); // Имитируем клик на скрытом input
});

