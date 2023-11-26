const urlApi = "https://rickandmortyapi.com/api/character";
const table = document.getElementById("characters");
const info = document.getElementById("info");
const characterInfo = document.getElementById("character-info");
const close = document.getElementsByClassName("close")[0];

async function getAllCharacters() {
  let characters = [];
  let next = urlApi;

  while (next) {
    const response = await axios.get(next);
    const data = response.data;
    const results = data.results;

    characters = characters.concat(results);
    next = data.info.next;
  }
  return characters;
}

getAllCharacters()
  .then((characters) => {
    characters.forEach((character) => {
      const row = table.insertRow(-1);
      const cell = row.insertCell(0);
      
      cell.innerHTML = `<a href="#" id="open" onclick="showInfo(${character.id})">${character.name}</a>`;
    });
  })
  .catch((error) => {
    console.error(error);
  });

  function showInfo(id) {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => response.json())
      .then((character) => {
        let episodes = '';
        for(let i = 0; i < character.episode.length; i++) {
            episodes += `<br>&nbsp Episode ${i+1}: ${character.episode[i]}`;
        }

        characterInfo.insertAdjacentHTML('beforeend',
            `Id: ${character.id}<br>
            Name: ${character.name}<br>
            Status: ${character.status}<br>
            Species: ${character.species}<br>
            Type: ${character.type}<br>
            Gender: ${character.gender}<br>
            Origin:<br>
                &nbsp Name: ${character.origin.name}<br>
                &nbsp Url: ${character.origin.url}<br>
            Location:<br>
                &nbsp Name: ${character.location.name}<br>
                &nbsp Url: ${character.location.url}<br>
            Image: ${character.image}<br>
            Episode: ${episodes}<br>
            Url: ${character.url}<br>
            Created: ${character.created}<br>
            `);
        info.style.display = "block";
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  close.onclick = function() {
    info.style.display = "none";
    characterInfo.innerHTML = "";
  }


