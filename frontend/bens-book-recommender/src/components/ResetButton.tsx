import React from 'react';

type IProps = {
  onClick: () => void;
};

const ResetButton = ({ onClick }: IProps) => {
  return (
    <div className="reset-button" >
        <input type="button" className="button" value='Reset' onClick={onClick} />
    </div>
  );
};

export default ResetButton;
