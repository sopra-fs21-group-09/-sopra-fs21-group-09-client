export const Colors = {
    DEADLINES : '#E63d26', //deadlines
    LECTURES : '#E86539', //lectures
    EXERCISES : '#F1A16A', //exercises
    PRIVATE : '#F3D4A9', //private
    MEETING : '#6AA49B', //meeting
    EXAMS : '#E63d26', //exams/deadlines
    TASK : '#018692',
    BLUE : '#026C8D',
    BUTTON : '#0f224b', //button
    COLOR9 : '#E0E0E0', //used in Profile.js
    COLOR10 : '#4F4F4F', //used in Profile.js
    COLOR11 : '#F5F5F5', //background from most pages
    COLOR12 : '#C4C4C4', //used in Profile.js
    COLOR13 : '#646464', //background of login and registration
    COLOR14 : '#028B9B', // Turquoise Titles
    BACKGROUND : '#F5F5F5',
    DARK_GREY : '#4F4F4F',
    LIGHT_GREY : '#E5E5E5', 
}

export function getNewRandomColor() {
    let boxes = document.getElementsByClassName("Box");

    let colors = ['#D3212D', '#0048BA', '#4CE600', '#FF8C19', '#2ac2d3', '#841ed3', '#F19CBB',
        '#99CC00', '#d3c331', '#67d363', '#3b96d3'];
    let i;
    for (i = 0; i < boxes.length; i++) {
        // Pick a random color from the array 'colors'.
        boxes[i].style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    }
}