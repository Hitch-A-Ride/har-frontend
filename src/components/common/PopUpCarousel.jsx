import React, { Component } from 'react';

const select = document.querySelector;
const selectAll = document.querySelectorAll;

export const CarouselItem = ({ title, children, manual, className, name }) => (
  <div className={`card-carousel-item ${className}`} name={name}>
    {manual
      ? children
      : <div className="card flex">
        <div className="card-content">
          {title && <span className="card-title">{title}</span>}
          {children}
        </div>
      </div>
    }
  </div>
);

// const CarouselAction = ({ onPrevClick, onNextClick }) => (
//   <div className="card-carousel-action">
//     <a href="#!" id="prev" className="btn-flat" onClick={onPrevClick}>Previous</a>
//     <a href="#!" id="next" className="btn-flat" onClick={onNextClick}>Next</a>
//   </div>
// );

const showNavButtons = ({ id, modalId }) => {
  document.querySelector(`#${modalId}.modal #prev`).classList.remove('hidden');
  document.querySelector(`#${modalId}.modal #next`).classList.remove('hidden');
  const position = Number(document.querySelector(`#${id}.card-carousel > .card-carousel-item.active`).getAttribute('name'));
  const last = document.querySelectorAll(`#${id}.card-carousel > .card-carousel-item`).length;

  if (position === 1) {
    document.querySelector(`#${modalId}.modal #prev`).classList.add('hidden');
  }
  if (position >= last) {
    document.querySelector(`#${modalId}.modal #next`).classList.add('hidden');
  }
};

export class PopUpCarousel extends Component {
  constructor(props) {
    super(props);
    this.prepareCarousel = this.prepareCarousel.bind(this);
    this.onPrevClick = this.onPrevClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
  }

  componentDidMount() {
    this.prepareCarousel();
  }

  componentDidUpdate() {
    this.prepareCarousel();
  }

  onPrevClick() {
    const { id } = this.props;
    const activeItem = $(`#${id}.card-carousel > .card-carousel-item.active`);
    activeItem.removeClass('active');
    window.setTimeout(() => {
      activeItem.prev().addClass('active');
    }, 600);
    window.setTimeout(() => {
      showNavButtons(this.props);
    }, 600);
  }

  onNextClick() {
    const { id } = this.props;
    const activeItem = $(`#${id}.card-carousel > .card-carousel-item.active`);
    activeItem.removeClass('active');
    window.setTimeout(() => {
      activeItem.next().addClass('active');
    }, 600);
    window.setTimeout(() => {
      showNavButtons(this.props);
    }, 600);
  }

  prepareCarousel() {
    const { id } = this.props;
    const carousel = document.querySelector(`#${id}.card-carousel`);
    const items = document.querySelectorAll(`#${id}.card-carousel > .card-carousel-item`);
    switch (items.length) {
      case 0:
        carousel.parentNode.removeChild(carousel);
        break;
      case 1:
        break;
      default:
        showNavButtons(this.props);
    }
  }

  render() {
    const { id, modalId, className, modalClassName, children } = this.props;
    return (
      <div id={modalId} className={`modal ${modalClassName}`}>
        <div className="modal-content">
          <div id={id} className={`card-carousel ${className}`}>
            {children}
          </div>
        </div>
        <div className="modal-footer">
          <div className="card-carousel-action">
            <a href="#!" id="prev" className="btn-flat hidden" onClick={this.onPrevClick}>Previous</a>
            <a href="#!" id="next" className="btn-flat hidden" onClick={this.onNextClick}>Next</a>
          </div>
        </div>
      </div>
    );
  }
}
