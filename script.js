function myFunction() {
    console.log("Hello World!");
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

