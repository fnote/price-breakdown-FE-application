import React, {useState, useEffect, useRef} from 'react';
import {Table} from 'antd';

const getTableScroll = ({extraHeight = 74, id, ref} = {}) => {
    let tableHeader = null;
    if (ref && ref.current) {
        tableHeader = ref.current.getElementsByClassName('ant-table-thead')[0];
    } else if (id) {
        tableHeader = document.getElementById(id)
            ? document.getElementById(id).getElementsByClassName('ant-table-thead')[0]
            : null;
    } else {
        tableHeader = document.getElementsByClassName('ant-table-thead')[0];
    }

    let tableHeaderBtm = 0;
    if (tableHeader) {
        tableHeaderBtm = tableHeader.getBoundingClientRect().bottom;
    }
    const height = `calc(100vh - ${tableHeaderBtm + extraHeight}px)`;
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
};

export default function ScrollableTable(props) {
    const [scrollY, setScrollY] = useState();
    const countRef = useRef(null);
    useEffect(() => {
        setScrollY(getTableScroll({ref: countRef}));
    }, [props]);
    return (
        <div ref={countRef} className='pz-table-base-wrapper'>
            <Table {...props} scroll={{x: 'min-content', y: scrollY}}/>
        </div>
    );
}
