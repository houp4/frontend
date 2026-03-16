const createSortArr = (data) => {
    let sortArr = [];
    
    const sortSelects = data.getElementsByTagName('select');
    
    for (const item of sortSelects) {   
       // получаем номер выбранной опции
        const keySort = item.value;
        // в случае, если выбрана опция Нет, заканчиваем формировать массив
        if (keySort == 0) {
            break;
        }
        // получаем порядок сортировки очередного уровня
        // имя флажка сформировано как имя поля SELECT и слова Desc
        const desc = document.getElementById(item.id + 'Desc').checked;
        // очередной элемент массива - по какому столбцу и в каком порядке сортировать 
        sortArr.push(
          {column: keySort - 1, 
           direction: desc}
        ); 
    }
    return sortArr; 
};

const sortTable = (idTable, formData) => {
    
    // формируем управляющий массив для сортировки
    const sortArr = createSortArr(formData);
    
    // сортировать таблицу не нужно, во всех полях выбрана опция Нет
    if (sortArr.length === 0) {
        filterTable(buildings, idTable, document.getElementById('filter'));
        return false;
    }
    
    // находим нужную таблицу
    let table = document.getElementById(idTable);

    // преобразуем строки таблицы в массив 
    let rowData = Array.from(table.rows);
    
    // удаляем элемент с заголовками таблицы
     const headerRow = rowData.shift();
    
    // сортируем данные по всем уровням сортировки
    rowData.sort((first, second) => {
        for (let { column, direction } of sortArr) {
           const firstCell = first.cells[column].innerHTML;
           const secondCell = second.cells[column].innerHTML;

           const firstNum = parseFloat(firstCell);
           const secondNum = parseFloat(secondCell);
           
           let comparison;
           
           if (!isNaN(firstNum) && !isNaN(secondNum)) {
               comparison = firstNum - secondNum;
           } else {
               comparison = firstCell.localeCompare(secondCell);
           }
           
           if (comparison !== 0) {
             return (direction ? -comparison : comparison);
          }
        }
        return 0; 
    });
    
    // выводим отсортированную таблицу на страницу
    table.append(headerRow);
	
	let tbody = document.createElement('tbody');
    rowData.forEach(item => {
        tbody.append(item);
    });
	table.append(tbody);
}

const resetSort = (idTable, sortForm, filterForm, data) => {
    
    const allSelects = sortForm.getElementsByTagName('select');
    for (let i = 0; i < allSelects.length; i++) {
        allSelects[i].value = 0;
        if (i > 0) {
            allSelects[i].disabled = true;
        }
    }

    const allCheckboxes = sortForm.querySelectorAll('input[type="checkbox"]');
    allCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    filterTable(data, idTable, filterForm);
}