'use strict'

console.time('1');

function getId(a) {
    return document.querySelector('#' + a);
};

function getClass(a) {
    return document.querySelector(a);
}

/*---------- Functions to hide/display element ------------------------*/

var hideElement = function(){
    for (var i = 0, l = arguments.length; i<l; i++) {
        document.querySelector(arguments[i]).style.display = 'none';    
    }
}

var displayBlockElement = function(selector){
    document.querySelector(selector).style.display = 'block';
}

var displayInlineElement = function(selector){
    document.querySelector(selector).style.display = 'inline';
}

/* ---------------------------------------------------------------- */

/* ---------------Open/Hide blocks---------------------------------*/

document.addEventListener('click', function(e){
    if (e.target.id === 'edit') {
        getId('text_editor').value = getClass('.top_window').innerHTML;
        displayBlockElement('.edit');
        hideElement('.style');    
    } else if (e.target.id === 'style') {
        hideElement('.edit');
        displayBlockElement('.style');
    } else if (e.target.id === 'save') {
        getClass('.top_window').innerHTML = getId('text_editor').value;
        getId('text_editor').value = null;
    } else if (e.target.id === 'add') {
        switchToAddPage();
    } else if (e.target.id === 'block') {
        displayBlockElement('#myModal');
    }
})

/* ---------------Open/Hide blocks end ------------------------------*/

/*-----------------Text size radio buttons setup---------------------*/

var check;

getId('stylesSettingForm').addEventListener('click', function(e) {
    console.log(e.target.name);
    console.log(e.target.tagName);
    if(e.target.id !== 'btnColor' && e.target.id !== 'btnBgColor') {
        hideElement('#colorsTable');
    }
    if(e.target.name === 'textSize') {
        getClass('.top_window').style.fontSize = e.target.value;    
    } else if (e.target.name === 'fontsList') {
        getClass('.top_window').style.fontFamily = e.target.value;    
    } else if (e.target.name === 'boldText') {
        if (e.target.checked) {
            getClass('.top_window').style.fontWeight = 'bold';    
        } else {
            getClass('.top_window').style.fontWeight = 'normal';
        }    
    } else if (e.target.name === 'italicText') {
        if (e.target.checked) {
            getClass('.top_window').style.fontStyle = 'italic';    
        } else {
            getClass('.top_window').style.fontStyle = 'normal';
        }   
    } else if (e.target.name === 'btnColor') {
        check = true;
        getId('colorsTable').style.display = 'table';
    } else if (e.target.name === 'btnBgColor') {
        check = false;
        getId('colorsTable').style.display = 'table';
    } else if (e.target.tagName === 'TD' && check) {
        getClass('.top_window').style.color = getComputedStyle(e.target).backgroundColor;     
    } else if (e.target.tagName === 'TD' && !check) {
        getClass('.top_window').style.backgroundColor = getComputedStyle(e.target).backgroundColor; 
    }
});

/*-------------- ---function to display/hide Home Page----------------*/

var switchToAddPage = function(){
    hideElement('.top_window', '.control_panel', '.editor_box');
    displayBlockElement('.add_element');
}

var switchToHomePage = function(){
    displayBlockElement('.top_window');
    displayBlockElement('.control_panel');
    displayBlockElement('.editor_box');
    hideElement('.add_element');
}

/*----------------End of function to display/hide Home Page----------------*/

/*-------Toggle between "table add panel" and "list add panel"------------*/

getId('selectElementToAdd').addEventListener('change', function(e){

    if (e.target.id === 'table') {
        hideElement('.addList');
        displayBlockElement('.addTable');
    } else if (e.target.id === 'list') {
        displayBlockElement('.addList');
        hideElement('.addTable');
    }
});

/*-------Toggle between "table add panel" and "list add panel" end--------*/

/*-------------------------Create table-----------------------------------*/

var myFormTableAdd = getId('addTableForm');

