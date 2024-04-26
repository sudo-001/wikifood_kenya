const host = "localhost:3030";
const dataset = "kenya_dataset";
const fusekiURL = `http://${host}/${dataset}/query`; // Make sure it's /sparql not /query

// SPARQL Queries
const selectClassesQuery = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    
    SELECT ?class WHERE {
        ?class a owl:Class.
    }
`;

const selectSubClassesQuery = `
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT ?subclass ?superclass WHERE {
        ?subclass rdfs:subClassOf ?superclass.
    }
`;

const selectInstancesQuery = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    SELECT ?instance ?type WHERE {
        ?instance rdf:type ?type.
    }
`;

// const selectAll = `
//     PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
//     PREFIX food: <http://www.semanticweb.org/sudo_dev/ontologies/2024/3/untitled-ontology-2#>

//     SELECT ?vue_food ?image ?name ?description WHERE {
//         ?vue_food rdf:type food:Food .
//         OPTIONAL { ?vue_food food:foodImage ?image } .
//         OPTIONAL { ?vue_food food:foodName ?name } .
//         OPTIONAL { ?vue_food food:foodDescription ?description } .
//     }`;

const selectAllWithDetails = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX food: <http://www.semanticweb.org/sudo_dev/ontologies/2024/3/untitled-ontology-2#>

    SELECT ?food ?image ?name ?description (GROUP_CONCAT(DISTINCT ?ingredientName; SEPARATOR=", ") AS ?ingredients) (GROUP_CONCAT(DISTINCT ?componentName; SEPARATOR=", ") AS ?components) WHERE {
        ?food rdf:type food:Food .
        OPTIONAL { ?food food:foodImage ?image } .
        OPTIONAL { ?food food:foodName ?name } .
        OPTIONAL { ?food food:foodDescription ?description } .
        OPTIONAL { ?food food:hasIngredients ?ingredient .
                   ?ingredient food:ingredientsName ?ingredientName } .
        OPTIONAL { ?food food:hasComponents ?component .
                   ?component food:foodComponentName ?componentName } .
    }
    GROUP BY ?food ?image ?name ?description
`;

const selectAllFoodsAsc = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX food: <http://www.semanticweb.org/sudo_dev/ontologies/2024/3/untitled-ontology-2#>

    SELECT ?food ?image ?name ?description WHERE {
        ?food rdf:type food:Food .
        OPTIONAL { ?food food:foodImage ?image } .
        OPTIONAL { ?food food:foodName ?name } .
        OPTIONAL { ?food food:foodDescription ?description } .
    }
    ORDER BY ASC(?name)
    `;

const selectAllFoodsDesc = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX food: <http://www.semanticweb.org/sudo_dev/ontologies/2024/3/untitled-ontology-2#>

    SELECT ?food ?image ?name ?description WHERE {
        ?food rdf:type food:Food .
        OPTIONAL { ?food food:foodImage ?image } .
        OPTIONAL { ?food food:foodName ?name } .
        OPTIONAL { ?food food:foodDescription ?description } .
    }
    ORDER BY DESC(?name)
    `;

const selectAllDishs = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX food: <http://www.semanticweb.org/sudo_dev/ontologies/2024/3/untitled-ontology-2#>

    SELECT ?food ?image ?name ?description WHERE {
        ?food rdf:type food:Dish .
        OPTIONAL { ?food food:foodImage ?image } .
        OPTIONAL { ?food food:foodName ?name } .
        OPTIONAL { ?food food:foodDescription ?description } .
    }`;

// Fetch all food items
async function fetchFoods(sparqlQuery) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/sparql-query",
            Accept: "application/sparql-results+json",
        },
        body: sparqlQuery,
    };

    try {
        const response = await fetch(fusekiURL, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // return response.json();
        const data = await response.json();
        console.log("datas : ", data);
        return data;
    } catch (error) {
        console.error("Error fetching foods:", error);
        return null;
    }
}

