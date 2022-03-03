import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

interface IProps {
  decreaseStep: (step: number) => void;
  increaseStep: (step: number) => void;
}

const DentistForm = ({ decreaseStep, increaseStep }: IProps) => {
  return (
    <div>
      <div className="functional-icon">
        <MdOutlineKeyboardArrowLeft />
      </div>
      <div className="functional-icon">
        <MdOutlineKeyboardArrowRight />
      </div>
    </div>
  );
};

export default DentistForm;
