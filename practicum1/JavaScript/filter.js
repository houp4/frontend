const correspond = {
    "Название": "structure",
    "Тип": "category",
    "Страна": "country",
    "Город": "city",
    "Год": ["yearFrom", "yearTo"],
    "Высота": ["heightFrom", "heightTo"]
}

const dataFilter = (dataForm) => {
    
    let dictFilter = {};

    // перебираем все элементы формы с фильтрами
    for (const item of dataForm.elements) {
        
        // получаем значение элемента
        let valInput = item.value;

        // если поле типа text - приводим его значение к нижнему регистру
        if (item.type === "text") {
            valInput = valInput.toLowerCase();
        } 
        // САМОСТОЯТЕЛЬНО обработать значения числовых полей:
        else if (item.type === "number") {
            if (valInput === '') {
                if (item.id.includes('From')) {
                    valInput = -Infinity;
                }
                else if (item.id.includes('To')) {
                    valInput = Infinity;
                }
            } 
            else {
                valInput = Number(valInput);
            }
        }

        // формируем очередной элемент ассоциативного массива
        dictFilter[item.id] = valInput;
    }       
    return dictFilter;
}

const filterTable = (data, idTable, dataForm) =>{
    
    // получаем данные из полей формы
    const datafilter = dataFilter(dataForm);
    
    // выбираем данные соответствующие фильтру и формируем таблицу из них
    let tableFilter = data.filter(item => {

        /* в этой переменной будут "накапливаться" результаты сравнения данных
           с параметрами фильтра */
        let result = true;
        
        // строка соответствует фильтру, если сравнение всех значения из input 
        // со значением ячейки очередной строки - истина
         Object.entries(item).map(([key, val]) => {
            
            // текстовые поля проверяем на вхождение
            if (typeof val == 'string') {
                const filterValue = datafilter[correspond[key]];
                if (filterValue && filterValue !== '') {
                    result &&= val.toLowerCase().includes(filterValue);
                }
            }
			
            // САМОСТОЯТЕЛЬНО проверить числовые поля на принадлежность интервалу
            if (typeof val == 'number') {
                if (key === "Год") {
                    const from = datafilter['yearFrom'];
                    const to = datafilter['yearTo'];
                    if (from !== -Infinity || to !== Infinity) {
                        result &&= (val >= from && val <= to);
                    }
                }

                if (key === "Высота") {
                    const from = datafilter['heightFrom'];
                    const to = datafilter['heightTo'];
                    if (from !== -Infinity || to !== Infinity) {
                        result &&= (val >= from && val <= to);
                    }
                }
            }
         });

         return result;
    });     

    // САМОСТОЯТЕЛЬНО вызвать функцию, которая удаляет все строки таблицы с id=idTable
    clearTable(idTable);

    createTable(tableFilter, idTable);  
}

// САМОСТОЯТЕЛЬНО
const clearFilter = (idTable, originalData, filterForm) => {

    const elements = filterForm.elements;
    
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        if (element.type === 'text' || element.type === 'number') {
            element.value = '';
        }
    }
    
    clearTable(idTable);
    
    createTable(originalData, idTable);
}