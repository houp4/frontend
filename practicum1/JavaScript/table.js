const createTable = (data, idTable) => {
    const table = document.getElementById(idTable);
    
    table.innerHTML = '';

    let header;
    
    if (!data || data.length === 0) {
        header = Object.keys(buildings[0]);
    } else {
        header = Object.keys(data[0]);
    }
   
    /*создание шапки таблицы */
    const headerRow = createHeaderRow(header);
    table.append(headerRow);
    
    /*создание тела таблицы (только если есть данные) */
    if (data && data.length > 0) {
        const bodyRows = createBodyRows(data);
        table.append(bodyRows);
    }
};

const createHeaderRow = (headers) => {
    const tr = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.innerHTML = header;
        tr.append(th);
    });
    return tr;
};

// САМОСТОЯТЕЛЬНО
const createBodyRows = (data) => {
    const tbody = document.createElement('tbody');

    data.forEach(item => {
        const tr = document.createElement('tr');
        Object.values(item).forEach(value => {
            const td = document.createElement('td');
            td.innerHTML = value;
            tr.append(td);
        });

        tbody.append(tr);
    });

    return tbody;
};


// САМОСТОЯТЕЛЬНО 
const clearTable = (idTable) => {
    const table = document.getElementById(idTable);
    table.innerHTML = '';
};