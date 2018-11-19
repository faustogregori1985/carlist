class CarListItem extends HTMLElement {
    constructor() {
      super();
      this._name = '';
      this._status = '';
      this._totalcharge = '';
      this._transmissiontype = '';
      this._airconditionind = '';
      this._fueltype = '';
      this._drivetype = '';
      this._passengerquantity = '';
      this._baggagequantity = '';
      this._code = '';
      this._codecontext = '';
      this._doorcount = '';
      this._pictureurl = '';
    }
  
    static get observedAttributes() { 
      return [
        'name',
        'status',
        'totalcharge',
        'transmissiontype',
        'airconditionind',
        'fueltype',
        'drivetype',
        'passengerquantity',
        'baggagequantity',
        'code',
        'codecontext',
        'doorcount',
        'pictureurl',
      ];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      this[`_${name}`] = newValue;
      this._updateRendering();
    }

    connectedCallback() {
      this._updateRendering();
    }
  
    get name() { return this._name; }
    get totalcharge() { return this._totalcharge; }
    get status() { return this._status; }
    get transmissiontype() { return this._transmissiontype; }
    get airconditionind() { return this._airconditionind; }
    get fueltype() { return this._fueltype; }
    get drivetype() { return this._drivetype; }
    get passengerquantity() { return this._passengerquantity; }
    get baggagequantity() { return this._baggagequantity; }
    get code() { return this._code ; }
    get codecontext() { return this._codecontext;}
    get doorcount() { return this._doorcount; }
    get pictureurl() { return this._pictureurl; }
    
    set name(v) {
      this.setAttribute("name", v);
    }
    set status(v) {
      this.setAttribute("status", v);
    }
    set totalcharge(v) {
      this.setAttribute("totalcharge", v);
    }
    set transmissiontype(v) {
      this.setAttribute('transmissiontype', v);
    }
    set airconditionind(v) {
      this.setAttribute('airconditionind', v);
    }
    set fueltype(v) {
      this.setAttribute('fueltype', v);
    }
    set drivetype(v) {
      this.setAttribute('drivetype', v);
    }
    set passengerquantity(v) {
      this.setAttribute('passengerquantity', v);
    }
    set baggagequantity(v) {
      this.setAttribute('baggagequantity', v);
    }
    set code(v) {
      this.setAttribute('code', v);
    }
    set codecontext(v) {
      this.setAttribute('codecontext', v);
    }
    set doorcount(v) {
      this.setAttribute('doorcount', v);
    }
    set pictureurl(v) {
      this.setAttribute('pictureurl', v);
    }
    
    _updateRendering() {
        const style = `
        <style>
          .car-list-item {
            position: relative;
            display: flex;
            padding: .75rem 1.25rem;
            margin-bottom: -1px;
            background-color: #fff;
            border: 1px solid rgba(0,0,0,.125);
          }
          .car-list-item__description {
            flex: 1 1 auto;
          }
          .car-list-item__img {
            flex 1 0 auto;
            padding-right: 1.25rem;
          }
          .badge {
            display: inline-block;
            padding: .25em .4em;
            font-size: 75%;
            font-weight: 700;
            line-height: 1;
            text-align: center;
            white-space: nowrap;
            vertical-align: baseline;
            border-radius: .25rem;
          }
          .badge-success {
            color: #fff;
            background-color: #28a745;
          }
        </style>
        `;
        const statusClass = this.status === 'Available' ? 'badge badge-success' : 'badge';  
        const template =  `
          <li class="car-list-item">
            <div class="car-list-item__img">
                <img 
                  src="${ this.pictureurl }"
                  title="${this.name}"
                  alt="${this.name}"
                  description="{this.name this.status this.charges}"
                />
              </div>  
            <div class="car-list-item__details">
              <h5 class="car-list-item__title">
                <span class="name">${ this.name }</span>
                <span class="status ${statusClass}">${ this.status }</span>
              </h5>
              <h3 class="charges">${ this.totalcharge }</h3>
              <span class="badge transmissiontype"><i class="fas fa-cogs"></i> ${ this.transmissiontype }</span>
              <span class="badge airconditionind"><i class="far fa-snowflake"></i> ${ this.airconditionind }</span>
              <span class="badge doorcount"<i class="fas fa-car-side"></i> ${ this.doorcount }</span>  
              <span class="badge fueltype"><i class="fas fa-car"></i> ${ this.fueltype }</span>
              <span class="badge passengerquantity"><i class="fas fa-male"></i> ${ this.passengerquantity }</span>
              <span class="badge baggagequantity"> <i class="fas fa-suitcase"></i> ${ this.baggagequantity }
              <span class="badge drivetype"> Drive type: ${ this.drivetype }</span>
              <span class="badge code">Code: ${ this.code }</span>
              <span class="badge codecontext">Code context: ${ this.codecontext }</span>
            </div>
          </li>
        `;
        this.innerHTML = `${style} ${template}`;
    }
  }

  window.customElements.define("car-list-item", CarListItem);