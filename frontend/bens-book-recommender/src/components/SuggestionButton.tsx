import React from 'react';

type IProps = {
  onClick: () => void;
};

const SuggestionButton = ({ onClick }: IProps) => {
  return (
    <div className="suggestion-button" >
        <input type="button" className="button-4" value='Get Recommendations' onClick={onClick} />
    </div>
  );
};

export default SuggestionButton;