// Function to display foods
// function displayFoods_old(data) {
//     const container = document.getElementById("foodContainer");
//     container.innerHTML = ""; // Clear existing data
//     data.results.bindings.forEach((item) => {
//         const img = item.image?.value || "placeholder.jpg"; // Provide a placeholder if no image
//         const name = item.name?.value || "No name available";
//         const description = item.description?.value || "No description available";

//         const cardHTML = `
//             <div class="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg border hover:cursor-pointer transition-all hover:scale-105 h-96">
//               <img class="object-fill object-center w-full h-60" src="${img}" alt="${name}">

//               <div class="px-4 py-2">
//                 <h1 class="text-xl font-bold text-gray-800 uppercase ">${name}</h1>
//                 <p class="mt-1 text-sm text-gray-600">${description}</p>
//               </div>
//             </div>

//         `;
//         container.innerHTML += cardHTML;
//     });
// }



// function displayFoods(data) {
//     const container = document.getElementById("foodContainer");
//     container.innerHTML = ""; // Clear existing data

//     if (!data || !data.results || !data.results.bindings) {
//         console.error("No valid data received:", data);
//         container.textContent = "No data available";
//         return;
//     }

//     data.results.bindings.forEach((item) => {
//         const img = item.image?.value || "placeholder.jpg"; // Provide a placeholder if no image
//         const name = item.name?.value || "No name available";
//         const description = item.description?.value || "No description available";

//         const cardHTML = `
//             <div class="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg border hover:cursor-pointer transition-all hover:scale-105 h-96">
//               <img class="object-fill object-center w-full h-60" src="${img}" alt="${name}">

//               <div class="px-4 py-2">
//                 <h1 class="text-xl font-bold text-gray-800 uppercase ">${name}</h1>
//                 <p class="mt-1 text-sm text-gray-600">${description}</p>
//               </div>
//             </div>
//         `;
//         container.innerHTML += cardHTML; // Consider using appendChild for better performance
//     });
// }

// function displayFoods(data) {
//     const container = document.getElementById("foodContainer");
//     container.innerHTML = ""; // Clear existing data

//     if (!data || !data.results || !data.results.bindings) {
//         console.error("No valid data received:", data);
//         container.textContent = "No data available";
//         return;
//     }

//     data.results.bindings.forEach((item) => {
//         const img = item.image?.value || "placeholder.jpg"; // Provide a placeholder if no image
//         const name = item.name?.value || "No name available";
//         const description = item.description?.value || "No description available";
//         const ingredients = item.ingredients?.value || "No ingredients listed";
//         const components = item.components?.value || "No components listed";

//         const cardHTML = `
//             <div class="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg border hover:cursor-pointer transition-all hover:scale-105 h-96">
//               <img class="object-fill object-center w-full h-60" src="${img}" alt="${name}">

//               <div class="px-4 py-2">
//                 <h1 class="text-xl font-bold text-gray-800 uppercase ">${name}</h1>
//                 <p class="mt-1 text-sm text-gray-600">${description}</p>
//                 <p class="mt-1 text-sm text-gray-600">Ingredients: ${ingredients}</p>
//                 <p class="mt-1 text-sm text-gray-600">Components: ${components}</p>
//               </div>
//             </div>
//         `;
//         container.innerHTML += cardHTML; // Consider using appendChild for better performance
//     });
// }

