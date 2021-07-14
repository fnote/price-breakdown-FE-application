import React, { useEffect, useState, useRef } from 'react';
import { Table } from 'antd';

export function getTableScroll({ extraHeight = 74, id, ref } = {}) {
  let tHeader = null;
  if (ref && ref.current) {
    tHeader = ref.current.getElementsByClassName('ant-table-thead')[0];
  } else if (id) {
    tHeader = document.getElementById(id)
      ? document.getElementById(id).getElementsByClassName('ant-table-thead')[0]
      : null;
  } else {
    tHeader = document.getElementsByClassName('ant-table-thead')[0];
  }

  let tHeaderBottom = 0;
  if (tHeader) {
    tHeaderBottom = tHeader.getBoundingClientRect().bottom;
  }
  const height = `calc(100vh - ${tHeaderBottom + extraHeight}px)`;
  if (ref && ref.current) {
    const placeholder = ref.current.getElementsByClassName(
      'ant-table-placeholder'
    )[0];
    if (placeholder) {
      placeholder.style.height = height;
      if (placeholder.tagName === 'DIV') {
        placeholder.style.display = 'flex';
        placeholder.style.alignItems = 'center';
        placeholder.style.justifyContent = 'center';
      }
    }
  }
  return height;
}

export default function ScrollTable(props) {
  const [scrollY, setScrollY] = useState();
  const countRef = useRef(null);
  useEffect(() => {
    const scrolly = getTableScroll({ ref: countRef });
    setScrollY(scrolly);
  }, [props]);
  return (
    <div ref={countRef}>
      <Table {...props} scroll={{ x: false, y: scrollY }} />
    </div>
  );
}
