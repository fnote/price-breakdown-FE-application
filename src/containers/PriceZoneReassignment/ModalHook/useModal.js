import React, {useState, useCallback} from 'react'
import {Button, Modal as AntdModal} from 'antd'

const useModal = () => {
  const [on, setOn] = useState(false)
  const toggle = useCallback(() => setOn(!on), [on])
  
 
  const Modal = useCallback(
    ({onOK, ...rest}, child) => {
      return (
        
        <AntdModal
        className="pz-antModal"
          {...rest}
          visible={on}
          onOk={() => {
            onOK && onOK()
            toggle()
          }}
          onCancel={toggle}
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