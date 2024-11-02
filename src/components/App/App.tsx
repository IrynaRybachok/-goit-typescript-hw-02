import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import fetchImages from "../../services/api";
import "./App.css";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Toaster } from "react-hot-toast";
import LoaderMoreBtn from "../LoadMoreBtn/LoaderMoreBtn";
import Modal from "react-modal";
import ImageModal from "../ImageModal/ImageModal";
import { Image } from "./App.type";

interface ImageData {
  total_pages: number;
  total: number;
  results: Image[];
}

function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [image, setImage] = useState<Image[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [selectImage, setSelectImage] = useState<Image | null>(null); // зберігає вибране зображення для модального вікна
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  useEffect(() => {
    if (!query) return;

    const getData = async (): Promise<void> => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data: ImageData | undefined = await fetchImages(query, page);
        if (!data) {
          throw new Error("No data received from the API");
        }
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

  const handleSetQuery = (searchValue: string): void => {
    setQuery(searchValue);
    setImage([]);
    setPage(1);
  };

  const handleChangePage = (): void => {
    setPage((prev) => prev + 1);
  };

  const openModal = (image: Image): void => {
    setSelectImage(image);
    setIsOpen(true);
  };

  const closeModal = (): void => {
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
