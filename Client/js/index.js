// Name : KAUNG HSET AUNG 
// Class: DIT/1B/11
// Admin No: 2340698

let townArray = [];                                                                         // Globally announcing the array of towns
async function getAllHdbData() {                                                            // async function to get http://localhost:8081/allhdbdata using node fetch
    try {
        const response = await fetch('http://localhost:8081/allhdbdata');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function displayAllTownNames() {                                                      // async function to extract thr town names only and then push into the globally announced townArray
    try {
        const data = await getAllHdbData();
        const townOnly = [...new Set(data.map(hdb => hdb.town))];
        townOnly.forEach(element => {
            townArray.push(element);
        });

        const selectElement = document.getElementById('townSelect');
        townArray.forEach(town => {
            const option = document.createElement('option');
            option.value = town;
            option.textContent = town;
            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}



displayAllTownNames() .then (()=> {                                                             // To handle asynchronous nature of the displayAllTownNames() function

    const submitButton = document.getElementById('submit_btn');                               
    submitButton.addEventListener('click', () => {                                              // Adding an event listener to perform a certain task upon clicking the button. Start of event listener
        
        const selectedTown = townSelect.value;
        console.log(`Selected Town: ${selectedTown}`);
    
        async function getHdbDataByTown (town) {
            try {
                const encodedTown = encodeURIComponent(town);
                const response = await fetch(`http://localhost:8081/bytown/${encodedTown}`);    // to fetch `http://localhost:8081/bytown/${town}` 
                const data = await response.json();
                console.log(data)
                return data;
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        }
    
        let flatTypeArray = [];                                                                 // Announcing flatTypeArray inside the event listener's scope
        async function displayAllFlatType () {
            try {
                const data = await getHdbDataByTown(selectedTown)
                flatTypeOnly = [...new Set(data.map(hdb => hdb.flat_type))];                    // 'Set' To extract the unique town names and push into flatTypeArray
                flatTypeOnly.sort();
                flatTypeOnly.forEach(e => {flatTypeArray.push(e)});
                console.log (flatTypeArray)
                loopout(data)                                                                   // Call back to loopout function
                meanMedian(data)                                                                // Call back to meanMedian calculation
                
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        }
        displayAllFlatType()
      
        const loopout =(data) => {
            const list = document.getElementById('list')
            list.innerHTML = `<h2>Highest and lowest price HDB in <br><strong id="townNameDiaplay">${selectedTown}</strong></h2>`           //Dynamic main header that includes town name 
            
            flatTypeArray.forEach(e => {                                                        // Start of for-each loop to display each type of room inside the flatTypeArray
                const desiredData = data.filter(hdb => hdb.flat_type === e);
                desiredData.sort((a, b) => a.resale_price - b.resale_price);
                if (desiredData.length == 1) {                                                  // The case where only one room sold in chosen category. ie. no highest or lowest price
                    const newtownCard = document.createElement('town-card')
                    newtownCard.setAttribute('flatType', e);                                    // setting the <town-card> with its attributes and appending 
                    newtownCard.setAttribute('highest', desiredData[0].resale_price)
                    newtownCard.setAttribute('lowest', desiredData[0].resale_price)
                    list.appendChild(newtownCard)
    
                    const hdbDetail = document.createElement('span');                   
                    hdbDetail.setAttribute('slot', 'detailhigh');                               // Setting detailhigh slot with the message that tells the user that there is only one room sold under this filter
                    const slotAddress = `There is only one ${e} sold in ${selectedTown}<br>`
                    hdbDetail.innerHTML = slotAddress
                    newtownCard.append (hdbDetail)
    
                    const hdbDetail2 = document.createElement('span');                          // Setting detaillow slot with address of the only sold HDB
                    hdbDetail2.setAttribute('slot', 'detaillow');
                    const slotAddress2 = `Address: <br> Block (${desiredData[0].block}) - ${desiredData[0].street_name}`
                    hdbDetail2.innerHTML = slotAddress2
                    newtownCard.append (hdbDetail2)
                   
                } else {                                                                        // The case where more than one room is sold in chosen category. ie. there will be highest and lowest
                    const highestPriceValue = desiredData[(desiredData.length-1)].resale_price;
                    const lowestPriceValue = desiredData[0].resale_price;
    
                    const newtownCard = document.createElement('town-card')                     // setting the <town-card> with its attributes and appending
                    newtownCard.setAttribute('flatType', e);
                    newtownCard.setAttribute('highest', highestPriceValue);
                    newtownCard.setAttribute('lowest', lowestPriceValue);
                    
                    const highestPriceArray = desiredData.filter(ele => ele.resale_price === highestPriceValue) // Filter out the all the highest price HDB under the selected category by using filter function
                    const lowestPriceArray = desiredData.filter(ele => ele.resale_price === lowestPriceValue)   // Filter out the all the lowest price HDB under the selected category by using filter function
                    
                    let addresshigh = ''                                                        // For the case where there is more than one highest price HDB, collect all addresses and assign it to a variable
                    highestPriceArray.forEach(e => {
                        addresshigh += `Block (${e.block}) - ${e.street_name} <br> `
                    })
    
                    let addresslow = ''                                                         // For the case where there is more than one lowest price HDB, collect all addresses and assign it to a variable                                 
                    lowestPriceArray.forEach (e => {
                        addresslow += `Block (${e.block}) - ${e.street_name} <br> `
                    })
    
                    const hdbDetail = document.createElement('span');
                    hdbDetail.setAttribute('slot', 'detailhigh');                               // Setting detailhigh slot with address(es) of highest price hdb and appending 
                    hdbDetail.innerHTML = `Address(es) of Highest Price HDB : <br> ${addresshigh}`
                    newtownCard.append (hdbDetail)
    
                    const hdbDetail2 = document.createElement('span');
                    hdbDetail2.setAttribute('slot', 'detaillow');                               // Setting detaillow slot with address(es) of lowest price hdb and appending 
                    hdbDetail2.innerHTML = `Address(es) of Lowest Price HDB : <br> ${addresslow}`
                    newtownCard.append (hdbDetail2)
    
                    list.appendChild(newtownCard)
                }
            })                                                                                  // End of for-each loop to display each type of room inside the flatTypeArray
            
        }
    
        const meanMedian = (data) => {
            const list = document.getElementById('list2')
            list.innerHTML = `<h2>Mean and median HDB price in <br><strong id="townNameDiaplay2">${selectedTown}</strong></h2>`   //Dynamic main header that includes town name 
    
            flatTypeArray.forEach(e => {                                                       // Start of for each loop to calculate mean-median of each room type in flatTypeArray.
                const desiredData = data.filter(hdb => hdb.flat_type === e); 
                        const prices = desiredData.map(hdb => hdb.resale_price);               // Extract the prices 
                        const mean = calculateMean(prices);                                    // Calculate mean and median 
                        const median = calculateMedian(prices);                  
                        if (desiredData.length == 1) {                                         // The case where only one room is sold under selected category
                            const newMeanMedianCard = document.createElement("mean-median-card");
                            newMeanMedianCard.setAttribute('flatType', `${e} - Only one room sold`)                    // Set the <mean-median-card> with attributes and Only one room sold message and append
                            newMeanMedianCard.setAttribute('mean', mean)
                            newMeanMedianCard.setAttribute('median', median)
                            list.appendChild(newMeanMedianCard)
                        }
                        else {                                                                 // The case where there is more than one town sold
                            const newMeanMedianCard = document.createElement("mean-median-card");                      // Set the <mean-median-card> with attributes and append
                            newMeanMedianCard.setAttribute('flatType', e)
                            newMeanMedianCard.setAttribute('mean', mean)
                            newMeanMedianCard.setAttribute('median', median)
                            list.appendChild(newMeanMedianCard)
                        }
            })
        }
    });                                                                                        // End of event listener
})


function calculateMean(data) {                                                                 // Function to calculate the mean resale price 
    const sum = data.reduce((acc, val) => acc + val, 0);
    return (sum / data.length).toFixed(2);
}

function calculateMedian(data) {                                                               // Function to calculate the median resale price
    const sortedData = data.slice().sort((a, b) => a - b);
    const middle = Math.floor(sortedData.length / 2);
    if (sortedData.length % 2 === 0) {
        return ((sortedData[middle - 1] + sortedData[middle]) / 2).toFixed(2);
    } else {
        return sortedData[middle].toFixed(2);
    }
}