getId('createTable').addEventListener('click', function() {
    if (getId('alertMessageRows').style.display === 'inline' || getId('alertMessageCells').style.display === 'inline' || getId('alertMessageCellWidth').style.display === 'inline' || getId('alertMessageCellHeight').style.display === 'inline' || getId('alertMessageBorderWidth').style.display === 'inline') {
        alert ('Please, fill up the form with correct data');
    } else if (getId('addTableForm').amountOfRows.value.length === 0) {
        getId('addTableForm').amountOfRows.style.borderColor = 'red';
        displayInlineElement('#alertMessageRows');
    } else if (getId('addTableForm').amountOfCells.value.length === 0) {
        getId('addTableForm').amountOfCells.style.borderColor = 'red';
        displayInlineElement('#alertMessageCells');
    } else if (getId('addTableForm').widthOfCell.value.length === 0) {
        getId('addTableForm').widthOfCell.style.borderColor = 'red';
        displayInlineElement('#alertMessageCellWidth');
    } else if (getId('addTableForm').heightOfCell.value.length === 0) {
        getId('addTableForm').heightOfCell.style.borderColor = 'red';
        displayInlineElement('#alertMessageCellHeight');
    } else if (getId('addTableForm').borderWidth.value.length === 0) {
        getId('addTableForm').borderWidth.style.borderColor = 'red';
        displayInlineElement('#alertMessageBorderWidth');
    } else {
        switchToHomePage();
        
        var divContainer = document.createElement('div');
        var tbl = document.createElement('table');
        
        tbl.setAttribute('style', 'border: ' + myFormTableAdd.borderWidth.value + 'px ' + myFormTableAdd.borderType.value + ' ' + myFormTableAdd.borderColor.value);
        
        for (var p = 0, countRows = myFormTableAdd.amountOfRows.value; p < countRows; p++) {
            var tr = document.createElement('tr');
            for (var o = 0, countCells = myFormTableAdd.amountOfCells.value; o < countCells; o++) {
                var td = document.createElement('td');
                td.setAttribute('style', 'width: ' + myFormTableAdd.widthOfCell.value+'px; ' + 'height: ' + myFormTableAdd.heightOfCell.value+'px;');
                tr.appendChild(td);
            }
            tbl.appendChild(tr);
        }
    
        divContainer.appendChild(tbl);
        
        getId('text_editor').value = getClass('.top_window').innerHTML + divContainer.innerHTML;
    
        myFormTableAdd.reset();
    }
});

getId('cancelCreateTable').onclick = function() {
    switchToHomePage();
    
    hideElement('#alertMessageRows', '#alertMessageCells', '#alertMessageCellWidth', '#alertMessageCellHeight', '#alertMessageBorderWidth');
    getId('addTableForm').amountOfRows.style.borderColor = 'inherit';
    getId('addTableForm').amountOfCells.style.borderColor = 'inherit';
    getId('addTableForm').widthOfCell.style.borderColor = 'inherit';
    getId('addTableForm').heightOfCell.style.borderColor = 'inherit';
    getId('addTableForm').borderWidth.style.borderColor = 'inherit';
    myFormTableAdd.reset();
}

/*-------------------------Create table end-------------------------------*/

/*-------------------------Create list------------------------------------*/

var myFormListAdd = getId('addListForm');

getId('createList').addEventListener('click', function() {
    if (getId('alertMessageItemsAmount').style.display === 'inline') {
        alert ('Please, fill up the form with correct data');
    } else if (getId('addListForm').itemsAmount.value.length === 0) {
        getId('addListForm').itemsAmount.style.borderColor = 'red';
        displayInlineElement('#alertMessageItemsAmount');
    } else {
        switchToHomePage();
    
        var divContainerList = document.createElement('div');
        
        var listType = getId('ulOrOl').value;

        var listCreated = document.createElement(listType);
        
        var listStyleType = myFormListAdd.typeOfMarkUl.value !== 'none' ? myFormListAdd.typeOfMarkUl.value : myFormListAdd.typeOfMarkOl.value;

        listCreated.setAttribute('style', 'list-style-type: ' + listStyleType + ';');
        
        for (var n = 0, text = '', countListItems = myFormListAdd.itemsAmount.value; n < countListItems; n++) {
            text += '<li>Text</li>';
        }
        
        listCreated.innerHTML = text;
            
        divContainerList.appendChild(listCreated);
        
        getId('text_editor').value = getClass('.top_window').innerHTML + divContainerList.innerHTML;
    
        hideElement('#alertMessageItemsAmount', '#amountOfListItems', '#ul' , '#ol');
        
        myFormListAdd.reset();
    }
});

getId('cancelCreateList').onclick = function() {
    switchToHomePage();
    
    getId('addListForm').itemsAmount.style.borderColor = 'inherit';
    hideElement('#alertMessageItemsAmount', '#amountOfListItems', '#ul', '#ol');
    
    myFormListAdd.reset();
}
/*-------------------------Create list end--------------------------------*/

