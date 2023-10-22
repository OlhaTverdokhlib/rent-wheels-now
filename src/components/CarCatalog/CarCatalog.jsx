import React, { useState, useEffect } from 'react';
import fetchCars from '../../services/fetchCars';
import { CarList } from '../CarList';
import { CarsFilter } from '../CarsFilter';
import carCatalogStyle from './CarCatalog.module.scss';

const CarCatalog = () => {
  const [cars, setCars] = useState([]);
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedMake, setSelectedMake] = useState('All Makes');
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 8;
  const [filterCars, setFilterCars] = useState([]);

  const [searchParams, setSearchParams] = useState({
    selectedPrice: 'To $',
    minMileage: '',
    maxMileage: '',
  });

  const [originalCars, setOriginalCars] = useState([]);

  useEffect(() => {
    fetchCars()
      .then(data => {
        setOriginalCars(data);
        applyFilters(data);
      })
      .catch(error => {
        console.error('An error occurred while retrieving data:', error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleFavorite = car => {
    if (favoriteCars.find(favoriteCar => favoriteCar.id === car.id)) {
      setFavoriteCars(
        favoriteCars.filter(favoriteCar => favoriteCar.id !== car.id)
      );
    } else {
      setFavoriteCars([...favoriteCars, car]);
    }
  };

  const openModal = car => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedCar(null);
    setShowModal(false);
  };

  const applyFilters = data => {
    const filteredCars = data.filter(car => {
      if (selectedMake === 'All Makes' || car.make === selectedMake) {
        return true;
      }
      return false;
    });

    const priceFilteredCars = filteredCars.filter(car => {
      if (searchParams.selectedPrice === 'To $') {
        return true;
      } else {
        const carPrice = parseFloat(car.rentalPrice.substring(1));
        const selectedPriceValue = parseFloat(searchParams.selectedPrice);
        return carPrice <= selectedPriceValue;
      }
    });

    const finalFilteredCars = priceFilteredCars.filter(car => {
      const carMileage = parseFloat(car.mileage.toString().replace(/,/g, ''));
      const minMileageValue = parseFloat(
        searchParams.minMileage.replace(/,/g, '')
      );
      const maxMileageValue = parseFloat(
        searchParams.maxMileage.replace(/,/g, '')
      );

      return (
        (searchParams.minMileage === '' || carMileage >= minMileageValue) &&
        (searchParams.maxMileage === '' || carMileage <= maxMileageValue)
      );
    });

    setFilterCars(finalFilteredCars);

    setCars(finalFilteredCars.slice(0, carsPerPage));
    setCurrentPage(1);
  };

  const loadMore = () => {
    const startIndex = currentPage * carsPerPage;
    const endIndex = startIndex + carsPerPage;
    const nextCars = cars.concat(filterCars.slice(startIndex, endIndex));
    setCars(nextCars);
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className={carCatalogStyle.block}>
      {/* <div> */}

      <div className={carCatalogStyle.block__box}>
        <div className={carCatalogStyle.block__box__filter}>
          <CarsFilter
            selectedMake={selectedMake}
            setSelectedMake={setSelectedMake}
            selectedPrice={searchParams.selectedPrice}
            setSelectedPrice={value =>
              setSearchParams({ ...searchParams, selectedPrice: value })
            }
            minMileage={searchParams.minMileage}
            setMinMileage={value =>
              setSearchParams({ ...searchParams, minMileage: value })
            }
            maxMileage={searchParams.maxMileage}
            setMaxMileage={value =>
              setSearchParams({ ...searchParams, maxMileage: value })
            }
          />
          <button
            className={carCatalogStyle.block__box__filter__search__btn}
            onClick={() => applyFilters(originalCars)}
          >
            Search
          </button>
        </div>

        <CarList
          cars={cars}
          favoriteCars={favoriteCars}
          toggleFavorite={toggleFavorite}
          openModal={openModal}
        />
        {originalCars.length > carsPerPage &&
          currentPage * carsPerPage < originalCars.length &&
          cars.length >= carsPerPage &&
          cars.length < filterCars.length && (
          <button className={ carCatalogStyle.block__load__btn} onClick={loadMore}>Load More</button>
          )}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            {selectedCar && (
              <>
                <h2>
                  {selectedCar.make} {selectedCar.model}
                </h2>
                <a href="tel:+380730000000">Rental Car</a>
              </>
            )}
          </div>
        </div>
      )}
      {/* </div> */}
    </div>
  );
};

export default CarCatalog;
