import DHLLOGO from "./assets/images/services/dhl.svg";
import FEDEXLOGO from "./assets/images/services/fedex.svg";
import UPSLOGO from "./assets/images/services/UPS.png";
import ESTAFETALOGO from "./assets/images/services/estafeta.svg";
import PAQUETEEXPRESSLOGO from "./assets/images/services/paquetexpress.svg";
import REDPACKLOGO from "./assets/images/services/redpack.svg";
import axios from "axios";
export const API_ENDPOINTS = {
  baseUrl: process.env.REACT_APP_API_URL,
  auth: {
    signin: "/auth/signin",
    signup: "/auth/signup",
  },
  turns: {
    create: (id = "") => `/turn/${id}`,
  },
  users: {
    allUsers: (page = 0, offset = 0) => `/user?page=${page}&offset=${offset}`,
    franchises: {
      allFranchises: "/user/franchise",
      createFranchise: "/user/franchise",
      deleteFranchise: "/user/franchise",
      updateFranchise: (id = "") => `/user/franchise/${id}`,
    },
    cashiers: {
      allCashiers: "/user/cashier",
      createCashier: "/user/cashier",
      deleteCashier: "/user/cashier",
    },
  },
  services: {
    rating: "/rating",
    shipping: "/shipping",
  },
};
export const countryItems = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia &amp; Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts &amp; Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks &amp; Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export const request = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: `${process.env.REACT_APP_API_URL}`,
});
export const companyLogos = {
  DHL: DHLLOGO,
  FEDEX: FEDEXLOGO,
  UPS: UPSLOGO,
  REDPACK: REDPACKLOGO,
  ESTAFETA: ESTAFETALOGO,
  "PAQUETE EXPRESS": PAQUETEEXPRESSLOGO,
};

export const defaultShipmentData = {
  id: "",
  serviceName: "",
  serviceType: "",
  shipmentPrice: "",
  shipmentPdf: "",
  shipmentDescription: "",
  shipper: {
    postalCode: "",
  },
  receiver: {
    postalCode: "",
  },
  franchiseId: "",
  turnId: "",
  createdAt: "",
  updatedAt: "",
  franchise: {
    id: "",
    email: "",
    name: "",
  },
  Turn: {
    id: "",
    createdAt: "",
    cashier: {
      name: "",
    },
  },
};
