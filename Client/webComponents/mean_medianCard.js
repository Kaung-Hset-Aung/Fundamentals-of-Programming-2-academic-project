// Name : KAUNG HSET AUNG 
// Class: DIT/1B/11
// Admin No: 2340698
const template2 = document.createElement('template');

template2.innerHTML = `
    <style>
    :host {
        display : block;
        border-style: outset;
        font-family: Arial, Helvetica, sans-serif;
        background-color : #f5ccd4;
    }
    div {
        padding : 0px 30px;
    }
    h3 {
        font-size : 2rem;
    }
    h5 {
        font-size : 1rem;
    }
    </style>
    <div>
        <h3 id='flatType'>FLAT TYPE GOES HERE</h3>
        <hr>
        <h5>Mean Price: <span id='mean'>Mean Price here</span></h5>
        <h5>Median Price: <span id='median'>Median Price here</span></h5>
    </div>
`;

class MeanMedianCard extends HTMLElement {
    constructor () {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        
        let clone = template2.content.cloneNode(true);
        this.root.append(clone);
    }

    static get observedAttributes() {
        return ['flattype', 'mean', 'median'];
    }

    get flatType() {
        return this.getAttribute('flatType');
    }
    set flatType(value) {
        this.setAttribute('flatType', value); 
    }

    get mean() {
        return this.getAttribute('mean');
    }
    set mean(value) {
        this.setAttribute('mean', value); 
    }

    get median() {
        return this.getAttribute('median');
    }
    set median(value) {
        this.setAttribute('median', value); 
    }

    attributeChangedCallback(attrName, oldValue, newValue ) {
        attrName = attrName.toLowerCase();
        let element;

        switch (attrName) {
            case 'flattype' :
                element = this.root.querySelector('#flatType')
                element.textContent = newValue;
            break;
            case 'mean' :
                element = this.root.querySelector('#mean')
                element.textContent = newValue;
            break;
            case 'median' :
                element = this.root.querySelector('#median')
                element.textContent = newValue;
            break;
        }
    }
}

window.customElements.define('mean-median-card', MeanMedianCard);
