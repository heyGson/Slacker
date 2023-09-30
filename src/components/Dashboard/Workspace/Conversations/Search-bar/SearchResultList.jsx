import "../Search-bar/Search.css";

const SearchResultList = ({ results, onSelectUser }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return (
          <div key={id} onClick={() => onSelectUser(result.uid)}>
            {result.uid}
          </div>
        );
      })}
    </div>
  );
};

export default SearchResultList;
