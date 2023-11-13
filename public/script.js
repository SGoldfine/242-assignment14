const showThings = async () => {
    const thingsJSON = await getThings();
    const thingsDiv = document.getElementById("things-div");
  
    if(thingsJSON == "") {
      console.log("Invalid load of JSON");
      return;
    }
  
    thingsJSON.forEach((thing) => {
      const section = document.createElement("section");
      thingsDiv.append(section);
  
      const h2 = document.createElement("h2");
      h2.innerHTML = thing.name;
      section.append(h2);
      
      const inventor = document.createElement("p");
      inventor.innerHTML = thing.inventor;
      section.append(inventor);
  
      const date = document.createElement("p");
      date.innerHTML = thing.inventionDate;
      section.append(date);
  
      const desc = document.createElement("p");
      desc.innerHTML = thing.description;
      section.append(desc);
  
      let details = document.createElement("div");
      details.classList.add("things-details");
      section.append(details);
      
      const funFacts = document.createElement("ul");
      thing.funFacts.forEach(facts => {
        const fact = document.createElement("li");
        fact.textContent = facts;
        funFacts.appendChild(fact);
      });
      section.append(funFacts);
      
      const img = document.createElement("img");
      img.src = thing.img;
      section.append(img);
    });
  }
  
  const getThings = async () => {
    try {
        const response = await fetch("api/things");
        if(!response.ok) {
          throw new Error('Error');
        }
        return await response.json();
    } catch(error) {
        console.log("error retrieving json");
        return "";
    }
  }

  const showAddThing = () => {
    document.getElementById("modern").classList.toggle("hidden");
    document.getElementById("newthing").classList.toggle("hidden");
  }

  const printThing = () => {  
    const newthing = document.getElementById("new");
  
    const name = document.getElementById("txt-inventor").value;
  
    const date = document.getElementById("txt-date").value;
      
    const description = document.getElementById("txt-description").value;

    const facts = document.getElementById("txt-facts").value;
  
    newthing.innerHTML += `<section class = "section"><h2>${name}</h2> <p>${date}</p> <p>${description}</p> <ul><li>${facts}</li></section>`;
  
    document.getElementById("new").classList.toggle("hidden");
  }
  
  window.onload = () => {
    document.getElementById("add-thing").onclick = showAddThing;
    document.getElementById("button-add").onclick = printThing;
    showThings();
  }