function displayFoods(data) {
    const container = document.getElementById("foodContainer");
    container.innerHTML = ""; // Clear existing data

    if (!data || !data.results || !data.results.bindings) {
        console.error("No valid data received:", data);
        container.textContent = "No data available";
        return;
    }

    data.results.bindings.forEach((item) => {
        const img = item.image?.value || "placeholder.jpg";
        const name = item.name?.value || "No name available";
        let description = item.description?.value || "No description available";
        let descriptionTmp = "";

        if (description.length > 50) {
            descriptionTmp = `${description.substring(0, 50)}...`;
        }

        const ingredients = item.ingredients?.value || "No ingredients listed";
        const components = item.components?.value || "No components listed";

        const card = document.createElement('div');
        card.className = "max-w-xs overflow-hidden bg-white rounded-lg border hover:cursor-pointer transition-all hover:scale-105 h-96 hover:ring-2 hover:ring-purple-600 ";
        card.innerHTML = `
            <img class="object-fill object-center w-full h-60" src="${img}" alt="${name}">
            <div class="px-4 py-2 flex flex-col justify-between flex-grow">
                <h1 class="text-xl font-bold text-gray-800 uppercase">${name}</h1>
                <p class="mt-1 text-sm text-gray-600">${descriptionTmp}</p>
                <div class="text-xs text-gray-500 mt-2 flex flex-col gap-y-2">
                    <p><span class="font-bold">Ingredients:</span> ${ingredients}</p>
                    <p><span class="font-bold">Components:</span> ${components}</p>
                </div>
            </div>
        `;
        card.addEventListener('click', () => openModal(name, img, description, ingredients, components));
        container.appendChild(card);
    });
}

function openModal(name, image, description, ingredients, components) {
    document.getElementById("modalTitle").textContent = name;
    document.getElementById("modalImage").src = image;
    document.getElementById("modalDescription").textContent = description;
    document.getElementById("modalIngredients").textContent = `Ingredients: ${ingredients}`;
    document.getElementById("modalComponents").textContent = `Components: ${components}`;
    document.getElementById("modal").classList.remove("hidden");
}

document.getElementById("closeModal").addEventListener("click", function () {
    document.getElementById("modal").classList.add("hidden");
});


// Fetch and display foods when the page loads or a button is clicked
fetchFoods(selectAllWithDetails).then((data) => {
    if (data) {
        displayFoods(data);
    }
});

// Prepared query

document
    .getElementById("prepared_query")
    .addEventListener("change", function () {
        const selectedQuery = this.value;

        switch (selectedQuery) {
            case "none":
                resetButtonsStyle();
                fetchFoods(selectAllWithDetails).then((data) => {
                    if (data) {
                        displayFoods(data);
                    }
                });
                break;
            case "show_all_classes":
                executeSparqlQuery(selectClassesQuery, displayQueryResults);
                break;
            case "show_all_subclasses":
                executeSparqlQuery(selectSubClassesQuery, displayQueryResults);
                break;
            case "show_all_instances":
                executeSparqlQuery(selectInstancesQuery, displayQueryResults);
                break;
            case "list_all_food_asc":
                executeSparqlQuery(selectAllFoodsAsc, displayFoods);
                break;
            case "list_all_food_desc":
                executeSparqlQuery(selectAllFoodsDesc, displayFoods);
                break;
            default:
                console.log("Select a valid query.");
        }
    });

function executeCustomUsersSparqlQuery() {
    const query = document.getElementById('user_sparql_query').value;

    if (!query) {
        alert('The query field is empty, please enter a SPARQL query.');
        return;
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/sparql-query',
            'Accept': 'application/sparql-results+json'
        },
        body: query
    };

    fetch(fusekiURL, options)
        .then(response => response.json())
        .then(data => {
            console.log("query, query")
            console.log("data", data)
            if (data && data.results && data.results.bindings) {
                displayUserCustomRequestResponse(data.results.bindings);
            } else {
                alert('No results found or invalid query.');
            }
        })
        .catch(error => {
            console.error("There is an error with your the SPARQL query : ", error);
            alert('Failed to fetch data. check the console for more details.')
        })
}

function executeSparqlQuery(query, callback) {
    resetButtonsStyle();
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/sparql-query",
            Accept: "application/sparql-results+json",
        },
        body: query,
    };

    fetch(fusekiURL, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Received data:", data); // Log the data here
            callback(data);
        })
        .catch((error) => console.error("Error with SPARQL query: ", error));
}

