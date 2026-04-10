import { Dispatch, SetStateAction } from "react";

import { Button, Modal } from "antd";
import { Typography } from "antd";

import { CloseOutlined } from "@ant-design/icons";

import cls from "./index.module.scss";

interface Props {
  shareHash: string;
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ShareLinkModal = ({ shareHash, modalIsOpen, setIsOpen }: Props) => {
  const { Paragraph } = Typography;
  const currentPath = `${window.location.origin}/shared/${shareHash}`;
  return (
    <Modal
      rootClassName={cls.modal}
      title="Скопируйте как вам удобно"
      closable={{ "aria-label": "Custom Close Button" }}
      open={modalIsOpen}
      onOk={() => setIsOpen((prev) => !prev)}
      onCancel={() => setIsOpen((prev) => !prev)}
      footer={
        <Button
          className={cls.okModalButton}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Закрыть
        </Button>
      }
      closeIcon={<CloseOutlined className={cls.closeModalIcon} />}
    >
      <Paragraph
        copyable={{
          text: currentPath,
          tooltips: ["Нажми, чтобы скопировать", "Скопировано!"],
        }}
        className={cls.shareHashModalLink}
      >
        Ссылка для поиска в адресной строке браузера {currentPath}
      </Paragraph>
      <Paragraph
        copyable={
          shareHash
            ? {
                text: shareHash,
                tooltips: ["Нажми, чтобы скопировать", "Скопировано!"],
              }
            : undefined
        }
        className={cls.shareHashModalLink}
      >
        {shareHash
          ? `Ссылка для поиска на сайте  ${shareHash}`
          : 'Запросите ссылку по кнопке "Поделиться"'}
      </Paragraph>
    </Modal>
  );
};

export default ShareLinkModal;
