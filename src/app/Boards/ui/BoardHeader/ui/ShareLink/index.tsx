import { useState } from "react";

import { Tooltip } from "antd";
import { Typography } from "antd";

import { hashedLink } from "@/shared/utils/md5Hash";
import { ShareAltOutlined } from "@ant-design/icons";

import { boardsApi } from "../../../../api";

import ShareLinkModal from "./ui/Modal";

import cls from "./index.module.scss";

interface Props {
  boardId: number;
  shareHash: string | null;
}

const ShareLink = ({ boardId, shareHash }: Props) => {
  const { Paragraph } = Typography;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [shareLink] = boardsApi.useShareLinkMutation();

  const handleShareLink = async () => {
    await shareLink({
      id: boardId,
      shareHash: hashedLink(),
    });
  };

  const handleDeleteShareLink = async () => {
    await shareLink({ id: boardId, shareHash: null });
  };

  const handleClick = async () => {
    if (shareHash) {
      await handleDeleteShareLink();
    } else {
      await handleShareLink();
      setIsOpen(true);
    }
  };

  return (
    <>
      <div onClick={handleClick}>
        <Tooltip
          title={
            shareHash ? (
              <Paragraph
                className={cls.shareHash}
                copyable={{ text: shareHash }}
              >
                <p className={cls.shareHashLink}>{shareHash}</p>
              </Paragraph>
            ) : (
              "Создать публичную ссылку"
            )
          }
          placement="bottom"
        >
          {shareHash ? (
            <p className={cls.share}>{<ShareAltOutlined />} Удалить</p>
          ) : (
            <p className={cls.share}>{<ShareAltOutlined />} Поделиться</p>
          )}
        </Tooltip>
      </div>
      <ShareLinkModal
        shareHash={shareHash || ""}
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default ShareLink;
