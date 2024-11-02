import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import fetchImages from "./services/api";
import "./App.css";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { Toaster } from "react-hot-toast";
import LoaderMoreBtn from "./components/LoadMoreBtn/LoaderMoreBtn";
import Modal from "react-modal";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [image, setImage] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [selectImage, setSelectImage] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  useEffect(() => {
    if (!query) return;

    const getData = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchImages(query, page);
        setImage((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleSetQuery = (searchValue) => {
    setQuery(searchValue);
    setImage([]);
    setPage(1);
  };

  const handleChangePage = () => {
    setPage((prev) => prev + 1);
  };

  const openModal = (image) => {
    setSelectImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <SearchBar setQuery={handleSetQuery} />
      <Toaster position="top-right" />
      {isError && <ErrorMessage />}
      <ImageGallery images={image} openModal={openModal} />
      {isLoading && <Loader />}
      {image.length > 0 && page < totalPages && (
        <LoaderMoreBtn changePage={handleChangePage} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onCloseModal={closeModal}
        image={selectImage}
      />
    </>
  );
}

export default App;
