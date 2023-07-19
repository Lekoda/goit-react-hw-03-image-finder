import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as API from '../Utils/API';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import css from './App.module.css';

export default class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    perPage: 12,
    largeImage: {},
    showModal: false,
    showMoreBtn: false,
    showLoader: false,
  };

  componentDidUpdate = (_, prevState) => {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      this.handleGetImageData(query, page);
    }
  };

  handleGetImageData = async () => {
    const { query, page, perPage } = this.state;

    try {
      this.setState({ showMoreBtn: false, showLoader: true });
      const data = await API.getImageData(query, page, perPage);
      const { hits: images, totalHits: total } = data;

      if (images.length === 0) {
        toast.error('No images found');
        return;
      }

      const showMoreBtn = page < Math.ceil(total / perPage);
      this.setState({ images: [...this.state.images, ...images], showMoreBtn });
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      this.setState({ showLoader: false });
    }
  };

  handleFormSubmit = query => {
    if (query !== this.state.query) {
      this.setState({ query, images: [] });
    }
  };

  handleModalClose = () => {
    this.setState({ showModal: false });
  };

  handeModalOpen = largeImage => {
    this.setState({ showModal: true, largeImage });
  };

  handleMoreBtnClick = e => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, showMoreBtn, showModal, largeImage, showLoader } =
      this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} onImageClick={this.handeModalOpen} />
        {showMoreBtn && <Button onClick={this.handleMoreBtnClick} />}
        {showModal && (
          <Modal image={largeImage} onModalClose={this.handleModalClose} />
        )}
        {showLoader && <Loader />}
        <ToastContainer />
      </div>
    );
  }
}
