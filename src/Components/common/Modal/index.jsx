import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from 'react-bootstrap';
import { StandardButton } from '../Button';



const ConfirmModal = ({ title, closeText, onClose, submitText, onSubmit, children }) => {

  const handleSubmit = () => {
    if (onSubmit)
      onSubmit()
  }

  const handleClose = () => {
    if (onClose)
      onClose()
  }

  // return (
  //   <div className={"modal"} data-bs-backdrop="static" tabIndex="-1" modal-sm>
  //     <div className={"modal-dialog modal-dialog-centered"}>
  //       <div className={"modal-content"}>
  //         <div className={"modal-header "}>
  //           <h5 className={"modal-title fs-4 w-100 border border-primary"}>{title}</h5>
  //           <button type="button" className={"btn-close"} data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
  //         </div>
  //         <div className={"modal-body"}>
  //         {children}
  //         </div>
  //         <div className={"modal-footer border border-primary"}>
  //           {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  //           <button type="button" class="btn btn-primary">Save changes</button> */}
  //           {closeText && (<StandardButton outlined onClick={handleClose}>
  //             {closeText}
  //           </StandardButton>)}
  //           {submitText && (<StandardButton onClick={handleSubmit}>
  //             {submitText}
  //           </StandardButton>)}
  //           </div>
  //       </div>
  //       </div>
  //     </div>
  //     )

      return (
        <Modal style={{position: "absolute", "z-index": "10000"}} show={true} onHide={handleClose} backdrop="static" keyboard={false} centered>
          <Modal.Header closeButton>
            <Modal.Title>{title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {children}
          </Modal.Body>
          <Modal.Footer>
            {closeText && (<StandardButton outlined onClick={handleClose}>
              {closeText}
            </StandardButton>)}
            {submitText && (<StandardButton onClick={handleSubmit}>
              {submitText}
            </StandardButton>)}
          </Modal.Footer>
        </Modal>

      )
}

      export default ConfirmModal;