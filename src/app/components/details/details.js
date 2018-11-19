
class DestinationDetails extends HTMLElement {
  constructor() {
    super();
    this._pickupdatetime = '';
    this._returndatetime = '';
    this._pickuplocationname = '';
    this._returnlocationname = '';
  }

  static get observedAttributes() { 
    return [
      'pickupdatetime',
      'returndatetime',
      'pickuplocationname',
      'returnlocationname',
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[`_${name}`] = newValue;
    this._updateRendering();
  }

  connectedCallback() {
    this._updateRendering();
  }

  get pickupdatetime() { return this._pickupdatetime; }
  get returndatetime() { return this._returndatetime; }
  get pickuplocationname() { return this._pickuplocationname; }
  get returnlocationname() { return this._returnlocationname; }
 
  set pickupdatetime(v) {
    this.setAttribute("pickupdatetime", v);
  }
  set returndatetime(v) {
    this.setAttribute("returndatetime", v);
  }
  set pickuplocationname(v) {
    this.setAttribute("pickuplocationname", v);
  }
  set returnlocationname(v) {
    this.setAttribute("returnlocationname", v);
  }
  _updateRendering() {
    const style = `
    <style>
      .destination-details {
        padding: .75rem 1.25rem;
      }
    </style>
    `;
    const template =  `
      <div class="destination-details">
        <h3>Pick up location: ${this.pickuplocationname}</h3>
        <p>${this.pickupdatetime}</p>
        <h3>Return location: ${this.returnlocationname}</h3>
        <p>${this.returndatetime}</p>
      </div>
    `;
    
    this.innerHTML = `${style} ${template}`;
  }
}

window.customElements.define("destination-details", DestinationDetails);