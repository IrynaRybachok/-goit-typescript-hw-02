import { FaSearch } from "react-icons/fa";
import s from "./SearchBar.module.css";
import toast from "react-hot-toast";

const SearchBar = ({ setQuery }) => {
  const handleSumbmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.elements.query.value.trim();
    if (!query) {
      return toast.error(
        "The field is empty, enter text to search for an image."
      );
    }
    setQuery(query);
    form.reset();
  };

  return (
    <header>
      <form className={s.form} onSubmit={handleSumbmit}>
        <input
          className={s.input}
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={s.btn} type="submit">
          <FaSearch size="20" />
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