/*-------------------Add validation to table form-------------------------*/

getId('addTableForm').addEventListener('blur',  function(e){
    
    if (e.target.type === 'text' &&
        (/[^[0-9]/.test(e.target.value) || 
        ((e.target.name === 'amountOfRows' && (e.target.value < 1 || e.target.value > 30)) ||
        (e.target.name === 'amountOfCells' && (e.target.value < 1 || e.target.value > 50)) ||
        ((e.target.name === 'widthOfCell' || e.target.name === 'heightOfCell' || e.target.name === 'borderWidth' ) && (e.target.value < 1))))
    ) {
        e.target.style.borderColor = 'red';
        if (e.target.name === 'amountOfRows') {   
            displayInlineElement('#alertMessageRows');
        } else if (e.target.name === 'amountOfCells') {
            displayInlineElement('#alertMessageCells');
        } else if (e.target.name === 'widthOfCell') {
            displayInlineElement('#alertMessageCellWidth');
        } else if (e.target.name === 'heightOfCell') {
            displayInlineElement('#alertMessageCellHeight');
        } else if (e.target.name === 'borderWidth') {
            displayInlineElement('#alertMessageBorderWidth');
        }
    } else if (e.target.type === 'text') {
        e.target.style.borderColor = 'inherit';
        if (e.target.name === 'amountOfRows') {
            hideElement('#alertMessageRows');
        } else if (e.target.name === 'amountOfCells') {
            hideElement('#alertMessageCells');
        } else if (e.target.name === 'widthOfCell') {
            hideElement('#alertMessageCellWidth');
        } else if (e.target.name === 'heightOfCell') {
            hideElement('#alertMessageCellHeight');
        } else if (e.target.name === 'borderWidth') {
            hideElement('#alertMessageBorderWidth');
        }
    }
}, true);
/*----------------End of validation to table form-------------------------*/

/*-------------------Add validation to list form-------------------------*/

getId('addListForm').addEventListener('blur',  function(e){
    
    if (e.target.name === 'itemsAmount' && (/[^[0-9]/.test(e.target.value) || e.target.value < 1)) {

        e.target.style.borderColor = 'red';   
        displayInlineElement('#alertMessageItemsAmount');
    } else if (e.target.name === 'itemsAmount') {
        e.target.style.borderColor = 'inherit';
        hideElement('#alertMessageItemsAmount');
    }
}, true);

/*----------------End of validation to list form-------------------------*/

/*----------------Stage 2 - Add list to form-----------------------------*/

getId('ulOrOl').onchange = function(){
    
    var temp = this.value;
    getId('addListForm').reset();
    this.value = temp;
    hideElement('#amountOfListItems', '#alertMessageItemsAmount');
    getId('addListForm').itemsAmount.style.borderColor = 'inherit';
    
    if (this.value === 'ul') {
        
        displayInlineElement('#ul');
        hideElement('#ol');
    } else if (this.value === 'ol') {
        displayInlineElement('#ol');
        hideElement('#ul');
    } else {
        hideElement('#ol', '#ul');
    }
}

getId('addListForm').addEventListener('change', function(e){
    if (e.target.name === 'typeOfMarkUl' || e.target.name === 'typeOfMarkOl') {
        if (e.target.value !== 'none') {
            displayBlockElement('#amountOfListItems');
        } else {
            getId('itemsAmount').value = '';
            hideElement('#amountOfListItems', '#alertMessageItemsAmount');
            getId('addListForm').itemsAmount.style.borderColor = 'inherit';
        }
    }
    
})

/*----------------End of Stage 2 - Addition of list to form--------------*/

/*----------------Stage 2 - blocking functionality--------------*/

var password = 'qqq';

getId('submitPassword').onclick = function() {

    if(getId('passwordInput').value === password) {
        hideElement('#myModal', '#alertMessagePassword');
        getId('passwordInput').style.borderColor = 'inherit';
        getId('passwordInput').value = '';
        
    } else {
        displayBlockElement('#myModal');
        displayInlineElement('#alertMessagePassword');
        getId('passwordInput').style.borderColor = 'red';
    }
}

console.timeEnd('1');


/*
console.time('2');

getId('ul').className = 'hide'

console.timeEnd('2');

console.time('3');

getId('ul').style.display = 'none'

console.timeEnd('3');

console.time('4');

getId('ul').setAttribute('style', 'display: none')

console.timeEnd('4');

*/