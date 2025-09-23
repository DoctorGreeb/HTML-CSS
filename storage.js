const nameInput = document.getElementById('characterName');
const ageInput = document.getElementById('characterAge');
const saveButton = document.getElementById('save');
const getItemButton = document.getElementById('getItem');

function loadCharacterData() {
    const characterName = localStorage.getItem('characterName');
    const characterAge = localStorage.getItem('characterAge');
    const showName = document.getElementById('showName');
    const showAge = document.getElementById('showAge');
    showAge.innerHTML = `Возраст персонажа: ${characterName}`;

    showName.innerHTML = `Имя персонажа: ${characterAge}`;

    if (characterName) nameInput.value = characterName;
    if (characterAge) ageInput.value = characterAge;


    console.log('Данные загружены:', characterName, characterAge);

}




function delData() {
    const characterName = localStorage.removeItem('characterName');
    const characterAge = localStorage.removeItem('characterAge');

    if (characterName) nameInput.value = characterName;
    if (characterAge) ageInput.value = characterAge;

    console.log('Данные удалены, их нету');
}

saveButton.addEventListener('click', function () {

    const characterName = nameInput.value;
    const characterAge = ageInput.value;

    localStorage.setItem('characterName', characterName);
    localStorage.setItem('characterAge', characterAge);
    showAge.innerHTML = `Возраст персонажа: ${characterName}`;

    showName.innerHTML = `Имя персонажа: ${characterAge}`;

    console.log('Сохранено!');
});


delItem.addEventListener('click', function () {
    delData();
    showAge.innerHTML = `Возраст персонажа: удалено`;

    showName.innerHTML = `Имя персонажа: удалено`;
});


nameInput.addEventListener('input', function () {
    console.log('Имя персонажа:', this.value);
});




window.addEventListener('DOMContentLoaded', loadCharacterData);