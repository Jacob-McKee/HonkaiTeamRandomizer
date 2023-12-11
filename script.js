let characters; // Declare characters globally

// Load characters.json at the start
async function loadCharacters() {
    try {
        const response = await fetch('./characters.json'); // Adjust the path accordingly
        characters = await response.json();
        populateCharacters(); // Call populateCharacters after loading the JSON
    } catch (error) {
        console.error('Error loading characters:', error);
    }
}

// Call loadCharacters to initiate the process
loadCharacters();

function myFunction() {
    // Get all the checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Filter the selected checkboxes
    const selectedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);

    // Randomly select four unique checkboxes
    const randomCheckboxes = [];
    while (randomCheckboxes.length < 4 && selectedCheckboxes.length > 0) {
        const randomIndex = Math.floor(Math.random() * selectedCheckboxes.length);
        const randomCheckbox = selectedCheckboxes.splice(randomIndex, 1)[0];
        if (!randomCheckboxes.includes(randomCheckbox)) {
            randomCheckboxes.push(randomCheckbox);
        }
    }
    console.log(randomCheckboxes);
    // Put the selected checkboxes in the form fields
    randomCheckboxes.forEach((checkbox, index) => {
        const formField = document.getElementById(`string${index + 1}`);
        formField.value = checkbox.value;
    });
}

function populateCharacters() {
    const characterList = document.getElementById('CharacterList');

    for (let character in characters) {
        const characterData = characters[character];

        const characterDiv = document.createElement('div');
        characterDiv.classList.add('grid-container', 'character-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = character;
        checkbox.name = 'character';
        checkbox.value = character;

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');

        const image = document.createElement('img');
        image.src = "CharacterImages/" + characterData.portrait;
        image.alt = character;

        const label = document.createElement('label');
        label.htmlFor = character;
        label.textContent = character;

        characterDiv.appendChild(checkbox);
        imgContainer.appendChild(image);
        characterDiv.appendChild(imgContainer);
        characterDiv.appendChild(label);

        characterDiv.addEventListener('click', function () {
            checkbox.checked = !checkbox.checked;
        });

        characterList.appendChild(characterDiv);
    }
}
// Call the populateCharacters function when the body is loaded
document.body.onload = populateCharacters;
