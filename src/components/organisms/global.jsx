// import { useImperativeHandle, useState, useEffect, useRef } from "react";

// const useRegisterModal = (ModalUtil, modalRef, { onShow, onHide }) => {
//   useEffect(() => {
//     ModalUtil.setModalRef(modalRef);
//   }, [ModalUtil, modalRef]);

//   useImperativeHandle(
//     modalRef,
//     () => ({
//       show: onShow,
//       hide: onHide,
//     }),
//     [onHide, onShow],
//   );
// };

export const GlobalModalComponent = () => {
  //   const [modalSuccessProps, setModalSuccessProps] = useState({
  //     open: false,
  //     description: "",
  //     onConfirm: () => {},
  //     image: "",
  //   });
  //   const [modalErrorProps, setModalErrorProps] = useState({
  //     open: false,
  //     description: "",
  //     onConfirm: () => {},
  //   });
  //   const [modalConfirmProps, setModalConfirmProps] = useState({
  //     open: false,
  //     description: "",
  //     onConfirm: () => {},
  //     maxWidth: "350px",
  //   });
  //   const [modalLoadingProps, setModalLoadingProps] = useState({
  //     open: false,
  //   });

  //   const modalConfirmRef = useRef();

  //   const _closeModalSuccess = () => setModalSuccessProps({ open: false });
  //   const _closeModalError = () => setModalErrorProps({ open: false });
  //   const _closeModalConfirm = () => setModalConfirmProps({ open: false });
  //   const _closeModalLoading = () => setModalLoadingProps({ open: false });

  //   useRegisterModal(ModalSuccessUtil, modalSuccessRef, {
  //     onShow: (message, onConfirm, title, image) =>
  //       setModalSuccessProps({
  //         open: true,
  //         description: message,
  //         onConfirm,
  //         title: title,
  //         image,
  //       }),
  //     onHide: _closeModalSuccess,
  //   });

  //   useRegisterModal(ModalErrorUtil, modalErrorRef, {
  //     onShow: (message, onConfirm, title) =>
  //       setModalErrorProps({
  //         open: true,
  //         description: message,
  //         onConfirm,
  //         title: title,
  //       }),
  //     onHide: _closeModalError,
  //   });

  //   useRegisterModal(ModalConfirmUtil, modalConfirmRef, {
  //     onShow: (message, onConfirm, title, onCancel, maxWidth) =>
  //       setModalConfirmProps({
  //         open: true,
  //         description: message,
  //         onConfirm,
  //         title: title,
  //         maxWidth: maxWidth || "350px",
  //       }),
  //     onHide: _closeModalConfirm,
  //   });

  //   useRegisterModal(ModalLoadingUtil, modalLoadingRef, {
  //     onShow: () => setModalLoadingProps({ open: true }),
  //     onHide: _closeModalLoading,
  //   });

  //   return (
  //     <>
  //       <ModalSuccess onClose={_closeModalSuccess} {...modalSuccessProps} />
  //       <ModalError onClose={_closeModalError} {...modalErrorProps} />
  //       <ModalConfirmation onClose={_closeModalConfirm} {...modalConfirmProps} />
  //       <ModalLoading onClose={_closeModalLoading} {...modalLoadingProps} />
  //     </>
  //   );
  // };
  return <>global</>;
};
