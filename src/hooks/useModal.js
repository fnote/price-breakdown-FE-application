

import React, {useState, useCallback} from 'react'
import {Modal as AntdModal} from 'antd'


const useModal = () => {
  const [on, setOn] = useState(false)
  const toggle = useCallback(() => setOn(!on), [on])
  
  const Modal = useCallback(
    ({onOK,onCancel,noCancel ,still, ...rest}, child) => {
      return (
        <AntdModal
        className="pz-antModal"
          {...rest}
          visible={on}
          cancelButtonProps={{ style: noCancel && { display: 'none' } }}
         
          onOk={() => {
            onOK && onOK()
            {still ? setOn(true) : toggle()}
          }}

          onCancel={() => {
            onCancel && onCancel()
            toggle()
          }}
        
        >
          {child}
        </AntdModal>
      )
    },
    [on, toggle],
  )
  return {
    on,
    toggle,
    Modal,
  }
}

export default useModal;