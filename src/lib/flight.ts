import { FlightInfo } from './IFlight';
import JSONFlights from './flights.json';

const FlightInfos: FlightInfo[] = JSONFlights.result.flights;

interface FlightCardInfo {
  price: number

  carrier: string

  fromCity: string
  fromAirport: string
  fromAirportCode: string

  duration: number

  toCity: string
  toAirport: string
  toAirportCode: string

  departureDate: Date

  arrivalDate: Date 

  transfers: number

  token: string
}

const createFlightCard = (flight: FlightInfo): FlightCardInfo => {
  const f = flight.flight;
  const departure = f.legs[0].segments[0];
  const arrival = f.legs[0].segments[f.legs[0].segments.length - 1];

  const flightCard: FlightCardInfo = {
    price: Number(f.price.total.amount),
    carrier: f.carrier.caption,

    transfers: f.legs[0].segments.length,

    fromCity: departure.departureCity.caption,
    fromAirport: departure.departureAirport.caption,
    fromAirportCode: departure.departureAirport.uid,

    departureDate: new Date(departure.departureDate),

    duration: Number(f.legs[0].duration),

    toCity: arrival.arrivalCity.caption,
    toAirport: arrival.arrivalAirport.caption,
    toAirportCode: arrival.arrivalAirport.uid,

    arrivalDate: new Date(arrival.arrivalDate),

    token: flight.flightToken,
  }

  return flightCard;
}

const flights = FlightInfos.map(f => createFlightCard(f));

const getFlights = () => flights;

type compareOperation = (a: FlightCardInfo, b: FlightCardInfo, increase: boolean) => number;

const Sort = (cards: FlightCardInfo[], operation: compareOperation, increase: boolean): FlightCardInfo[] => {
  return cards.concat().sort((a, b) => {
    return operation(a, b, increase);
  }) 
}

const PriceSort: compareOperation = (a: FlightCardInfo, b: FlightCardInfo, increase: boolean) => {
  const priceA = Number(a.price);
  const priceB = Number(b.price);
  return increase ? priceA - priceB : priceB - priceA;
}

const DurationSort: compareOperation = (a: FlightCardInfo, b: FlightCardInfo, increase: boolean) => {
  const durationA = Number(a.duration);
  const durationB = Number(b.duration);
  return increase ? durationA - durationB : durationB - durationA;
}

const SortByPrice = (cards: FlightCardInfo[], increase: boolean): FlightCardInfo[] => {
  return Sort(cards, PriceSort, increase);
}

const SortByDuration = (cards: FlightCardInfo[], increase: boolean): FlightCardInfo[] => {
  return Sort(cards, DurationSort, increase);
}

const FilterByTransferAmount = (cards: FlightCardInfo[], amount: number) => {
  return cards.filter(f => f.transfers == amount);
}

const FilterByCost = (cards: FlightCardInfo[], from: number, to: number) => {
  return cards.filter(f => f.price >= from && f.price <= to);
}

export { getFlights, FlightCardInfo, SortByPrice, SortByDuration, FilterByTransferAmount, FilterByCost };
