var currentInputType = 'side';

function init() {

    document.getElementById('showButton').addEventListener('click', applyInputType);
    document.getElementById('calculateButton').addEventListener('click', calculate);
    document.getElementById('clearButton').addEventListener('click', clearForm);
    
    document.getElementById('calcForm').addEventListener('submit', function() {
    });

    var inputFields = ['a', 'b', 'd', 'alpha', 'calcOptions'];
    inputFields.forEach(function(fieldId) {
        var field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('focus', function() {
                clearError(this);
            });
        }
    });

    document.getElementById('dataType').addEventListener('change', function() {
        currentInputType = this.value;
    });
}

function applyInputType() {
    var type = document.getElementById('dataType').value;
    var dGroup = document.getElementById('dInputGroup');
    var angleGroup = document.getElementById('angleInputGroup');
    var image = document.getElementById('trapezoidImage');
    
    currentInputType = type;
    
    if (type === 'side') {
        image.src = 'images/trapezoid_side.png';
        dGroup.classList.remove('hidden');
        angleGroup.classList.add('hidden');
        document.getElementById('alpha').value = '';
    } else {
        image.src = 'images/trapezoid_angle.png';
        dGroup.classList.add('hidden');
        angleGroup.classList.remove('hidden');
        document.getElementById('d').value = '';
    }

    document.getElementById('a').focus();
}

function calculate() {
    var aStr = document.getElementById('a').value.replace(',', '.');
    var bStr = document.getElementById('b').value.replace(',', '.');
    var a = parseFloat(aStr);
    var b = parseFloat(bStr);
    
    var type = currentInputType;

    var calcOptions = document.getElementById('calcOptions');
    var selectedOptions = [];
    for (var i = 0; i < calcOptions.options.length; i++) {
        if (calcOptions.options[i].selected) {
            selectedOptions.push(calcOptions.options[i].value);
        }
    }

    var hasError = false;
    
    if (isNaN(a) || a <= 0) {
        showError('a', 'Введите положительное число для основания a');
        hasError = true;
    }
    
    if (isNaN(b) || b <= 0) {
        showError('b', 'Введите положительное число для основания b');
        hasError = true;
    }
    
    if (!isNaN(a) && !isNaN(b) && b <= a) {
        showError('b', 'Нижнее основание (b) должно быть больше верхнего (a)');
        hasError = true;
    }
    
    if (type === 'side') {
        var dStr = document.getElementById('d').value.replace(',', '.');
        var d = parseFloat(dStr);
        if (isNaN(d) || d <= 0) {
            showError('d', 'Введите положительное число для стороны d');
            hasError = true;
        } else if (!isNaN(a) && !isNaN(b) && !isNaN(d) && d <= (b - a)) {
            showError('d', 'Сторона d должна быть больше разности оснований (b - a)');
            hasError = true;
        }
    } else {
        var alphaStr = document.getElementById('alpha').value.replace(',', '.');
        var alpha = parseFloat(alphaStr);
        if (isNaN(alpha) || alpha <= 0 || alpha >= 90) {
            showError('alpha', 'Введите угол от 0 до 90 градусов (не включая 90)');
            hasError = true;
        }
    }

    if (selectedOptions.length === 0) {
        document.getElementById('errorOptions').textContent = 'Выберите хотя бы одну характеристику';
        document.getElementById('calcOptionsLabel').classList.add('error');
        calcOptions.classList.add('error');
        hasError = true;
    }
    
    if (hasError) return false;

    var h, S, P, c, d;
    
    if (type === 'side') {
        var dStr = document.getElementById('d').value.replace(',', '.');
        d = parseFloat(dStr);
        h = Math.sqrt(d * d - Math.pow(b - a, 2));
        c = h;
    } else {
        var alphaStr = document.getElementById('alpha').value.replace(',', '.');
        var alpha = parseFloat(alphaStr);
        var alphaRad = alpha * Math.PI / 180;
        h = (b - a) * Math.tan(alphaRad);
        d = (b - a) / Math.cos(alphaRad);
        c = h;
    }
    
    S = (a + b) * h / 2;
    P = a + b + c + d;

    var output = document.getElementById('output');
    output.innerHTML = '';
    
    if (selectedOptions.includes('height')) {
        var heightElement = document.createElement('div');
        heightElement.className = 'result-item';
        heightElement.innerHTML = '<strong>Высота h = ' + h.toFixed(3) + '</strong>';
        output.appendChild(heightElement);
    }
    
    if (selectedOptions.includes('area')) {
        var areaElement = document.createElement('div');
        areaElement.className = 'result-item';
        areaElement.innerHTML = '<strong>Площадь S = ' + S.toFixed(3) + '</strong>';
        output.appendChild(areaElement);
    }
    
    if (selectedOptions.includes('perimeter')) {
        var perimeterElement = document.createElement('div');
        perimeterElement.className = 'result-item';
        perimeterElement.innerHTML = '<strong>Периметр P = ' + P.toFixed(3) + '</strong>';
        output.appendChild(perimeterElement);
    }
}

function showError(fieldName, message) {
    var field = document.getElementById(fieldName);
    var errorElement = document.getElementById('error' + fieldName.charAt(0).toUpperCase() + fieldName.slice(1));
    
    if (field) {
        field.classList.add('error');
    }
    
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearError(field) {
    field.classList.remove('error');

    var fieldId = field.id;
    if (fieldId) {
        var errorElement = document.getElementById('error' + fieldId.charAt(0).toUpperCase() + fieldId.slice(1));
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    document.getElementById('output').innerHTML = '';

    if (field.id === 'calcOptions' || field.name === 'calcOptions') {
        document.getElementById('calcOptionsLabel').classList.remove('error');
        document.getElementById('errorOptions').textContent = '';
    }
}

function clearForm() {
    document.getElementById('a').value = '';
    document.getElementById('b').value = '';
    document.getElementById('d').value = '';
    document.getElementById('alpha').value = '';

    var calcOptions = document.getElementById('calcOptions');
    for (var i = 0; i < calcOptions.options.length; i++) {
        calcOptions.options[i].selected = false;
    }

    var errorMessages = document.querySelectorAll('.error-message');
    for (var i = 0; i < errorMessages.length; i++) {
        errorMessages[i].textContent = '';
    }

    var errorElements = document.querySelectorAll('.error');
    for (var i = 0; i < errorElements.length; i++) {
        errorElements[i].classList.remove('error');
    }

    document.getElementById('calcOptionsLabel').classList.remove('error');
    document.getElementById('output').innerHTML = '';
}

document.addEventListener('DOMContentLoaded', init);