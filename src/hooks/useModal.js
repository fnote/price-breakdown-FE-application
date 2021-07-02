import React, {useState, useCallback} from 'react';
import {Modal as AntdModal} from 'antd';

const useModal = () => {
    const [on, setOn] = useState(false);
    const toggle = useCallback(() => setOn(!on), [on]);

    const Modal = useCallback(({onOK, onCancel, noCancel, noOk, still, ...rest}, child) => (
            <AntdModal
                className="pz-antModal"
                {...rest}
                visible={on}
                cancelButtonProps={{style: noCancel && {display: 'none'}}}
                okButtonProps={{style: noOk && {display: 'none'}}}

                onOk={() => {
                    if (onOK) {
                        onOK();
                    }
                    if (still) {
                        setOn(true);
                    } else {
                        toggle();
                    }
                }}

                onCancel={() => {
                    if (onCancel) {
                        onCancel();
                    }
                    toggle();
                }}

            >
                {child}
            </AntdModal>
        ),
        [on, toggle]);

    return {
        on,
        toggle,
        Modal,
    };
};

export default useModal;
