import { useEffect, useState } from "react";

import Searchbar from "./Searchbar";
import { getImgsByQwery } from "../../shared/serveces/pixabay";

import ImageGallery from "./ImageGallery";
import Button from "../Button";
import Modal from "../../shared/components/Modal";
import Loader from "../Loader";
import style from "./imageFinder.module.css";

const ImageFinder = () => {
  const [paramSearch, setParamSearch] = useState({
    qwery: "",
    page: 1,
    totalPages: 0,
  });
  const [items, setItems] = useState([]);
  const [errorLoader, setErrorLoader] = useState({
    loader: false,
    error: null,
  });
  const [modalParams, SetModalParams] = useState({
    modalImg: {
      src: "",
      alt: "",
    },
    modalOpen: false,
  });

  const { modalImg, modalOpen } = modalParams;
  const { error, loader } = errorLoader;
  const { page, qwery, totalPages } = paramSearch;

  useEffect(() => {
    async function getImgItemsByQwery() {
      setErrorLoader((prevState) => {
        return { error: false, loader: true };
      });
      try {
        const data = await getImgsByQwery(qwery, page);
        const totalPages = Math.ceil(data.totalHits / 12);
        setItems((prevState) => {
          return [...prevState, ...data.hits];
        });
        setParamSearch((prevState) => {
          return { ...prevState, totalPages };
        });
        setErrorLoader((prevState) => {
          return { ...prevState, loader: false };
        });
      } catch (error) {
        setErrorLoader((prevState) => {
          return { error, loader: false };
        });
      }
    }

    if (qwery) {
      getImgItemsByQwery();
    }
  }, [page, qwery]);

  const setNextPage = () => {
    setParamSearch((prevState) => {
      const { page: prevPage } = prevState;
      return { ...prevState, page: prevPage + 1 };
    });
  };

  const setQweryInState = (value) => {
    const { qwery } = paramSearch;
    if (value !== qwery) {
      setParamSearch({ qwery: value, page: 1, totalPages: 0 });
      setItems([]);
    }
  };

  const setModalImg = (index) => {
    const { src: currentSrc } = modalParams.modalImg;
    const { largeImageURL: src, tags: alt } = items[index];

    if (currentSrc !== src) {
      SetModalParams({
        modalImg: {
          src,
          alt,
        },
        modalOpen: true,
      });
    }
  };

  const closeModal = () => {
    SetModalParams({
      modalImg: {
        src: "",
        alt: "",
      },
      modalOpen: false,
    });
  };

  const notFound = !totalPages && qwery && !loader && !error;
  const noWrapper = error || loader || notFound;
  const noGallary = !notFound && qwery && !error;
  const noButton = totalPages - page > 0;

  return (
    <div className={style.imageFinder}>
      <Searchbar onSubmit={setQweryInState} />

      {noGallary && <ImageGallery items={items} onClick={setModalImg} />}

      {noButton && !loader && (
        <Button onClick={setNextPage} text="Load more" type="button" />
      )}

      {modalOpen && (
        <Modal onClose={closeModal}>
          <img src={modalImg.src} alt={modalImg.alt} />
        </Modal>
      )}
      {noWrapper && (
        <div className={style.wrapper}>
          {loader && <Loader />}
          {error && <p className={style.error}>{error?.message}, try again</p>}
          {notFound && (
            <p
              className={style.notFind}
            >{`On request "${qwery}" nothing found, change the keyword and try again`}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageFinder;
