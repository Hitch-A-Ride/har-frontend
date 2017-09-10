import React, { Component } from 'react';

export const CarouselItem = ({ title, children, manual, className }) => (
  <div className={`card-carousel-item ${className}`}>
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

export class PopUpCarousel extends Component {
  constructor(props) {
    super(props);
    this.firstItem = this.firstItem.bind(this);
    this.prevItem = this.prevItem.bind(this);
    this.nextItem = this.nextItem.bind(this);
    this.lastItem = this.lastItem.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.childrenWithProps = this.childrenWithProps.bind(this);
  }

  removeActiveItem() {
    const { id } = this.props;
    const activeItem = $(`#${id}.card-carousel > .card-carousel-item.active`);
    activeItem.removeClass('active');
    return activeItem;
  }

  firstItem() {
    const { id } = this.props;
    this.removeActiveItem();
    window.setTimeout(() => {
      $(`#${id}.card-carousel > .card-carousel-item`).first().addClass('active');
    }, 600);
  }

  prevItem() {
    window.setTimeout(() => {
      this.removeActiveItem().prev().addClass('active');
    }, 600);
  }

  nextItem() {
    window.setTimeout(() => {
      this.removeActiveItem().next().addClass('active');
    }, 600);
  }

  lastItem() {
    const { id } = this.props;
    this.removeActiveItem();
    window.setTimeout(() => {
      $(`#${id}.card-carousel > .card-carousel-item`).last().addClass('active');
    }, 600);
  }

  closeModal() {
    $(`#${this.props.modalId}`).modal('close');
  }

  childrenWithProps() {
    return React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        firstItem: this.firstItem,
        prevItem: this.prevItem,
        nextItem: this.nextItem,
        lastItem: this.lastItem,
        closeModal: this.closeModal,
      }));
  }

  render() {
    const { id, modalId, children, className } = this.props;
    if (!children) return null;
    return (
      <div id={modalId} className="modal">
        <div className="modal-content">
          <div id={id} className={`card-carousel ${className}`}>
            {this.childrenWithProps()}
          </div>
        </div>
      </div>
    );
  }
}
