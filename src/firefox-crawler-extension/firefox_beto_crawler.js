console.log('beto: firefox extension works');

// wait for 10 seconds; then check if the odd's DOM container can be accessed.
setTimeout(() => {
    let odds = document.getElementsByClassName('results-table');
    if (odds.length > 0) {
        console.log('odds DOM object found');
    } else {
        console.log('odds DOM object not found');
    }
}, 10000);

