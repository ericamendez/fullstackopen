document.querySelector('.login').addEventListener('click', userClicks)

// it should only   when i click buttons

function userClicks () {
    const name = prompt("what is your name?")
    alert(name + 'has clicked button')
}

