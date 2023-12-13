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

    const maxRandom = selectedCheckboxes.length < 8 ? 4 : 8;

    while (randomCheckboxes.length < maxRandom && selectedCheckboxes.length > 0) {
        const randomIndex = Math.floor(Math.random() * selectedCheckboxes.length);
        const randomCheckbox = selectedCheckboxes.splice(randomIndex, 1)[0];
        if (!randomCheckboxes.includes(randomCheckbox)) {
            randomCheckboxes.push(randomCheckbox);
        }
    }

    // Display the pictures and names of the randomly selected checkboxes
    randomCheckboxes.forEach((checkbox, index) => {
        const characterData = characters[checkbox.value]; // Assuming characters is the data object

        // Display the character picture
        const characterImage = document.getElementById(`string${index + 1}`);
        characterImage.src = "CharacterImages/" + characterData.portrait;
        characterImage.alt = checkbox.value;

        // Display the character name
        const characterName = document.getElementById(`label${index + 1}`);
        characterName.textContent = checkbox.value;
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
        //image.style.setProperty("background-color", "red");

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