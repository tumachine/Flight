import React, { useState, useEffect } from 'react';
import { getTravelTime, getTravelDate, getTravelHours } from '../lib/utils';
import './index.css';
import { FlightCardInfo } from '../lib/flight';
import clock from '../images/clock.png';

interface Props {
  flight: FlightCardInfo
}

const FlightCardInfo = (props: Props) => {
  return (
      <div className="card">
        <div className='card__price'>
          <p className='card__price__cost'>{props.flight.price} &#8381;</p>
          <p className='card__price__description'>Стоимость для одного взрослого пассажира</p>
        </div>

        <div className="card__locations">
          <p>
            {props.flight.fromCity}, {props.flight.fromAirport} <span className="card__locations--code">({props.flight.fromAirportCode})</span> &#8594;
            &#32; {props.flight.toCity}, {props.flight.toAirport} <span className="card__locations--code">({props.flight.toAirportCode})</span>
          </p>
        </div>

        <div className="card__duration">
          <div className="card__duration__from">
            <p>
              {getTravelTime(props.flight.departureDate)} 
              &#32;<span className="card__duration--date">{getTravelDate(props.flight.departureDate)}</span>
            </p>
          </div>
          <div className="card__duration__total">
            <img className="card__duration__total__image" src={clock}></img>
            <p>
              &#32;{Math.floor(props.flight.duration / 60)} ч {props.flight.duration % 60} мин
            </p>
          </div>
          <div className="card__duration__to">
            <p>
              <span className="card__duration--date">{getTravelDate(props.flight.arrivalDate)}</span>
              &#32;{getTravelTime(props.flight.arrivalDate)} 
            </p>
          </div>
        </div>
        <div className="card__carrier">
          <p>Рейс выполняет: {props.flight.carrier}</p>
        </div>
        <div className="card__select">
          <button className='card__select__button'>ВЫБРАТЬ</button>
        </div>
      </div>
  )
}

export default FlightCardInfo;
