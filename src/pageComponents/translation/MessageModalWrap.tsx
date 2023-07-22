import type { PropsWithChildren } from 'react';
import React, { useCallback, useState } from 'react';
import type { ModalProps } from 'antd';
import { Modal, Input } from 'antd';
import { useAccount } from 'wagmi';

import api from '@/api';

const { TextArea } = Input;

type MessageModalProps = PropsWithChildren<
    ModalProps & { translationIndex?: number; onApplyResult?: (result: any) => void }
>;

export default function MessageModalWrap({
    translationIndex,
    onCancel,
    onApplyResult,
    children,
    ...modalProps
}: MessageModalProps) {
    const { address } = useAccount();
    const [message, setMessage] = useState<string>('');

    const fetchApply = useCallback(() => {
        if (translationIndex && address && message) {
            api.postTranslationApply({
                translationIndex,
                address,
                message
            })
                .then((res: any) => {
                    setMessage('');
                    if (res.code === 200) {
                        onApplyResult?.(res.data);
                    }
                })
                // @ts-ignore
                .finally(() => onCancel?.());
        }
    }, [translationIndex, address, message, onApplyResult, onCancel]);

    return (
        <>
            {children}
            <Modal
                title='Leave a message to the buyer'
                centered
                okText='Submit'
                cancelText='cancel'
                onCancel={onCancel}
                {...modalProps}
                onOk={fetchApply}
            >
                <TextArea
                    value={message}
                    onChange={({ target }) => setMessage(target.value)}
                    style={{ height: 188, marginBottom: '16px' }}
                    showCount
                    maxLength={1000}
                    placeholder='write a message…'
                />
            </Modal>
        </>
    );
}
