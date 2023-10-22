import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './Modal.module.scss';
import sprite from '../../images/sprite.svg';

const Modal = ({ isOpen, onClose, car }) => {
  const fullAddress = car ? car.address : '';
  const addressParts = fullAddress.split(',');

  const conditions = car.rentalConditions.split('\n');

  const formatMileage = mileage => {
    return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const rentalConditions = car.rentalConditions;
  const parts = rentalConditions.split(':');
  if (parts.length > 1) {
    // const minAge = parts[1].trim();
  }

  const city = addressParts[1];
  const country = addressParts[2];

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscKeyPress = event => {
      if (isOpen && event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    window.addEventListener('keydown', handleEscKeyPress);

    return () => {
      window.removeEventListener('keydown', handleEscKeyPress);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className={modalStyles.backdrop} onClick={handleBackdropClick}>
      <div className={modalStyles.block}>
        <button onClick={onClose} className={modalStyles.block__close__btn}>
          <svg className={modalStyles.block__close__btn__icon}>
            <use
              href={`${sprite}#icon-x-close`}
              width={24}
              height={24}
            />
          </svg>
        </button>

        <div className={modalStyles.block__photo}>
          <img
            className={modalStyles.block__photo__img}
            src={car?.img}
            alt={`${car?.make} ${car?.model}`}
          ></img>
        </div>
        <div className={modalStyles.block__review}>
          <div className={modalStyles.block__review__name}>
            {car.make}&nbsp;
            <span className={modalStyles.block__review__name__model}>
              {car.model}
            </span>
            , {car.year}
            {/* <p className={modalStyles.block__review__price}>
              {car.rentalPrice}
            </p> */}
          </div>
        </div>

        <div className={modalStyles.block__overview}>
          <span className={modalStyles.block__overview__items}>{city}</span>
          <span className={modalStyles.block__overview__items}>{country}</span>
          <span className={modalStyles.block__overview__items}>
            Id: {car.code}
          </span>
          <span className={modalStyles.block__overview__items}>
            Year: {car.year}
          </span>
          <span className={modalStyles.block__overview__items}>
            Type: {car.type}
          </span>
          <span className={modalStyles.block__overview__items}>
            Fuel Consumption: {car.fuelConsumption}
          </span>
          <span className={modalStyles.block__overview__items}>
            Engine Size: {car.engineSize}
          </span>
        </div>
        <p className={modalStyles.block__description}>{car.description}</p>
        <p className={modalStyles.block__accessories__title}>
          Accessories and functionalities:
        </p>
        <div className={modalStyles.block__accessories}>
          <p className={modalStyles.block__accessories__items}>
            {car.accessories.join(' | ')}
          </p>
          <p className={modalStyles.block__accessories__items}>
            {car.functionalities.join(' | ')}
          </p>
        </div>
        <p className={modalStyles.block__accessories__title}>
          Rental Conditions:
        </p>
        <div className={modalStyles.block__conditions}>
          <div className={modalStyles.block__conditions__item}>
            Minimum age:&nbsp;
            <span className={modalStyles.block__conditions__item__span}>
              {car.rentalConditions.match(/Minimum age: (\d+)/)[1]}
            </span>
          </div>
          <div className={modalStyles.block__conditions__item}>
            {conditions[1]}
          </div>
          <div className={modalStyles.block__conditions__item}>
            {conditions[2]}
          </div>
          <div className={modalStyles.block__conditions__item}>
            Mileage:&nbsp;
            <span className={modalStyles.block__conditions__item__span}>
              {formatMileage(car.mileage)}
            </span>
          </div>
          <div className={modalStyles.block__conditions__item}>
            Price:&nbsp;
            <span className={modalStyles.block__conditions__item__span}>
              {car.rentalPrice.substring(1)}$
            </span>
          </div>
        </div>
        <a href="tel:+380730000000" className={modalStyles.block__rental__btn}>
          Rental Car
        </a>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
