//1. na zaladowanie dokumentu
document.addEventListener('DOMContentLoaded', function() {
//    ustawiam początkową wartość localstorage, jeżeli nie ma żadnych danych
    if(!localStorage.getItem('notes'))
        localStorage.setItem('notes', JSON.stringify([]));
    
    display();
    showModal();
    resetNotes();
});

//2. funkcja, ktora pokazuje okno modalne po kliknieciu w button
function showModal() {
    document.getElementById('clickOn').addEventListener('click', function() {
       document.getElementById('modal').style.display = 'block'; 
    });
}
//3. funkcja pobiera dane z formularza i zwraca notatke
function get() {
    var title = document.getElementById('noteTitle').value;
    var content = document.getElementById('noteContent').value;
    var color = document.getElementById('noteColor').value;
    var important = document.getElementById('important').checked;
    var date = new Date();
    
    return {
        title: title,
        content: content,
        color: color,
        important: important,
        date: date
    };
}

//4. funkcja pobiera i ustawia notatke :)
function getNote(note) {
    var html = '';
    html += '<div class="note ' + (note.important ? 'important' : '') + '" style="background-color:' + note.color + '">';
    html += '<div class="date"><p>' + note.date + '</p></div>';
    html += '<div class="title"><h2>' + note.title + '</h2></div>';
    html += '<div class="content"><p>' + note.content + '</p></div>';
    html += '</div>';
    
    return html;
}

//5. funkcja renderuje liste notatek
function renderList(list) {
    for(var i=0; i<list.length; i++) {
        document.getElementById('notes').innerHTML += getNote(list[i]);
    }
}

//6. funkcja zapisujaca notatke
function save() {
//    Pobieram dane z obiektu localStorage
    var noteList = JSON.parse(localStorage.getItem('notes'));
    
//    Pobieram wartości z formularza
    var note = get();
    
//    Dodanie notatki do obiektu localStorage
    noteList.push(note);
    
//    Nadpisuje dane w obiekcie localStorage
    localStorage.setItem('notes', JSON.stringify(noteList));
    
//    Pokazuje zapisane notatki
    display();
}

//7. funkcja pokazuje notatki normalne i ważne
function display() {
//    czyścimy #notes - jezeli localStorage puste, otrzymamy pusta strone
    document.getElementById('notes').innerHTML = '';
    
//    Pobieram dane z obiektu localStorage
    var noteList = JSON.parse(localStorage.getItem('notes'));
    
//    podział na notatki ważne i zwykłe
    var important = noteList.filter(function(note) {
        return note.important;
    });
    
    var normal = noteList.filter(function(note) {
        return !note.important;
    });
    
    var displayLabels = important.length && normal.length;
    
//    jezeli important maja jakas dlugosc, to do "notes" dodaj diva z id importantNotes
    if(displayLabels) {
        document.getElementById('notes').innerHTML += '<div id="importantNotes"><h2>Ważne notatki</h2></div>';
    }
    
    renderList(important);
    
    if(displayLabels) {
        document.getElementById('notes').innerHTML += '<div id="normalNotes"><h2>Normalne notatki</h2></div>';
    }
    
    renderList(normal);
    
//    jezeli normal maja jakas dlugosc, to do "notes" dodaj diva z id normalNotes
}

//8. funkcja czyści notatki i zeruje obiekt localStorage
function resetNotes() {
    document.getElementById('clickReset').addEventListener('click', function() {
        window.localStorage.clear();
        location.reload();
    });
}








