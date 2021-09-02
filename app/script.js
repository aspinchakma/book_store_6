// get all id 
const inputField = document.getElementById('input-field');
const searchButton = document.getElementById('search-button');
const booksContainer = document.getElementById('book-container');
const totalResult = document.getElementById('total-result');
const spinner = document.getElementById('spinner');
const emptySearchWarning = document.getElementById('empty-search');
const resultNotFound = document.getElementById('no-result');



searchButton.addEventListener('click', () => {
    const inputValue = inputField.value;


    // REMOVE PREVIOUS HISTORY 
    booksContainer.textContent = '';
    totalResult.textContent = '';
    inputField.value = '';

    // CONDITION FOR EMPTY STRING IN SEARCH FIELD
    if (inputValue.length === 0) {

        emptyInput('block') // Show Empty Input warning
        emptyResult('none') //  Hide empty result warning
    } else {

        getSearchResult(inputValue);
        emptyResult('none') // Hide empty result warning
        emptyInput('none') // Display empty input warning
        spinnerToggle('block'); // display spinner toglge
    }



});

// Get result from API
const getSearchResult = (bookName) => {
    const url = `https://openlibrary.org/search.json?q=${bookName}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayResult(data.docs))
};

// Display Result 
const displayResult = (result) => {

    // Result Not Found condition
    if (result.length === 0) {
        emptyResult('block')
        spinnerToggle('none')
    }
    else {
        const div = document.createElement('div');
        div.innerHTML = `
        <h2 class="text-info mb-4">About <span>${result.length}</span> results</h2>
        `;
        totalResult.appendChild(div)
        result.forEach(book => {

            // handle undefined publisher
            const unknownPublisher = book.publisher ? book.publisher[0] : 'Unknown Publisher';

            // handle undefined author name
            const unknownAuthor = book.author_name ? book.author_name : 'Unknown Author';

            // handle undefined publication
            const unknownPubcation = book.first_publish_year ? book.first_publish_year : 'Unknown Publication Year';

            const div = document.createElement('div');
            div.className = 'hello';
            if (book.cover_i === undefined) {
                div.innerHTML = `
        <div class="col">
                    <div class="card" style="height:600px">
                        <img src="images/images.jfif" class="card-img-top" height="320px" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Book Name: <span>${book.title}</span></h5>
                            <p class="card-text">Author: <span>${unknownAuthor}</span></p>
                            <p class="card-text">Publication: <span>${unknownPubcation}</span></p>
                            <p class="card-text">Publisher: <span>${unknownPublisher}</span></p>

                        </div>
                    </div>
                </div>
        `;
            } else {
                div.innerHTML = `
            <div class="col">
                        <div class="card" style="height:600px">
                            <img src="${getImages(book.cover_i)}" class="card-img-top" height="320px" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Book Name: <span>${book.title}</span></h5>
                                <p class="card-text">Author: <span>${unknownAuthor}</span></p>
                                <p class="card-text">Publication: <span>${unknownPubcation}</span></p>
                                <p class="card-text">Publisher: <span>${unknownPublisher}</span></p>
    
                            </div>
                        </div>
                    </div>
            `;
            }

            booksContainer.appendChild(div);
            spinnerToggle('none') // Hide spinner Toggle

        })
    }

};


// Search For Images 

const getImages = id => {
    const url = `https://covers.openlibrary.org/b/id/${id}-M.jpg`;
    return url;
};


// Function for Spinner 
const spinnerToggle = (display) => {
    spinner.style.display = display;
};

// Function for empty input field
const emptyInput = display => {
    emptySearchWarning.style.display = display;
};

// Function for empty result 
const emptyResult = display => {
    resultNotFound.style.display = display;
}