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





