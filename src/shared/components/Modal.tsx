import { PiXCircleLight } from 'react-icons/pi';

interface ModalProps {
  onClose?: () => void;
  title?: string;
  body: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal = ({ onClose, title, body, footer }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-typography-primary-grey bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-neutral-white p-6 rounded-lg shadow-custom w-full sm:w-auto text-end">
        {onClose && (
          <button onClick={onClose}>
            <PiXCircleLight className="w-8 h-8 text-typography-primary-grey" />
          </button>
        )}
        <div className="flex justify-between items-center">
          <h2 className="text-heading-4 font-semibold">{title}</h2>
        </div>
        <div className="flex flex-col items-center space-y-6 mt-4">{body}</div>
        <div className="mt-6">{footer}</div>
      </div>
    </div>
  );
};

interface ModalMessageProps {
  onClose?: () => void;
  title?: string;
  message: string;
  icon?: React.ReactNode;
}
export const ModalMessage = ({ onClose, title, message, icon }: ModalMessageProps) => {
  const body = (
    <>
      {icon && <div>{icon}</div>}
      <p>{message}</p>
    </>
  );

  return <Modal onClose={onClose} title={title} body={body} />;
};
