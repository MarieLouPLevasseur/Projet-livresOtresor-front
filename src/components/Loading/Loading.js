import './Loading.scss';

function Loading() {
  // return (
  //   <div className="chaotic-orbit" />
  // );

  return (
    <div class="bookshelf_wrapper">
    <ul class="books_list">
      <li class="book_item first"></li>
      <li class="book_item second"></li>
      <li class="book_item third"></li>
      <li class="book_item fourth"></li>
      <li class="book_item fifth"></li>
      <li class="book_item sixth"></li>
    </ul>
    <div class="shelf"></div>
    <div class="loadingBook-text"> lecture en cours ...</div>
  </div>
  );
}

export default Loading;