function displayQueryResults_old(data) {
    const resultContainer = document.getElementById("foodContainer");
    resultContainer.innerHTML = "";

    data.results.bindings.forEach((item) => {
        const content = JSON.stringify(item, null, 2);
        const element = document.createElement("pre");
        element.textContent = content;
        resultContainer.appendChild(element);
    });
}

function displayQueryResults_old2(results) {
    const resultContainer = document.getElementById("foodContainer");
    resultContainer.innerHTML = "";

    if (results.length === 0) {
        resultContainer.textContent = "No results found.";
        return;
    }

    const table = document.createElement("table");
    table.className =
        "min-w-full divide-y divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg";

    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    table.appendChild(thead);
    table.appendChild(tbody);

    const headerRow = document.createElement("tr");
    Object.keys(results[0]).forEach((key) => {
        const headerCell = document.createElement("th");
        headerCell.textContent = key;
        headerCell.className =
            "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
        headerRow.appendChild(headerCell);
    });
    thead.appendChild(headerRow);
    thead.className = "bg-gray-90";

    results.forEach((result) => {
        const row = document.createElement("tr");
        row.className = "bg-white";
        Object.values(result).forEach((val) => {
            const cell = document.createElement("td");
            cell.textContent = val.value;
            cell.className = "px-6 py-4 whitespace-nowrap text-sm text-gray-500";
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });

    tbody.className = "bg-white divide-y divide-gray-600";

    resultContainer.appendChild(table);
}

function displayQueryResults(data) {
    const resultContainer = document.getElementById("foodContainer");
    resultContainer.innerHTML = "";

    if (!data || !data.results || !data.results.bindings) {
        console.error("Invalid or no data received:", data);
        resultContainer.textContent = "No results found.";
        return;
    }

    const results = data.results.bindings;
    if (results.length === 0) {
        resultContainer.textContent = "No results found.";
        return;
    }

    const ontologyHeader = document.createElement("h2");

    const table = document.createElement("table");
    table.className =
        "min-w-full divide-y divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg";
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    table.appendChild(thead);
    table.appendChild(tbody);

    const headerRow = document.createElement("tr");
    Object.keys(results[0]).forEach((key) => {
        const headerCell = document.createElement("th");
        headerCell.textContent = key;
        headerCell.className =
            "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
        headerRow.appendChild(headerCell);
    });
    thead.appendChild(headerRow);
    thead.className = "bg-gray-900"; // Corrected class name

    results.forEach((result) => {
        const row = document.createElement("tr");
        row.className = "bg-white";
        Object.entries(result).forEach(([key, val]) => {
            const cell = document.createElement("td");
            const localName = val.value.split("#").pop();
            // cell.textContent = localName;  // Ensure value exists
            cell.textContent = val.value; // Ensure value exists
            cell.className = "px-6 py-4 whitespace-nowrap text-sm text-gray-500";
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });

    tbody.className = "bg-white divide-y divide-gray-200";
    resultContainer.appendChild(table);
}

function displayUserCustomRequestResponse(results) {
    const resultContainer = document.getElementById('foodContainer');
    resultContainer.innerHTML = ''; // Clear previous results

    console.log('Processed results:', results); // Check what's being processed

    if (!results.length) {
        resultContainer.textContent = 'No results found.';
        console.log('No results to display.'); // More debug information
        return;
    }

    const table = document.createElement('table');
    table.className = "min-w-full divide-y divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg";

    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);

    const headerRow = document.createElement('tr');
    headerRow.className = "bg-gray-50";
    if (results.length > 0) {
        Object.keys(results[0]).forEach(key => {
            const headerCell = document.createElement('th');
            headerCell.textContent = key.replace(/.*#(.*)$/, '$1'); // Assume URI and get the part after #
            headerCell.className = "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
            headerRow.appendChild(headerCell);
        });
    }
    thead.appendChild(headerRow);

    results.forEach(result => {
        const row = document.createElement('tr');
        row.className = "bg-white";
        Object.values(result).forEach(val => {
            const cell = document.createElement('td');
            cell.textContent = val.value;
            cell.className = "px-6 py-4 whitespace-nowrap text-sm text-gray-500";
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });

    tbody.className = "bg-white divide-y divide-gray-200";

    resultContainer.appendChild(table);
}

// List all
document.getElementById("list_all").addEventListener("click", function () {
    fetchFoods(selectAllWithDetails).then((data) => {
        if (data) {
            displayFoods(data);
        }
    });

    this.className =
        "rounded-lg px-8 py-2 border hover:bg-purple-800 hover:text-white transition-all text-white bg-purple-900";
    document.getElementById("list_foods").className =
        "rounded-lg px-8 py-2 border hover:bg-purple-800 hover:text-white transition-all";
    document.getElementById("list_dishs").className =
        "rounded-lg px-8 py-2 border hover:bg-purple-800 hover:text-white transition-all";
});

// List all foods
document.getElementById("list_foods").addEventListener("click", function () {
    fetchFoods(selectAllWithDetails).then((data) => {
        if (data) {
            displayFoods(data);
        }
    });

    this.className =
        "rounded-lg px-8 py-2 border hover:bg-purple-800 hover:text-white transition-all text-white bg-purple-900";
    document.getElementById("list_all").className =
        "rounded-lg px-8 py-2 border hover:bg-purple-800 hover:text-white transition-all";
    document.getElementById("list_dishs").className =
        "rounded-lg px-8 py-2 border hover:bg-purple-800 hover:text-white transition-all";
});

// List all dishs
document.getElementById("list_dishs").addEventListener("click", function () {
    fetchFoods(selectAllDishs).then((data) => {
        if (data) {
            displayFoods(data);
        }
    });

    this.className =
        "rounded-lg px-8 py-2 border hover:bg-purple-800 hover:text-white transition-all text-white bg-purple-900";
    document.getElementById("list_all").className =
        "rounded-lg px-8 py-2 border hover:bg-purple-800 hover:text-white transition-all";
    document.getElementById("list_foods").className =
        "rounded-lg px-8 py-2 border hover:bg-purple-800 hover:text-white transition-all";
});

function resetButtonsStyle() {
    document.getElementById("list_all").className =
        "rounded-lg px-8 py-2 border hover:bg-purple-800 hover:text-white transition-all";
    document.getElementById("list_foods").className =
        "rounded-lg px-8 py-2 border hover:bg-purple-800 hover:text-white transition-all";
    document.getElementById("list_dishs").className =
        "rounded-lg px-8 py-2 border hover:bg-purple-800 hover:text-white transition-all";
}


document.getElementById('addFoodForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const foodName = document.getElementById('foodName').value;
    const foodDescription = document.getElementById('foodDescription').value;
    const foodImage = document.getElementById('foodImage').value || 'default.jpg';

    const sparqlUpdateQuery = `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX food: <http://www.semanticweb.org/sudo_dev/ontologies/2024/3/untitled-ontology-2#>

        INSERT DATA {
            food:${foodName.replace(/\s+/g, '')} rdf:type food:Food ;
                food:foodName "${foodName}" ;
                food:foodDescription "${foodDescription}" ;
                food:foodImage "${foodImage}" .
        }
    `;

    // Post update to Fuseki
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/sparql-update',
            'Accept': 'application/sparql-results+json',
        },
        body: sparqlUpdateQuery
    };

    fetch(`${fusekiURL}/update`, options)
        .then(response => response.ok ? alert('Food added successfully!') : alert('Failed to add food'))
        .catch(error => console.error('Error adding food:', error))
        .finally(() => toggleModal());
});
