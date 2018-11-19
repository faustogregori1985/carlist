import _ from 'lodash';
import moment from 'moment';
import * as utils from './services/utils';
import './components/carListItem/carListItem';
import './components/details/details';

const DATA_FORMAT = 'dddd, MMMM Do YYYY, h:mm'
const INPUT_DATE_FORMAT = 'YYYY-MM-DDTh:mm:ssZ'

function populateList(listElement, vendorCar) {
    const car = document.createElement("car-list-item");
    car.setAttribute('name', vendorCar.Vehicle.VehMakeModel['@Name']);
    car.setAttribute('transmissiontype', vendorCar.Vehicle['@TransmissionType']);
    car.setAttribute('airconditionind', vendorCar.Vehicle['@AirConditionInd']);
    car.setAttribute('fueltype', vendorCar.Vehicle['@FuelType']);
    car.setAttribute('drivetype', vendorCar.Vehicle['@DriveType']);
    car.setAttribute('passengerquantity', vendorCar.Vehicle['@PassengerQuantity']);
    car.setAttribute('baggagequantity', vendorCar.Vehicle['@BaggageQuantity']);
    car.setAttribute('code', vendorCar.Vehicle['@Code']);
    car.setAttribute('codecontext', vendorCar.Vehicle['@CodeContext']);
    car.setAttribute('doorcount', vendorCar.Vehicle['@DoorCount']);
    car.setAttribute('pictureurl', vendorCar.Vehicle.PictureURL)
    car.setAttribute('status', vendorCar['@Status']);
    const totalCharge = Number(vendorCar.TotalCharge['@EstimatedTotalAmount']);
    const currencyCode = vendorCar.TotalCharge['@CurrencyCode'];
    const charges = totalCharge.toLocaleString('ie-IE', { style: 'currency', currency: currencyCode });
    car.setAttribute('totalcharge', charges);
    listElement.appendChild(car);
}

const  renderCarList = (domElement, carArr, sortByPropertyName) => {
    const cars = _.sortBy(carArr, [sortByPropertyName]);
    cars.forEach(car => populateList(domElement, car))
};

const fetch = utils.fetchCarsPromise();
const detailsContainer = document.getElementById('car-details');
detailsContainer.appendChild(document.createElement('destination-details'));
const details = document.querySelector('destination-details');
const element = document.getElementById('car-list');
fetch
    .then(result => {
        let cars = [];
        let vendors = [];
        const data = JSON.parse(result);
        const { VehAvailRSCore } = data[0];
        const { VehVendorAvails, VehRentalCore } = VehAvailRSCore;
        
        details.setAttribute('pickuplocationName', VehRentalCore.PickUpLocation['@Name']);
        details.setAttribute('pickupdatetime', moment(VehRentalCore['@PickUpDateTime'], INPUT_DATE_FORMAT).format(DATA_FORMAT));
        details.setAttribute('returnlocationname', VehRentalCore.ReturnLocation['@Name']);
        details.setAttribute('returndatetime', moment(VehRentalCore['@ReturnDateTime'], INPUT_DATE_FORMAT).format(DATA_FORMAT));
        
        VehVendorAvails.forEach(vendor => {
            const { Vendor, VehAvails } = vendor;
            const vendorName = Vendor['@Name'];
            const vendorCode = Vendor['@Code'];
            vendors.push({ 
                code: vendorCode,
                name: vendorName,
            });
            const vendorCars = VehAvails.map(car => {
               const tmpCar = Object.assign(car);
               tmpCar.vendorCode = vendorCode;
               tmpCar.vendorName = vendorName;
               tmpCar.totalCharge = Number(car.TotalCharge['@EstimatedTotalAmount']);
               return tmpCar;
            });
            cars = [ ...cars, ...vendorCars];
        });
        renderCarList(element, cars,'totalCharge');
    })
    .catch(err => console.error(err));

