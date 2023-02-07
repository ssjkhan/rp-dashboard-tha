import { useId } from "react";

type ModalProps = {
  children: any;
  id: string;
};

export default function Modal(props: ModalProps) {
  const { id, children } = props;
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          {children}
        </label>
      </label>
    </>
  );
}
