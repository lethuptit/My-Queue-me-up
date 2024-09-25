import React, { useState, useEffect } from 'react';
import styles from './Paging.module.scss'

function Paging({ totalItems, onSelectedPage, currentPage }) {

  const pageSize = 8;
  const count = Math.floor(totalItems / pageSize) + 1;
  let pageArr = Array.from(Array(count).keys())

  const getPrevStyle = () => {
    if (currentPage <= 1)
      return styles["disabled-link"]
    else return "page-item"
  }

  const getNextStyle = () => {
    if (currentPage >= count)
      return styles["disabled-link"]
    else return "page-item"
  }

  const handleNextPage =()=>{
    if(currentPage+1<=count)
      onSelectedPage(currentPage+1)
  }

  const handlePrevPage =()=>{
    if(currentPage-1>=1)
    onSelectedPage(currentPage-1)
  }

  return (

    <nav aria-label="Page navigation example">
      <ul className={"pagination pagination-sm justify-content-center"}>
        <li  className={'page-item' }>
          <button role='button' className={` ${getPrevStyle()} ` } aria-label="Previous" onClick={handlePrevPage}>
            <span className={`${getPrevStyle()}` } aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {pageArr.map((data) => (
          <li key={data} className={"page-item"}>
            <button  onClick={() => onSelectedPage(data + 1)} className={currentPage === data + 1 ? styles['active'] : ''}>
              {data + 1}
            </button>
          </li>
          
        ))
        }
        <li class="page-item">
          <button className={`${getNextStyle()} ` } href="#" aria-label="Next" onClick={handleNextPage}>
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default Paging;