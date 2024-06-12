// Name : KAUNG HSET AUNG 
// Class: DIT/1B/11
// Admin No: 2340698

const template = document.createElement('template');

template.innerHTML = `
    <style>
    :host {
        display : block;
        border-style: outset;
        font-family: Arial, Helvetica, sans-serif;
        background-color : #abc9e9;
    }
    div {
        padding : 0px 30px 30px 30px;
    }
    h3 {
        font-size : 2rem;
    }
    h5 {
        font-size : 1rem;
    }
    button#detailsBtn { 
        border: none;
        outline:none;
        font-family: Arial, Helvetica, sans-serif;
        font-size : 1rem;
        background-color: orange;
        border-radius: 30%;
    }
    p#detail {
        display: none;
    }
    </style>
    <div>
        <h3 id='flatType'>FLAT TYPE GOES HERE</h3>
        <hr>
        <h5>Highest Price: <span id='highest'>Highest Price here</span></h5>
        <h5>Lowest Price: <span id='lowest'>Lowest Price here</span></h5>
        <button id='detailsBtn'>View Address</button>
        <p id="detail">
            <slot name="detailhigh">No detail information to show</slot><br>
            <slot name="detaillow">No detail information to show</slot>
        </p>
    </div>
`;

class HDBCard extends HTMLElement {
    constructor () {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        
        let clone = template.content.cloneNode(true);
        this.root.append(clone);
        let detailsBtn = this.root.querySelector("#detailsBtn");
        detailsBtn.addEventListener('click', event => {
            let detailsParagraph = this.root.querySelector('#detail');
            detailsParagraph.style.display = 
                (detailsParagraph.style.display === 'block') ? 
                'none': 'block'; 
        });
    }

    static get observedAttributes() {
        return ['flattype', 'highest', 'lowest'];
    }

    get flatType() {
        return this.getAttribute('flatType');
    }
    set flatType(value) {
        this.setAttribute('flatType', value); 
    }

    get highest() {
        return this.getAttribute('highest');
    }
    set highest(value) {
        this.setAttribute('highest', value); 
    }

    get lowest() {
        return this.getAttribute('lowest');
    }
    set lowest(value) {
        this.setAttribute('lowest', value); 
    }

    attributeChangedCallback(attrName, oldValue, newValue ) {
        attrName = attrName.toLowerCase();
        let element;

        switch (attrName) {
            case 'flattype' :
                element = this.root.querySelector('#flatType')
                element.textContent = newValue;
            break;
            case 'highest' :
                element = this.root.querySelector('#highest')
                element.textContent = newValue;
            break;
            case 'lowest' :
                element = this.root.querySelector('#lowest')
                element.textContent = newValue;
            break;
        }
    }
}

window.customElements.define('town-card', HDBCard);