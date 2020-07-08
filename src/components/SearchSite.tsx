import React, { useState, useEffect } from 'react';
import './index.css'; 
import { getFlights, FlightCardInfo, SortByPrice, SortByDuration, FilterByTransferAmount, FilterByCost } from '../lib/flight';
import FlightCard from './FlightCard';

interface Props {
}

interface Option {
  name: string,
  operation: (cards: FlightCardInfo[]) => FlightCardInfo[],
}

const options: Option[] = [
  { name: 'по убыванию цены', operation: (cards) => SortByPrice(cards, true) }, 
  { name: 'по возрастанию цены', operation: (cards) => SortByPrice(cards, false) },
  { name: 'по уменьшению времени в пути', operation: (cards) => SortByDuration(cards, true) }, 
  { name: 'по возрастанию времени в пути', operation: (cards) => SortByDuration(cards, false) },
]

interface Checkbox {
  name: string,
  operation: (cards: FlightCardInfo[]) => FlightCardInfo[],
  checked: boolean,
}

const checkboxes: Checkbox[] = [
  { name: 'без пересадок', operation: (cards) => FilterByTransferAmount(cards, 1), checked: false}, 
  { name: '2 пересадки', operation: (cards) => FilterByTransferAmount(cards, 2), checked: false },
  { name: '3 пересадки', operation: (cards) => FilterByTransferAmount(cards, 3), checked: false }, 
  { name: '4 пересадки', operation: (cards) => FilterByTransferAmount(cards, 4), checked: false },
]

interface SearchRange {
  value: number,
  correct: boolean,
}

interface SearchInput {
  from: number,
  to: number,
  correct: boolean,
}

const SearchSite = (props: Props) => {
  const [searchPriceFrom, setSearchPriceFrom] = useState("0");
  const [searchPriceTo, setSearchPriceTo] = useState("20000");
  const [searchPriceCorrect, setSearchPriceCorrect] = useState(true);

  const [flights, setFlights] = useState(getFlights())

  const [selectedOption, setSelectedOption] = useState(options[0])
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(checkboxes)

  const handleOptionChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    const option = options[Number(changeEvent.target.value)];
    setSelectedOption(option);
  }

  const handleCheckboxChange = (index: number) => {
    const changedCheckboxes = selectedCheckboxes.map((check, i) => {
      if (i == index) {
        return {...check, checked: !check.checked }
      } else {
        return check;
      }
    })

    setSelectedCheckboxes(changedCheckboxes)
  }

  const updateFlights = () => {
    const {from, to, correct} = checkCorrectSearchInput();

    if (correct) {
      setSearchPriceCorrect(true);
      let f = getFlights()

      // filter update
      f = FilterByCost(f, from, to);

      // checkboxes update
      for (let i = 0; i < selectedCheckboxes.length; i += 1) {
        const checkbox = selectedCheckboxes[i];
        if (checkbox.checked) {
          f = checkbox.operation(f);
        }
      }

      // option update
      f = selectedOption.operation(f);

      setFlights(f);
    } else {
      setSearchPriceCorrect(false);
    }
  }

  const checkCorrectSearchInput = (): SearchInput => {
    const from = Number(searchPriceFrom);
    const to = Number(searchPriceTo);

    const incorrect: SearchInput = {from: -1, to: -1, correct: false }; 

    if (from === NaN || to === NaN) {
      return incorrect;
    } 

    if (from > to) {
      return incorrect;
    }
    return {from, to, correct: true};
  }

  useEffect(() => {
    updateFlights();
  }, [searchPriceFrom, searchPriceTo, selectedOption, selectedCheckboxes])

  const handlePriceChangeFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPriceFrom(e.target.value);
  }

  const handlePriceChangeTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPriceTo(e.target.value);
  }

  return (
    <div className='container'>
        <div className='controls'>

          <form className='controls__sort'>
            <p className='controls__title'>Сортировать</p>
            {options.map((option, index) => (
              <div className="radio" key={option.name}>
                <label>
                  <input type="radio" value={index} checked={option.name === selectedOption.name} onChange={handleOptionChange} />
                  &#32;- {option.name}
                </label>
              </div>
            ))}
          </form>

          
          <form className='controls__sorttransfer'>
            <p className='controls__title'>Фильтровать</p>
            {checkboxes.map((option, index) => (
              <label key={option.name}>
                <input
                  name={option.name}
                  type="checkbox"
                  checked={selectedCheckboxes[index].checked}
                  onChange={() => handleCheckboxChange(index)}
                />
                &#32;- {option.name}
              </label>
            ))}
          </form>

          <form className="controls__searchprice">
            <p className='controls__title'>Цена</p>
            <label>
              От
              <input 
                className={`${searchPriceCorrect ? '' : 'controls__searchprice--incorrect'}`} 
                type="text" 
                value={searchPriceFrom} 
                onChange={handlePriceChangeFrom} 
              />
            </label>
            <label>
              До
              <input 
                className={`${searchPriceCorrect ? '' : 'controls__searchprice--incorrect'}`} 
                type="text" 
                value={searchPriceTo} 
                onChange={handlePriceChangeTo} 
              />
            </label>
          </form>

        </div>

        <div className='flights'>
          {flights.map(f => <FlightCard key={f.token} flight={f}></FlightCard>)}
        </div>
    </div>
  )
}

export default SearchSite;
