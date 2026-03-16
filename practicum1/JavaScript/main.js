document.addEventListener("DOMContentLoaded", function() {

    createTable(buildings, 'list');

    const filterForm = document.getElementById('filter');

    const sortForm = document.getElementById('sort');

    const findButton = filterForm.querySelector('input[value="Найти"]');

    const clearButton = filterForm.querySelector('input[value="Очистить фильтры"]');

    const sortButton = sortForm.querySelector('input[value="Сортировать"]');

    const resetSortButton = sortForm.querySelector('input[value="Сбросить сортировку"]');

    setSortSelects(buildings[0], sortForm);

    const firstSortSelect = sortForm.querySelector('select');

    firstSortSelect.addEventListener('change', function() {
        changeNextSelect(this, 'fieldsSecond');
    });

    findButton.addEventListener('click', function() {
        resetSort('list', sortForm, filterForm, buildings);
    });

    clearButton.addEventListener('click', function() {
        resetSort('list', sortForm, filterForm, buildings);
        clearFilter('list', buildings, filterForm);
    });

    sortButton.addEventListener('click', function() {
        filterTable(buildings, 'list', filterForm);
        sortTable('list', sortForm);
    });

    resetSortButton.addEventListener('click', function() {
        resetSort('list', sortForm, filterForm, buildings);
    });
    
});

// формирование полей элемента списка с заданным текстом и значением

const createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}

// формирование поля со списком 
// параметры – массив со значениями элементов списка и элемент select

const setSortSelect = (arr, sortSelect) => {
    
    // создаем OPTION Нет и добавляем ее в SELECT
    sortSelect.append(createOption('Нет', 0));
    // перебираем массив со значениями опций
     arr.forEach((item, index) => {
       // создаем OPTION из очередного ключа и добавляем в SELECT
       // значение атрибута VALUE увеличиваем на 1, так как значение 0 имеет опция Нет
        sortSelect.append(createOption(item, index + 1));
    });
}

// формируем поля со списком для многоуровневой сортировки
const setSortSelects = (data, dataForm) => { 

    // выделяем ключи словаря в массив
    const head = Object.keys(data);

    // находим все SELECT в форме
    const allSelect = dataForm.getElementsByTagName('select');
    
    for(const item of dataForm.elements){
        // формируем очередной SELECT
        setSortSelect(head, item);
		
        // САМОСТОЯТЕЛЬНО все SELECT, кроме первого, сделать неизменяемым
        if (item.tagName === 'SELECT' && item !== allSelect[0]) {
            item.disabled = true;
        }
    }
}

const changeNextSelect = (curSelect, nextSelectId) => {
    
    let nextSelect = document.getElementById(nextSelectId);
    
    nextSelect.disabled = false;

    nextSelect.innerHTML = curSelect.innerHTML;
    if (curSelect.value != 0) {
       nextSelect.remove(curSelect.value);
    } else {
        nextSelect.disabled = true;
    }
}



