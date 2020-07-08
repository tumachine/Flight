interface FlightInfo {
  hasExtendedFare: boolean;
  flight: Flight;
  flightToken: string;
}

interface Flight {
  carrier: Carrier;
  price: Price;
  servicesStatuses: ServicesStatuses;
  legs: Leg[];
  airlineAlliance?: Info;
  exchange: Exchange;
  isTripartiteContractDiscountApplied: boolean;
  international: boolean;
  seats: Seat[];
  refund: Refund;
  docoDocaNeededInfo?: DocoDocaNeededInfo;
}

interface DocoDocaNeededInfo {
  country: Info;
  isDocaNeeded: boolean;
  isDocoNeeded: boolean;
}

interface Refund {
  ADULT: RefundableAdult;
}

interface RefundableAdult {
  refundableBeforeDeparture: boolean;
  refundableAfterDeparture: boolean;
  refundAfterDeparture?: Total;
  refundBeforeDeparture?: Total;
}

interface Seat {
  count: number;
  type: Info;
}

interface Exchange {
  ADULT: ExchangeableAdult;
}

interface ExchangeableAdult {
  exchangeableBeforeDeparture: boolean;
  exchangeAfterDeparture?: Total;
  exchangeBeforeDeparture: Total;
  exchangeableAfterDeparture: boolean;
}

interface Leg {
  duration: number;
  segments: Segment[];
}

interface Segment {
  classOfServiceCode: string;
  classOfService: Info;
  departureAirport: Info;
  departureCity: Info;
  aircraft: Info;
  travelDuration: number;
  arrivalCity: Info;
  arrivalDate: string;
  flightNumber: string;
  techStopInfos: any[];
  departureDate: string;
  stops: number;
  servicesDetails: ServicesDetails;
  airline: Carrier;
  starting: boolean;
  arrivalAirport: Info;
  operatingAirline?: Carrier;
}

interface ServicesDetails {
  freeCabinLuggage: FreeCabinLuggage;
  paidCabinLuggage: PaidCabinLuggage;
  tariffName?: string;
  fareBasis: FareBasis;
  freeLuggage: FreeLuggage;
  paidLuggage: PaidCabinLuggage;
}

interface FreeLuggage {
  ADULT: FreeLuggageAdult;
}

interface FreeLuggageAdult {
  nil: boolean;
  pieces?: number;
  unit?: string;
}

interface FareBasis {
  ADULT: string;
}

interface PaidCabinLuggage {
}

interface FreeCabinLuggage {
  ADULT?: FreeCabinLuggageAdult;
}

interface FreeCabinLuggageAdult {
  pieces: number;
  size: string;
  weight: number;
}

interface ServicesStatuses {
  baggage: Info;
  exchange: Info;
  refund: Info;
}

interface Price {
  total: Total;
  totalFeeAndTaxes: Total;
  rates: Rates;
  passengerPrices: PassengerPrice[];
}

interface PassengerPrice {
  total: Total;
  passengerType: Info;
  singlePassengerTotal: Total;
  passengerCount: number;
  fee: Total;
  feeDetails: FeeDetails;
  taxes: Total;
  tariff: Total;
}

interface FeeDetails {
  agencyFees: Total;
  supplierFees: Total;
}

interface Info {
  uid: string;
  caption: string;
}

interface Rates {
  totalUsd: Total;
  totalEur: Total;
}

interface Total {
  amount: string;
  currency?: string;
  currencyCode: string;
}

interface Carrier {
  uid: string;
  caption: string;
  airlineCode: string;
}

export { FlightInfo };